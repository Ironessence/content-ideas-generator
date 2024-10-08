"use client";
import { useUserContext } from "@/context/AuthContext";
import { handleCheckout } from "@/lib/clientApi/handleCheckout";
import { PricingOptionsType } from "@/types/pricingOptions.types";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "../ui/button";

interface PricingCardProps {
  option: PricingOptionsType;
}

loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}`);

const PricingCard = ({ option }: PricingCardProps) => {
  const { title, bonus, image, price, mostPopular, aproxIdeas, link } = option;

  const { user } = useUserContext();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, []);

  return (
    <div className="relative py-5">
      <div
        className={`${mostPopular ? "border-[2px]" : "border-[1px]"} ${mostPopular ? "border-pink-500" : "border-slate-500"} rounded-xl p-5  flex flex-col items-center aspect-square max-w-[230px] max-h-[230px] min-w-[200px]  z-1`}
      >
        {mostPopular && (
          <h3 className="text-white bg-pink-700 p-2 rounded-xl font-semibold absolute top-0 right-[-10px]">
            ✨ Most popular
          </h3>
        )}
        <h2 className="font-extrabold text-center text-blue-900 text-[22px]">{title}</h2>
        <h4 className="text-pink-700 text-center font-semibold">
          {bonus ? `Bonus: ${bonus}` : "\u00A0"}
        </h4>
        <div className="max-w-full">
          <h4 className="text-slate-600 text-[14px]">Generates ~{aproxIdeas} ideas</h4>
        </div>
        <Image
          src={image}
          alt="pricing image"
          width={100}
          height={100}
          className="mx-auto min-w-[100px] min-h-[100px]"
        />
        <h1 className="text-blue-900 text-center font-extrabold text-[24px]">Price: ${price}</h1>
        <h3 className="text-center text-slate-400 text-[14px]">(incl. taxes)</h3>
        {user && (
          <Button
            className="w-full mt-2 bg-pink-500 hover:bg-pink-600"
            onClick={() => handleCheckout(user, price).then((url) => window.open(url!, "_self"))}
          >
            Buy now
          </Button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
