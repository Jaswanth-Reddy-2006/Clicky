"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Agentation with SSR disabled to prevent any server-side rendering issues
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

export const AgentationWrapper: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Active for deployment (production) or when explicitly enabled via environment variable
  const shouldRender =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_AGENTATION === "true";

  if (!shouldRender) {
    return null;
  }

  return <Agentation />;
};

export default AgentationWrapper;
