// summary-cards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertCircle, Users, Building2 } from "lucide-react";

const summaryData = [
  {
    title: "Total Active",
    value: "12",
    subtitle: "Out of 14",
    icon: <TrendingUp size={20} />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    title: "Total Suspended",
    value: "2",
    subtitle: "Across all utilities",
    icon: <AlertCircle size={20} />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    title: "Total Customers",
    value: "45,200",
    subtitle: "Across all utilities",
    icon: <Users size={20} />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    title: "Total Utilities",
    value: "14",
    subtitle: "12 Active",
    icon: <Building2 size={20} />,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item, idx) => (
        <Card key={idx} className="border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="mb-2 text-sm font-medium text-gray-600">
                  {item.title}
                </p>
                <p className="mb-1 text-2xl font-bold text-gray-900">
                  {item.value}
                </p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
              <div
                className={`rounded-lg p-5 ${item.iconBg} ${item.iconColor}`}
              >
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
