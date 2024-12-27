"use client"

import { getRole } from "@/utils/session";
import { notFound } from "next/navigation";
import React from "react";

const Guard: React.FC<IChildren> = ({ children }) => {
  const role = getRole();

  if (!role || role !== "ADMIN") {
    return notFound();
  }

  return <>{children}</>;
};

export default Guard;
