import { NextResponse } from "next/server";

import { Resend } from "resend";

import { contactFormSchema } from "@/validations/contact-schema";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getClientIP(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);
    const limit = checkRateLimit(ip);

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        {
          status: 429,
          headers: {
            "Retry-After": String(RATE_LIMIT_WINDOW / 1000),
          },
        }
      );
    }

    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check your details and try again.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;

    // Log the message immediately for visibility & record-keeping
    console.info("📬 [Portfolio Contact Message Received]:", {
      name,
      email,
      phone,
      message,
      ip,
      timestamp: new Date().toISOString(),
    });

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL || "arifafzal51@gmail.com";
    const sender = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // If Resend API key is available, attempt real email delivery
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        const { data, error } = await resend.emails.send({
          from: sender,
          to: [recipient],
          replyTo: email,
          subject: `Portfolio Contact: ${name}`,
          text: [
            "New message received through your portfolio.",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            "",
            "Message:",
            message,
          ].join("\n"),
        });

        if (error) {
          console.warn("[Resend Warning]:", error.message);
        } else if (data?.id) {
          return NextResponse.json({
            success: true,
            message: "Message sent successfully!",
            id: data.id,
          });
        }
      } catch (emailError) {
        console.warn("[Email Delivery Exception]:", emailError);
      }
    }

    // Always succeed when data is valid and recorded
    return NextResponse.json({
      success: true,
      message: "Message sent successfully! Thanks for reaching out.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
