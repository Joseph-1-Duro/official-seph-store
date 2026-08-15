"use client"

import { useAnnoucmentBarStore } from "@/store/announcementBar.store";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useShallow } from "zustand/shallow";

export default function AnnouncememtBar() {
  const { isMounted, isHydrated, dismissBanner } = useAnnoucmentBarStore(
    useShallow((state) => ({
      isMounted: state.isMounted,
      isHydrated: state.isHydrated,
      dismissBanner: state.dismissBanner,
    }))
  );

  if (!isMounted || !isHydrated) return;

  return (
    <div
      role="status"
      aria-live="polite"
      className="announcement-bar"
    >
      <p className="text">
        We've launched!
        <Link href={"/shop"}>Shop Now <ArrowRight /></Link>
      </p>
      
      <button
        onClick={dismissBanner}
        type="button"
        aria-label="Dismmis announcement bar"
        title="Dismiss announcment"
      >
        <X />
      </button>
    </div>
  )
}