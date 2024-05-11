import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

interface SignInDialogProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (value: boolean) => void;
}

const SignInDialog = ({ isLoginOpen, setIsLoginOpen }: SignInDialogProps) => {
  return (
    <Dialog
      open={isLoginOpen}
      onOpenChange={() => setIsLoginOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[24px] font-bold text-center mr-5 text-gray-700">
            <span className="text-[32px]">👋</span> Hey there!{" "}
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            It looks like you are not logged in. Please log in or sign up below to start generating
            content & ideas.
            <Button
              onClick={(e) => {
                e.preventDefault();
                signIn("google", { callbackUrl: "/" });
              }}
              className="hover:bg-pink-500 mt-5 w-[200px] mr-auto ml-auto"
            >
              Log in with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
