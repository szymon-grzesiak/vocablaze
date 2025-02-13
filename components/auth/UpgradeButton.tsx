"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { createCheckoutSession } from "@/lib/actions/action";
import { Spinner } from "@nextui-org/react";

interface UpgradeButtonProps {
  userEmail: string;
}

export default function UpgradeButton({ userEmail }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    try {
      setLoading(true);
      const res = await createCheckoutSession({ userEmail });
      
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error("Upgrade failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="mt-4 w-full border-white text-white hover:bg-white hover:text-gray-900 dark:hover:text-black"
      variant="bordered"
      onPress={handleUpgrade}
      isDisabled={loading}
    >
      {loading ? (
        <Spinner className="text-white" />
      ) : (
        "Upgrade Now"
      )}
    </Button>
  );
}
