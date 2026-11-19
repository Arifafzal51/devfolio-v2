import { NextResponse } from "next/server";

import { put } from "@vercel/blob";

import { dodo } from "@/lib/sponsors/dodo";

const MAX_BYTES = 2 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const productId = process.env.DODO_PRODUCT_ID;
  if (!productId) return fail("Sponsorship is not configured", 500);

  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const image = form.get("image");

  if (name.length < 2 || name.length > 40) {
    return fail("Name must be 2 to 40 characters", 400);
  }
  if (!(image instanceof File)) return fail("Please add an image", 400);
  if (!EXTENSIONS[image.type]) return fail("Use a PNG, JPG or WebP image", 400);
  if (image.size > MAX_BYTES) return fail("Image must be under 2 MB", 400);

  try {
    // Only a file upload happens here. No database row until payment succeeds.
    const blob = await put(
      `sponsors/pending/${crypto.randomUUID()}.${EXTENSIONS[image.type]}`,
      image,
      { access: "public", contentType: image.type }
    );

    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: process.env.DODO_PAYMENTS_RETURN_URL,
      metadata: {
        sponsor_name: name,
        sponsor_image_url: blob.url,
      },
    });

    if (!session.checkout_url) throw new Error("No checkout URL returned");

    return NextResponse.json({ url: session.checkout_url });
  } catch (error) {
    console.error("Sponsor checkout failed:", error);
    return fail("Unable to start checkout", 502);
  }
}
