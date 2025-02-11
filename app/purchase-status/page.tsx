import PurchaseStatus from "@/containers/purchase-status";
import React, { Suspense } from "react";

const PurchaseStatusPage = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <PurchaseStatus />
    </Suspense>
  );
};

export default PurchaseStatusPage;
