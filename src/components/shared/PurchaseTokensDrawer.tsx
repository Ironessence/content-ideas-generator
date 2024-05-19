"use client";
import close from "@/assets/icons/icon-close.png";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { pricingOptions } from "@/constants";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import PricingCard from "./PricingCard";

const PurchaseTokensDrawer = () => {
  const { isPurchaseModalOpen, setIsPurchaseModalOpen, title } = useDataContext();

  return (
    <Drawer
      open={isPurchaseModalOpen}
      onClose={() => setIsPurchaseModalOpen(false)}
    >
      <DrawerContent className="max-h-[80vh]">
        <div className="flex items-end justify-end mx-6">
          <Image
            src={close}
            alt="close"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setIsPurchaseModalOpen(false)}
          />
        </div>
        <DrawerHeader>
          <DrawerTitle className="text-slate-600  text-center">{title}</DrawerTitle>
          <DrawerDescription className="text-center">
            Please purchase more tokens to continue generating ideas & content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <ScrollArea className="overflow-auto h-full max-h-[60vh]">
            <div className="flex items-center justify-center flex-wrap gap-0 sm:gap-5">
              {pricingOptions.map((option) => (
                <PricingCard
                  key={option.id}
                  option={option}
                />
              ))}
            </div>
          </ScrollArea>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PurchaseTokensDrawer;
