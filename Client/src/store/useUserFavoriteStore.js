import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserFavorite = create(
    persist(
        (set) => ({
            userFavorite: [],
            setUserFavorite: (newUserFavorite) => set({ userFavorite: newUserFavorite }),
            clearUserFavorite: () => set({ userFavorite: [] })
        }), {
        name: "User-Favorite"
    }
    )
)