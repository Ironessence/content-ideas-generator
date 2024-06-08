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
      <TypeOfContentSelect />
      <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
    </div>
  );
}
