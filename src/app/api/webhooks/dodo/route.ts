import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import { Webhooks } from "@dodopayments/nextjs";

import { prisma } from "@/lib/prisma";

type EventData = {
  subscription_id?: string;
  metadata?: Record<string, string> | null;
};

function read(payload: { data: unknown }) {
  const data = payload.data as EventData;

  return {
    subscriptionId: data.subscription_id,
    name: data.metadata?.sponsor_name,
    imageUrl: data.metadata?.sponsor_image_url,
  };
}

async function activate(payload: { data: unknown }) {
  try {
    const { subscriptionId, name, imageUrl } = read(payload);

    if (!subscriptionId) {
      throw new Error("Missing subscription ID");
    }

    if (name && imageUrl) {
      // Initial activation: create the sponsor.
      await prisma.sponsor.upsert({
        where: { subscriptionId },
        create: {
          name,
          imageUrl,
          subscriptionId,
          status: "ACTIVE",
        },
        update: {
          name,
          imageUrl,
          status: "ACTIVE",
        },
      });
    } else {
      // Renewal: existing sponsor should become active again.
      const result = await prisma.sponsor.updateMany({
        where: { subscriptionId },
        data: { status: "ACTIVE" },
      });

      if (result.count === 0) {
        throw new Error(`Sponsor not found for subscription ${subscriptionId}`);
      }
    }

    revalidatePath("/");
  } catch (error) {
    console.error("[dodo] activation failed:", error);
    throw error;
  }
}

async function deactivate(payload: { data: unknown }) {
  try {
    const { subscriptionId } = read(payload);

    if (!subscriptionId) {
      throw new Error("Missing subscription ID");
    }

    await prisma.sponsor.updateMany({
      where: { subscriptionId },
      data: { status: "INACTIVE" },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("[dodo] deactivation failed:", error);
    throw error;
  }
}

const handler = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  onSubscriptionActive: activate,
  onSubscriptionRenewed: activate,

  onSubscriptionCancelled: deactivate,
  onSubscriptionExpired: deactivate,
  onSubscriptionFailed: deactivate,
  onSubscriptionOnHold: deactivate,
});

export async function POST(req: NextRequest) {
  try {
    const response = await handler(req);
    return response;
  } catch (error) {
    console.error("[dodo] webhook handler failed:", error);
    return new Response("Webhook processing failed", {
      status: 500,
    });
  }
}
