"use client";

import { ModalOpenReason } from "@/types/purchaseModal.types";
import { createContext, useContext, useState } from "react";

const initialState = {
  isPurchaseModalOpen: false,
  setIsPurchaseModalOpen: () => {},
  title: "",
  handleOpenModal: () => {},
};

type InitialStateType = {
  isPurchaseModalOpen: boolean;
  setIsPurchaseModalOpen: (isOpen: boolean) => void;
  title: string;
  handleOpenModal: (reason: ModalOpenReason) => void;
};

const DataContext = createContext<InitialStateType>(initialState);

export function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleOpenModal = (reason: ModalOpenReason) => {
    if (reason === "Purchase") {
      setTitle("Purchase Tokens 🪙");
      setIsPurchaseModalOpen(true);
    } else {
      setTitle("Not enough tokens 😔");
      setIsPurchaseModalOpen(true);
    }
  };

  const value = {
    isPurchaseModalOpen,
    setIsPurchaseModalOpen,
    title,
    handleOpenModal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
