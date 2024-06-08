import { SkeletonCard } from "@/components/shared/SkeletonCard";
import SkeletonPage from "@/components/shared/SkeletonPage";
import TypeOfContentSelect from "@/components/shared/TypeOfContentSelect";
import { Suspense } from "react";

export default function SavedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<SkeletonCard />}>
        <span className="my-5 text-[20px] font-bold ">Saved Ideas & Content</span>
        <div className="flex flex-col items-center gap-3 mb-5">
          <TypeOfContentSelect />
        </div>
      </Suspense>
      <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
    </div>
  );
}
