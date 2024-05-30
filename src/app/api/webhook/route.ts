import { UserSchema } from "@/schemas/user";
import db from "@/utils/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export const POST = async (req: any) => {
  try {
    if (req.method !== "POST") {
      return new NextResponse("Only POST Requests allowed", { status: 200 });
    }

    const sig: any = headers().get("Stripe-Signature") as string;

    const rawBody = await req.text();

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      return new NextResponse("Webhook error!", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const {
        id,
        amount_total,
        created,
        metadata: { userEmail },
      } = event.data.object as any;

      console.log("Id:", id);
      console.log("Amount:", amount_total);
      console.log("Created:", created);
      console.log("User Email:", userEmail);

      await db();

      try {
        await UserSchema.findOneAndUpdate(
          { email: userEmail },
          {
            $push: {
              transactions: {
                price: amount_total === 1000 ? 10 : amount_total === 2000 ? 20 : 30, // This does not work
                createdAt: created,
                quantity: amount_total === 1000 ? 1000 : amount_total === 2000 ? 2500 : 4000,
                id: id,
              },
            },
            $inc: { tokens: amount_total },
          },
          { new: true }, // This option returns the modified document
        );

        return new NextResponse("Successfully updated user", { status: 200 });
      } catch (err) {
        return new NextResponse("Error when updating user", { status: 500 });
      }
    }

    return new NextResponse("All good!", { status: 200 });
  } catch (err) {
    console.log("Error:", err);
    return new NextResponse("Internal server error!", { status: 500 });
  }
};
