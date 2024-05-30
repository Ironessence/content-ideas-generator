"use server";
import { IUser } from "@/types/user.types";
import Stripe from "stripe";

export const handleCheckout = async (user: IUser, price: number) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const totalPrice = price * 100;

  if (!user) {
    console.log("User is not logged in");
    return;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${totalPrice === 1000 ? "1000" : totalPrice === 2000 ? "2500" : "4000"} Tokens`,
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userEmail: user.email,
      },
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/`,
    });

    return session.url;
  } catch (err) {
    console.log("Error checkoutOrder:", err);
    return null;
  }
};
