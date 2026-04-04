import { createContext, useContext } from "react";

interface NavigationContextValue {
  currentFolderId: string;
}

const NavigationContext = createContext<NavigationContextValue>({
  currentFolderId: "root",
});

export function NavigationProvider({
  currentFolderId,
  children,
}: NavigationContextValue & { children: React.ReactNode }) {
  return (
    <NavigationContext.Provider value={{ currentFolderId }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  return useContext(NavigationContext);
}
