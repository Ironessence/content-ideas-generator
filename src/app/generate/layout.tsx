import { SkeletonCard } from "@/components/shared/SkeletonCard";
import SkeletonPage from "@/components/shared/SkeletonPage";
import TypeOfContentSelect from "@/components/shared/TypeOfContentSelect";
import { Suspense } from "react";

export default function GenerateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Suspense fallback={<SkeletonCard />}>
        <div className="mt-5 flex flex-col items-center gap-3">
          <TypeOfContentSelect />
        </div>
      </Suspense>
      <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
    </div>
  );
}
