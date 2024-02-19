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
          <DialogTitle className="text-[24px] font-bold text-center mr-5">
            <span className="text-[32px]">👋</span> Hey there!{" "}
          </DialogTitle>
          <DialogDescription className="flex flex-col">
            It looks like you are not logged in. Please log in or sign up below to start generating
            ideas.
            <Button
              onClick={(e) => {
                e.preventDefault();
                signIn("google", { callbackUrl: "/" });
              }}
              className="hover:bg-purple-900 mt-5 w-auto"
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
