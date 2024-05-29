import { IUser } from "@/types/user.types";
import { useRouter } from "next/navigation";

const stripe = require("stripe")(
  "sk_test_51PJfB0EWxp49n5kPNkN8As7WNIUOcMu4nW525JceThpIhPuIgg3ni2wIfh1x7oVEpiJKwdXNizWl6hBjWZ86p1RT00DU1fEDBs",
);

export const useCheckoutOrder = (user: IUser, price: number) => {
  const totalPrice = price * 100;
  const router = useRouter();

  const handleCheckout = async () => {
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
                name: "Tokens",
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
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/`,
      });

      router.push(session.url);
    } catch (err) {
      console.log("Error checkoutOrder:", err);
    }
  };

  return {
    handleCheckout,
  };
};
