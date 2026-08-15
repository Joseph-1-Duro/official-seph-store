import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnnouncementBarState {
  isMounted: boolean;
  isHydrated: boolean;
  hiddenUntil: number | null;

  dismissBanner: () => void;
  checkIsMounted: () => void;
}

const HIDDEN_DURATION = 7 * 24 * 60 * 60 * 1000;

export const useAnnoucmentBarStore = create<AnnouncementBarState>()(
  persist(
    (set, get) => ({
      isMounted: false,
      isHydrated: false,
      hiddenUntil: null,

      dismissBanner: () => {
        set({
          isMounted: false,
          hiddenUntil: Date.now() + HIDDEN_DURATION,
        })
      },

      checkIsMounted: () => {
        const { hiddenUntil } = get();

        const isvisible = hiddenUntil === null || Date.now() >= hiddenUntil;

        set({ isMounted: isvisible })
      }
    }),
    {
      name: "announcement-bar-storage",
      partialize: (state) => ({
        hiddenUntil: state.hiddenUntil,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        state.isHydrated = true;
        state.checkIsMounted(); // check on hydration
      }
    }
  )
)