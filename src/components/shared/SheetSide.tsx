import { Sheet, SheetContent, SheetDescription, SheetHeader } from "@/components/ui/sheet";
import Logo from "./Logo";

interface SheetSideProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
}

const SheetSide = ({ isSheetOpen, setIsSheetOpen }: SheetSideProps) => {
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
    >
      <SheetContent
        side={"left"}
        className="bg-slate-800 border-0 drop-shadow-xl"
      >
        <SheetHeader>
          <Logo />
          <SheetDescription>This is some text updated</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetSide;
