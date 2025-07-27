"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Shield,
  FileText,
  TrendingUp,
  Phone,
  Download,
  Eye,
  Car,
  Heart,
  Home,
  Plane,
  IndianRupee,
  Plus,
  Mail,
  Calendar,
  Target,
  Award,
  LogOut,
  Calculator,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { generatePDF } from "@/lib/pdf-generator"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  type: "health" | "motor" | "home" | "travel"
  status: "new" | "contacted" | "interested" | "converted" | "lost"
  source: string
  createdDate: string
  followUpDate?: string
  notes?: string
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  policies: number
  totalPremium: number
  lastContact: string
  status: "active" | "inactive"
}

interface Commission {
  id: string
  policyId: string
  clientName: string
  policyType: string
  premium: number
  commissionRate: number
  commissionAmount: number
  status: "pending" | "paid"
  date: string
}

export default function AgentDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const [agentStats, setAgentStats] = useState({
    totalClients: 45,
    monthlyCommission: 125000,
    conversionRate: 68,
    targetAchievement: 85,
    newLeads: 12,
    activePolicies: 78,
  })

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "LED001",
      name: "Amit Sharma",
      email: "amit.sharma@email.com",
      phone: "+91 9876543230",
      type: "health",
      status: "new",
      source: "Website",
      createdDate: "2024-07-25",
      followUpDate: "2024-07-27",
      notes: "Interested in family health insurance",
    },
    {
      id: "LED002",
      name: "Priya Gupta",
      email: "priya.gupta@email.com",
      phone: "+91 9876543231",
      type: "motor",
      status: "contacted",
      source: "Referral",
      createdDate: "2024-07-24",
      followUpDate: "2024-07-26",
      notes: "Looking for comprehensive motor insurance",
    },
    {
      id: "LED003",
      name: "Rohit Patel",
      email: "rohit.patel@email.com",
      phone: "+91 9876543232",
      type: "home",
      status: "interested",
      source: "Social Media",
      createdDate: "2024-07-23",
      notes: "Owns a 2BHK apartment in Mumbai",
    },
  ])

  const [clients, setClients] = useState<Client[]>([
    {
      id: "CLI001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 9876543210",
      policies: 3,
      totalPremium: 27500,
      lastContact: "2024-07-20",
      status: "active",
    },
    {
      id: "CLI002",
      name: "Sunita Singh",
      email: "sunita.singh@email.com",
      phone: "+91 9876543211",
      policies: 2,
      totalPremium: 18500,
      lastContact: "2024-07-18",
      status: "active",
    },
    {
      id: "CLI003",
      name: "Vikram Mehta",
      email: "vikram.mehta@email.com",
      phone: "+91 9876543212",
      policies: 1,
      totalPremium: 12000,
      lastContact: "2024-07-15",
      status: "inactive",
    },
  ])

  const [commissions, setCommissions] = useState<Commission[]>([
    {
      id: "COM001",
      policyId: "POL001",
      clientName: "Rajesh Kumar",
      policyType: "Health Insurance",
      premium: 12500,
      commissionRate: 15,
      commissionAmount: 1875,
      status: "paid",
      date: "2024-07-01",
    },
    {
      id: "COM002",
      policyId: "POL002",
      clientName: "Sunita Singh",
      policyType: "Motor Insurance",
      premium: 8500,
      commissionRate: 12,
      commissionAmount: 1020,
      status: "pending",
      date: "2024-07-15",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "interested":
        return "bg-orange-100 text-orange-800"
      case "converted":
        return "bg-green-100 text-green-800"
      case "lost":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "health":
        return <Heart className="h-4 w-4 text-red-500" />
      case "motor":
        return <Car className="h-4 w-4 text-blue-500" />
      case "home":
        return <Home className="h-4 w-4 text-green-500" />
      case "travel":
        return <Plane className="h-4 w-4 text-purple-500" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const handleLeadStatusUpdate = (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
  }

  const handleExportPDF = async (type: "leads" | "clients" | "commissions") => {
    let data: any[] = []
    let title = ""

    switch (type) {
      case "leads":
        data = leads
        title = "Leads Report"
        break
      case "clients":
        data = clients
        title = "Clients Report"
        break
      case "commissions":
        data = commissions
        title = "Commission Report"
        break
    }

    await generatePDF(data, title, "Amar IMF Services Pvt Ltd - Agent Report")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
                <p className="text-gray-600">Amar IMF Services Pvt Ltd</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user?.name || "Agent User"}</p>
                <p className="text-sm text-gray-600">{user?.email || "agent@amarimf.com"}</p>
              </div>
              <Avatar>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{agentStats.totalClients}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Commission</p>
                  <p className="text-2xl font-bold text-gray-900">₹{agentStats.monthlyCommission.toLocaleString()}</p>
                </div>
                <IndianRupee className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{agentStats.conversionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Target Achievement</p>
                  <p className="text-2xl font-bold text-gray-900">{agentStats.targetAchievement}%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{agentStats.newLeads}</p>
                </div>
                <Plus className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Policies</p>
                  <p className="text-2xl font-bold text-gray-900">{agentStats.activePolicies}</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Monthly Target Progress
            </CardTitle>
            <CardDescription>Your progress towards monthly sales target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Target Achievement</span>
                <span className="font-semibold">{agentStats.targetAchievement}% of ₹150,000</span>
              </div>
              <Progress value={agentStats.targetAchievement} className="h-3" />
              <div className="text-sm text-gray-600">
                ₹{(150000 * agentStats.targetAchievement) / 100} achieved of ₹150,000 target
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New lead: Amit Sharma (Health Insurance)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Policy renewed for Rajesh Kumar</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Commission received: ₹1,875</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Follow-up scheduled with Priya Gupta</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-semibold">₹{agentStats.monthlyCommission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Month</span>
                      <span className="font-semibold">₹98,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Growth</span>
                      <span className="font-semibold text-green-600">+26.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rank</span>
                      <span className="font-semibold">#3 of 89 agents</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Lead Management</h2>
              <div className="flex space-x-2">
                <Button onClick={() => handleExportPDF("leads")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {leads.map((lead) => (
                <Card key={lead.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">{getTypeIcon(lead.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{lead.name}</h3>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="font-medium">{lead.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Phone</p>
                              <p className="font-medium">{lead.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Type</p>
                              <p className="font-medium capitalize">{lead.type}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Source</p>
                              <p className="font-medium">{lead.source}</p>
                            </div>
                          </div>
                          {lead.notes && (
                            <div className="mb-3">
                              <p className="text-gray-500 text-sm">Notes</p>
                              <p className="text-sm">{lead.notes}</p>
                            </div>
                          )}
                          {lead.followUpDate && (
                            <div className="flex items-center text-sm text-orange-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              Follow-up: {new Date(lead.followUpDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(`tel:${lead.phone}`)}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${lead.email}`)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleLeadStatusUpdate(lead.id, "converted")}
                        >
                          Convert
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Client Portfolio</h2>
              <Button onClick={() => handleExportPDF("clients")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <div className="grid gap-6">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{client.name}</h3>
                            <Badge className={getStatusColor(client.status)}>
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="font-medium">{client.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Phone</p>
                              <p className="font-medium">{client.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Policies</p>
                              <p className="font-medium">{client.policies}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Premium</p>
                              <p className="font-medium">₹{client.totalPremium.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            Last Contact: {new Date(client.lastContact).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(`tel:${client.phone}`)}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Commission Tracking</h2>
              <Button onClick={() => handleExportPDF("commissions")}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commission ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Policy Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commission
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {commissions.map((commission) => (
                        <tr key={commission.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{commission.id}</div>
                            <div className="text-sm text-gray-500">{commission.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{commission.clientName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{commission.policyType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{commission.premium.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {commission.commissionRate}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ₹{commission.commissionAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(commission.status)}>
                              {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <h2 className="text-xl font-semibold">Agent Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Quick Quote Generator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Generate instant quotes for your clients</p>
                  <Button className="w-full">Generate Quote</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Plan Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Compare different insurance plans</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    Compare Plans
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Policy Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Access policy templates and documents</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    View Documents
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">24/7 support for agents</p>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    onClick={() => window.open("tel:8770877270")}
                  >
                    Call: 8770877270
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">View your performance metrics</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Training Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Access training materials and resources</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    View Resources
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
