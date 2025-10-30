import { CreditCard, Settings, Zap } from "lucide-react";
import type { JSX } from "react";

export const icons: Record<string, JSX.Element> = {
  Billing: <CreditCard size={16} className="text-black" />,
  Vending: <Zap size={16} className="text-black" />,
  HES: <Settings size={16} className="text-black"/>
};
