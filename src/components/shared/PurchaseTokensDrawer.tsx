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

interface PurchaseTokensDrawerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const PurchaseTokensDrawer = ({ isOpen, setIsOpen }: PurchaseTokensDrawerProps) => {
  console.log("RENDERED");
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
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
            Please purchase more tokens to continue to generate content
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PurchaseTokensDrawer;
