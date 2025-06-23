import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAllListingStore = create(
    persist(
        (set) => ({
            allListing: [],
            setAllListing: (newListing) => set({ allListing: newListing }),
            clearAllListing: () => set({ allListing: [] })
        }), {
        name: "All-Listings"
    }
    )
)