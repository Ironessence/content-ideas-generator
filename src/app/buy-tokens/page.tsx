"use client";
import stripe from "@/assets/stripeLogo.png";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { handleCheckout } from "@/lib/clientApi/handleCheckout";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useEffect } from "react";

loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}`);

const BuyTokens = () => {
  const { user, setIsDialogOpen } = useUserContext();

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
    <div className="min-h-[80vh] px-5">
      <div className="mt-5 flex flex-col items-center justify-center gap-2">
        <h1 className="text-white text-[24px] sm:text-[36px]  text-center font-extrabold">
          Buy tokens 🪙
        </h1>
        <div className="w-[60%] h-[1px] bg-slate-500" />
        <span className="text-center">
          Tokens are used to generate ideas & content. This is a one-time purchase. No subscription
          required.
        </span>
      </div>

      {/* PRICING */}
      <div className="w-full flex flex-col flex-wrap sm:flex-row gap-8 items-center justify-center my-10">
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center sm:min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500  animate-all duration-500 transition-ease-in-out min-h-[300px]">
          <h1 className=" bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold sm:text-[30px] whitespace-nowrap text-[24px] ">
            1000 Tokens
          </h1>
          <span className="pb-3">&nbsp;</span>
          <h3 className="text-slate-300">Generates ~150 ideas</h3>
          <Image
            src="/assets/images/coins/coins-1.png"
            alt="coins1"
            width={100}
            height={100}
            className="py-3"
          />
          <h1 className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold sm:text-[36px] text-[24px]">
            $10
          </h1>
          <Button
            className="w-[90%] bg-gradient-to-r from-pink-500 to-purple-500"
            onClick={() => {
              if (user) {
                handleCheckout(user!, 10).then((url) => window.open(url!, "_self"));
              } else {
                setIsDialogOpen(true);
              }
            }}
          >
            Buy now
          </Button>
        </div>
        <div className="pb-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center sm:min-h-[350px] min-h-[300px]  bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500  animate-all duration-500 transition-ease-in-out">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-full py-3 rounded-t-lg mb-2">
            <h1 className="text-center">✨Most popular</h1>
          </div>
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold sm:text-[30px] whitespace-nowrap px-8 text-[24px]">
            2500 Tokens
          </h1>
          <h2 className="text-blue-400 font-bold pb-3">Bonus: 500 Tokens</h2>

          <h3 className="text-slate-300">Generates ~375 ideas</h3>
          <Image
            src="/assets/images/coins/coins-2.png"
            alt="coins1"
            width={100}
            height={100}
            className="py-3"
          />
          <h1 className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold sm:text-[36px] text-[24px]">
            $20
          </h1>
          <Button
            className="w-[90%] bg-gradient-to-r from-pink-500 to-purple-500"
            onClick={() => {
              if (user) {
                handleCheckout(user!, 20).then((url) => window.open(url!, "_self"));
              } else {
                setIsDialogOpen(true);
              }
            }}
          >
            Buy now
          </Button>
        </div>
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center sm:min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500  animate-all duration-500 transition-ease-in-out min-h-[300px]">
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold sm:text-[30px] whitespace-nowrap text-[24px] ">
            4000 Tokens
          </h1>
          <h2 className="text-blue-400 font-bold pb-3">Bonus: 1000 Tokens</h2>
          <h3 className="text-slate-300">Generates ~600 ideas</h3>
          <Image
            src="/assets/images/coins/coins-3.png"
            alt="coins1"
            width={100}
            height={100}
            className="py-3"
          />
          <h1 className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold sm:text-[36px] text-[24px]">
            $30
          </h1>
          <Button
            className="w-[90%] bg-gradient-to-r from-pink-500 to-purple-500"
            onClick={() => {
              if (user) {
                handleCheckout(user!, 30).then((url) => window.open(url!, "_self"));
              } else {
                setIsDialogOpen(true);
              }
            }}
          >
            Buy now
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-slate-300">All payments are secured by</h1>
        <Image
          src={stripe}
          alt="stripe"
          width={80}
          height={40}
        />
      </div>
    </div>
  );
};

export default BuyTokens;
