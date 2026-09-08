import { Suspense } from "react";
import SectionPage from "@/components/Section/SectionPage";
import ConfirmationClient from "./ConfirmationClient";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <SectionPage classSection="bg-bg-cart min-h-screen">
          <div className="text-center py-20">
            <p className="font-heading text-2xl text-quaternary">
              Loading your order...
            </p>
          </div>
        </SectionPage>
      }
    >
      <ConfirmationClient />
    </Suspense>
  );
}
