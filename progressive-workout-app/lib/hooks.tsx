"use client"; // This is a Client Component because it uses hooks.

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserData, getUserData } from "./storage";

// Define the shape of the data that our context will provide
type UserDataContextType = {
  userData: UserData | null; // The user's progress data, or null while loading
  refreshUserData: () => Promise<void>; // A function to reload data after an update
};

// Create the context with a default value
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Create the Provider component. This will wrap our app's pages.
export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  // This function will be used to load or reload data from localforage
  const refreshUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  // useEffect runs once when the component is first mounted
  useEffect(() => {
    refreshUserData();
  }, []); // The empty array [] ensures it only runs once on load

  return (
    <UserDataContext.Provider value={{ userData, refreshUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

// Create a custom hook for easy access to the context's data
export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}