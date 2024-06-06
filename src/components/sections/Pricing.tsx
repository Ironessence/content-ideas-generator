import Image from "next/image";

const Pricing = () => {
  return (
    <div className="w-[95%] mr-auto ml-auto mb-[20vh]">
      <h1 className="text-center sm:text-[56px] font-extrabold text-[40px]">
        Pricing, made{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 p-1 px-3 rounded-md">
          easy
        </span>
      </h1>
      <h2 className="text-center sm:text-[22px] text-[18px] py-10 mb-10">
        You{" "}
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
          only pay for what you use
        </span>
        . No recurring payments, no hassle
      </h2>
      <div className="w-full flex flex-col sm:flex-row gap-8 items-center justify-center">
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500 hover:mt-[-2vh] animate-all duration-500 transition-ease-in-out">
          <h1 className="py-3">1000 Tokens</h1>
          <h3>Generates ~150 ideas</h3>
          <Image
            src="/assets/images/coins/coins-1.png"
            alt="coins1"
            width={100}
            height={100}
            className="py-3"
          />
          <h1 className="py-3">Price: $10</h1>
          <h3>(incl. taxes)</h3>
        </div>
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl sm:hover:mt-[-3vh] hover:border-purple-500 animate-all duration-500 transition-ease-in-out">
          <h1 className="py-3">2500 Tokens</h1>
          <h2>Bonus: 500 Tokens</h2>
          <h3>Generates ~150 ideas</h3>
          <Image
            src="/assets/images/coins/coins-1.png"
            alt="coins1"
            width={100}
            height={100}
            className="py-3"
          />
          <h1 className="py-3">Price: $10</h1>
          <h3>(incl. taxes)</h3>
        </div>
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl sm:hover:mt-[-3vh] hover:border-purple-500 animate-all duration-500 transition-ease-in-out">
          <h1 className="py-3">4000 Tokens</h1>
          <h2>Bonus: 1000 Tokens</h2>
          <h3>Generates ~150 ideas</h3>
          <Image
            src="/assets/images/coins/coins-1.png"
            alt="coins1"
            width={100}
            height={100}
            className="py-3"
          />
          <h1 className="py-3">Price: $10</h1>
          <h3>(incl. taxes)</h3>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
