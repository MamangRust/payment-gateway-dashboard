import { NotificationState } from "@/types/state/notification";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

const useNotificationStore = create(
  persist<NotificationState>(
    (set) => ({
      notifications: [
        { id: 1, message: "Dummy notification 1" },
        { id: 2, message: "Dummy notification 2" },
        { id: 3, message: "Dummy notification 3" },
        { id: 4, message: "Dummy notification 4" },
        { id: 5, message: "Dummy notification 5" },
      ],
      addNotification: (message) => {
        set((state) => ({
          notifications: [...state.notifications, { id: Date.now(), message }],
        }));
      },
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id,
          ),
        }));
      },
    }),
    {
      name: "notification-storage",
      getStorage: () => localStorage,
    } as PersistOptions<NotificationState>,
  ),
);

export default useNotificationStore;
