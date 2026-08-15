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
        ⚡ We&apos;ve launched!
        <Link className="announcement-bar__link" href={"/shop"}>Shop Now <ArrowRight /></Link>
      </p>

      <button
        onClick={dismissBanner}
        type="button"
        className="announcement-bar__dismiss"
        aria-label="Dismmis announcement bar"
        title="Dismiss announcment"
      >
        <X />
      </button>
    </div>
  )
}