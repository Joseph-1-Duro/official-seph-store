import { useAnnoucmentBarStore } from "@/store/announcementBar.store";
import { X } from "lucide-react";
import { useShallow } from "zustand/shallow";

export default function AnnouncememtBar() {
  const { isMounted, isHydrated, dismissBanner } = useAnnoucmentBarStore(
    useShallow((state) => ({
      isMounted: state.isMounted,
      isHydrated: state.isHydrated,
      dismissBanner: state.dismissBanner,
    }))
  );

  if (!isMounted || isHydrated) return;

  return (
    <div
      role="status"
      aria-live="polite"
      className="announcement-bar"
    >
      <p className="text"></p>
      
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