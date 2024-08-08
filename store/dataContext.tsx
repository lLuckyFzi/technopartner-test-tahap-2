import { CategoriesType } from "@/Type/MenuType";
import { ProfileDataType } from "@/Type/ProfileType";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface DataContextType {
  menuData: CategoriesType[] | null;
  profileData: ProfileDataType | null;
  setProfileData: (data: ProfileDataType | null) => void;
  setMenuData: (data: CategoriesType[] | null) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const [menuData, setMenuData] = useState<CategoriesType[] | null>(null);

  return (
    <DataContext.Provider
      value={{ profileData, setProfileData, menuData, setMenuData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAuth must be used within an DataProvider");
  }
  return context;
};
