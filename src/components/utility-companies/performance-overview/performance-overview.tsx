import { ArrowUp, Building2, ChevronRight, Edit, Mail, MapPin, Phone, PlugZap, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; const performanceData = {
    name: "IBDEC",
    status: "Active",
    registered: "1/15/January 15, 2024",
    summary: [
        {
            title: "Total Customers",
            value: "200,000",
            change: "+8%",
            changeColor: "text-green-600",
            subtitle: "Vs last year",
            icon: <Users size={20} className="text-gray-600" />,
            iconBg: "bg-gray-100",
        },
        {
            title: "Total Vending Amount",
            value: "N1.2 Billion",
            change: "+2%",
            changeColor: "text-green-600",
            subtitle: "Vs last year",
            icon: <TrendingUp size={20} className="text-gray-600" />,
            iconBg: "bg-gray-100",
        },
        {
            title: "Total Billing Amount",
            value: "N2.4 Billion",
            change: "+5%",
            changeColor: "text-green-600",
            subtitle: "Vs last year",
            icon: <TrendingUp size={20} className="text-gray-600" />,
            iconBg: "bg-gray-100",
        },
        {
            title: "Feeders Connected",
            value: "200",
            change: "+1%",
            changeColor: "text-green-600",
            subtitle: "Vs last year",
            icon: <PlugZap size={20} className="text-gray-600" />,
            iconBg: "bg-gray-100",
        },
    ],
    profile: {
        company: "IBDEC",
        contact: "Ada Okoro",
        email: "ada@powergrid.com",
        phone: "+234 810 XXX XXXX",
        address: "12 Adeola Odeku St, Lagos",
    },
    hierarchy: [
        { name: "KWARA", level: 1 },
        { name: "IBADAN", level: 1 },
        { name: "JERICHO", level: 1 },
    ],
}; export default function PerformanceOverview({ params }: { params: { slug: string } }) {
    // In a real app, fetch data based on params.slug
    // For now, hardcoded as per images
    const company = performanceData; return (
        <div className="space-y-6 p-6 bg-[#FEFAF5]">
            {/* Title Section */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Performance Overview</h1>
                <p className="text-sm text-gray-500">Manage {company.name}</p>
            </div>  {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {company.summary.map((item, idx) => (
                    <Card key={idx} className="border border-gray-200 bg-white shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="mb-2 text-sm font-medium text-gray-600">{item.title}</p>
                                    <p className="mb-1 text-2xl font-bold text-gray-900">{item.value}</p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        {item.subtitle}
                                        <span className={`font-medium ${item.changeColor}`}>{item.change}</span>
                                    </div>
                                </div>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}>
                                    {item.icon}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Company Status */}
            <Card className="border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                            <Building2 size={20} className="text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">{company.name}</h2>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                    {company.status}
                                </Badge>
                                <p className="text-sm text-gray-500">Registered {company.registered}</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        <Edit size={16} className="mr-2" /> Edit Info
                    </Button>
                </CardContent>
            </Card>

            {/* Profile and Hierarchy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Profile */}
                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Company Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="mb-4 text-sm font-medium text-gray-600">Company Information</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Building2 size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Company</p>
                                    <p className="text-sm text-gray-600">{company.profile.company}</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Users size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Contact Person</p>
                                    <p className="text-sm text-gray-600">{company.profile.contact}</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-gray-500" />
                                <p className="text-sm text-gray-600">{company.profile.email}</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-gray-500" />
                                <p className="text-sm text-gray-600">{company.profile.phone}</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Address</p>
                                    <p className="text-sm text-gray-600">{company.profile.address}</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Organizational Hierarchy */}
                <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Organizational Hierarchy</CardTitle>
                        <p className="text-sm text-gray-500">Build the organization structure</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ChevronRight size={16} className="text-gray-500 rotate-90" /> {/* Expanded */}
                                    <span className="font-medium text-gray-900">{company.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                    + <Edit size={12} className="ml-1" />
                                </Button>
                            </div>
                            {company.hierarchy.map((node, idx) => (
                                <div key={idx} className="pl-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ChevronRight size={16} className="text-gray-500" /> {/* Collapsed */}
                                        <span className="text-gray-900">{node.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                        + <Edit size={12} className="ml-1" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>);
}

