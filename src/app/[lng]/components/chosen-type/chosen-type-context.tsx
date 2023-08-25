import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const ChosenTypeContext = createContext<{
  chosenType: string;
  setChosenType: Dispatch<SetStateAction<string>>;
}>({
  chosenType: "",
  setChosenType: () => {},
});

export const useChosenTypeContext = () => {
  const onboardingContext = useContext(ChosenTypeContext);
  if (onboardingContext === undefined) {
    throw new Error("useChosenTypeContext must be inside a ChosenTypeProvider");
  }
  return onboardingContext;
};

const ChosenTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [chosenType, setChosenType] = useState("all");

  const value = { chosenType, setChosenType };

  return (
    <ChosenTypeContext.Provider value={value}>
      {children}
    </ChosenTypeContext.Provider>
  );
};

export default ChosenTypeProvider;
