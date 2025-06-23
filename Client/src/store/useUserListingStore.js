import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserListingStore = create(
    persist(
        (set) => ({
            userListing: [],
            setUserListing: (newUserListings) => set({ userListing: newUserListings }),
            clearUserListing: () => set({ userListing: [] })
        }), {
        name: "User-listings"
    }
    )
) 