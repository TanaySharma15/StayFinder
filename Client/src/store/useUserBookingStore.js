import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserBookingStore = create(
    persist(
        (set) => ({
            userBooking: [],
            setUserBooking: (newBooking) => set({ userBooking: newBooking }),
            clearUserBooking: () => set({ userBooking: [] })
        }), {
        name: "User-booking"
    }
    )
)