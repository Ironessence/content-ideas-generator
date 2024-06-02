"use client";
import CustomLoader from "@/components/shared/Loader/CustomLoader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { getUserTransactions } from "@/lib/clientApi";
import { TransactionType } from "@/types/transaction.types";
import { useEffect, useState } from "react";

const Transactions = () => {
  const { user } = useUserContext();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getUserTransactions(user.email)
        .then((data) => {
          const sortedData = data.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setTransactions(sortedData);
        })
        .catch(() => {
          toast({
            title: "Error obtaining transactions!",
            description: "Please try again later. If the problem persists, contact support.",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [toast, user]);

  return (
    <div className="h-[calc(100vh-70px)] overflow-auto">
      <h1 className="text-center font-bold text-[24px] mt-5">Transaction History</h1>
      <div className="flex flex-col items-center justify-center py-10">
        {isLoading ? (
          <CustomLoader />
        ) : !isLoading && transactions.length === 0 ? (
          <h2>No transactions found.</h2>
        ) : (
          <Table className="max-h-[70vh] sm:max-w-[70%] ml-auto mr-auto">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>#Tokens</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction._id}
                  className="hover:bg-transparent"
                >
                  <TableCell>{transaction._id.toString().substring(0, 15) + "..."}</TableCell>
                  <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">{transaction.quantity}</TableCell>

                  <TableCell className="text-right font-semibold  ">{`$ ${transaction.price}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Transactions;
