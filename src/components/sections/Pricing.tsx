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
      <div className="w-full flex flex-col flex-wrap sm:flex-row gap-8 items-center justify-center">
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center sm:min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500 hover:translate-y-[-10px] animate-all duration-500 transition-ease-in-out min-h-[300px]">
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
            Price: $10
          </h1>
        </div>
        <div className="pb-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center sm:min-h-[350px] min-h-[300px]  bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500 hover:translate-y-[-10px] animate-all duration-500 transition-ease-in-out">
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
            Price: $20
          </h1>
        </div>
        <div className="p-5 border-2 border-white rounded-xl max-w-[350px] flex flex-col items-center justify-center sm:min-h-[350px] bg-gradient-to-br from-slate-600 to-slate-800 drop-shadow-xl hover:border-purple-500 hover:translate-y-[-10px] animate-all duration-500 transition-ease-in-out min-h-[300px]">
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
            Price: $30
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
