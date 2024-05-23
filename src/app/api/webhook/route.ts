import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: any) => {
  try {
    console.log("req.headers:", req.headers);
    if (req.method !== "POST") {
      return new NextResponse("Only POST Requests allowed", { status: 200 });
    }

    const sig: any = headers().get("Stripe-Signature") as string;
    // const rawBody = await getRawBody(req);
    const rawBody = await req.text();
    console.log("*****************Raw Body:", rawBody);
    console.log("*****************Signature:", sig);

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      return new NextResponse("Webhook error!", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items"],
        },
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems) return new NextResponse("Internal server error!", { status: 500 });

      try {
        console.log("fulfill the customer logic");
        console.log("lineItems Data:", lineItems.data);
        console.log("lineItems Object:", lineItems.object);
      } catch (err) {
        console.log("Unable to handle the event:", err);
      }
    }

    return new NextResponse("All good!", { status: 200 });
  } catch (err) {
    console.log("Error:", err);
    return new NextResponse("Internal server error!", { status: 500 });
  }
};
