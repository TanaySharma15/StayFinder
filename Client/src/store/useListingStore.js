import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useListingStore = create(
    persist(
        (set) => ({
            listings: [],
            setListings: (newListings) => set({ listings: newListings }),
            clearListings: () => set({ listings: [] }),
        }),
        {
            name: "listing-storage",
        }
    )
);
