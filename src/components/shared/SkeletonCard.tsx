import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full  ">
      <Skeleton className="h-[225px] w-[100%] max-w-[600px] rounded-xl bg-slate-700" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100%] bg-slate-700 max-w-[600px]" />
        <Skeleton className="h-4 w-[100%] bg-slate-700 max-w-[600px]" />
      </div>
    </div>
  );
}
