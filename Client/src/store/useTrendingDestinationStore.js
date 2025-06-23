import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTrendingDestinationStore = create(
    persist(
        (set) => ({
            trending: [],
            setTrending: (newTrending) => set({ trending: newTrending }),
            clearTrending: () => set({ trending: [] })
        }), {
        name: "Trending-destination"
    }
    )
)