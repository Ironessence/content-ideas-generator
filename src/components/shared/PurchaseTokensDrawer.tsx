import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Image from "next/image";
import close from "@/assets/icons/icon-close.png";
import { pricingOptions } from "@/constants";
import PricingCard from "./PricingCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PurchaseTokensDrawerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const PurchaseTokensDrawer = ({ isOpen, setIsOpen }: PurchaseTokensDrawerProps) => {
  console.log("RENDERED");
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DrawerContent className="max-h-[80vh]">
        <div className="flex items-end justify-end mx-6">
          <Image
            src={close}
            alt="close"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <DrawerHeader>
          <DrawerTitle className="text-slate-600  text-center"> Not enough tokens 😔</DrawerTitle>
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
