import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";

export const useSidebar = create(
  persist(
    (set, get) => ({
      isOpen: true,
      isHover: false,
      settings: { disabled: false, isHoverOpen: false },

      toggleOpen: () => {
        const state = get();
        set({ isOpen: !state.isOpen });
      },

      setIsOpen: (isOpen) => {
        set({ isOpen: Boolean(isOpen) });
      },

      setIsHover: (isHover) => {
        set({ isHover: Boolean(isHover) });
      },

      getOpenState: () => {
        const { isOpen, isHover, settings } = get();
        return isOpen || (settings?.isHoverOpen && isHover);
      },

      setSettings: (settings) => {
        set(
          produce((state) => {
            state.settings = { 
              disabled: settings.disabled ?? state.settings.disabled,
              isHoverOpen: settings.isHoverOpen ?? state.settings.isHoverOpen,
            };
          })
        );
      },
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
