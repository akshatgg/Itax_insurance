"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Shield,
  TrendingUp,
  Phone,
  Download,
  Eye,
  Clock,
  Car,
  Heart,
  Home,
  Plane,
  IndianRupee,
  Search,
  UserPlus,
  Settings,
  LogOut,
  BarChart3,
  Activity,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { generatePDF } from "@/lib/pdf-generator"

interface User {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "suspended"
  joinDate: string
  totalPolicies: number
  totalPremium: number
}

interface Policy {
  id: string
  userId: string
  userName: string
  type: "health" | "motor" | "home" | "travel"
  company: string
  policyNumber: string
  premium: number
  coverageAmount: number
  status: "active" | "expired" | "pending"
  startDate: string
  endDate: string
}

interface Claim {
  id: string
  policyId: string
  userId: string
  userName: string
  type: string
  amount: number
  status: "pending" | "approved" | "rejected" | "processing"
  submittedDate: string
  description: string
}

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  clients: number
  commission: number
  performance: number
  status: "active" | "inactive"
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [stats, setStats] = useState({
    totalUsers: 12547,
    totalPolicies: 18923,
    totalRevenue: 4567000000,
    pendingClaims: 234,
    activeAgents: 89,
    monthlyGrowth: 12.5,
  })

  const [users, setUsers] = useState<User[]>([
    {
      id: "USR001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 9876543210",
      status: "active",
      joinDate: "2024-01-15",
      totalPolicies: 3,
      totalPremium: 27500,
    },
    {
      id: "USR002",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543211",
      status: "active",
      joinDate: "2024-02-20",
      totalPolicies: 2,
      totalPremium: 15000,
    },
    {
      id: "USR003",
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 9876543212",
      status: "inactive",
      joinDate: "2023-12-10",
      totalPolicies: 1,
      totalPremium: 8500,
    },
  ])

  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: "POL001",
      userId: "USR001",
      userName: "Rajesh Kumar",
      type: "health",
      company: "Star Health Insurance",
      policyNumber: "SH2024001234",
      premium: 12500,
      coverageAmount: 500000,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: "POL002",
      userId: "USR001",
      userName: "Rajesh Kumar",
      type: "motor",
      company: "ICICI Lombard",
      policyNumber: "IL2024005678",
      premium: 8500,
      coverageAmount: 800000,
      status: "active",
      startDate: "2024-02-15",
      endDate: "2025-02-14",
    },
  ])

  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "CLM001",
      policyId: "POL001",
      userId: "USR001",
      userName: "Rajesh Kumar",
      type: "Medical Treatment",
      amount: 25000,
      status: "pending",
      submittedDate: "2024-07-15",
      description: "Hospitalization for fever treatment",
    },
    {
      id: "CLM002",
      policyId: "POL002",
      userId: "USR001",
      userName: "Rajesh Kumar",
      type: "Accident Damage",
      amount: 45000,
      status: "processing",
      submittedDate: "2024-07-20",
      description: "Front bumper damage due to accident",
    },
  ])

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "AGT001",
      name: "Suresh Gupta",
      email: "suresh.gupta@amarimf.com",
      phone: "+91 9876543220",
      clients: 45,
      commission: 125000,
      performance: 85,
      status: "active",
    },
    {
      id: "AGT002",
      name: "Meera Singh",
      email: "meera.singh@amarimf.com",
      phone: "+91 9876543221",
      clients: 38,
      commission: 98000,
      performance: 78,
      status: "active",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleClaimAction = (claimId: string, action: "approve" | "reject") => {
    setClaims((prev) =>
      prev.map((claim) =>
        claim.id === claimId ? { ...claim, status: action === "approve" ? "approved" : "rejected" } : claim,
      ),
    )
  }

  const handleExportPDF = async (type: "users" | "policies" | "claims" | "agents") => {
    let data: any[] = []
    let title = ""

    switch (type) {
      case "users":
        data = users
        title = "Users Report"
        break
      case "policies":
        data = policies
        title = "Policies Report"
        break
      case "claims":
        data = claims
        title = "Claims Report"
        break
      case "agents":
        data = agents
        title = "Agents Report"
        break
    }

    await generatePDF(data, title, "Amar IMF Services Pvt Ltd")
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Amar IMF Services Pvt Ltd</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user?.name || "Admin User"}</p>
                <p className="text-sm text-gray-600">{user?.email || "admin@amarimf.com"}</p>
              </div>
              <Avatar>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback>AD</AvatarFallback>
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
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Policies</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPolicies.toLocaleString()}</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 10000000).toFixed(1)}Cr</p>
                </div>
                <IndianRupee className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Claims</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingClaims}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeAgents}</p>
                </div>
                <UserPlus className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Health Insurance</span>
                      <span className="font-semibold">₹18.5Cr (40%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Motor Insurance</span>
                      <span className="font-semibold">₹13.7Cr (30%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Home Insurance</span>
                      <span className="font-semibold">₹9.1Cr (20%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Travel Insurance</span>
                      <span className="font-semibold">₹4.6Cr (10%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New policy created by Rajesh Kumar</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Claim approved for ₹25,000</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">New agent registered: Meera Singh</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Premium payment received ₹12,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex space-x-2">
                <Button onClick={() => handleExportPDF("users")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Policies
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">ID: {user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalPolicies}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{user.totalPremium.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Policy Management</h2>
              <Button onClick={() => handleExportPDF("policies")}>
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
                          Policy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {policies.map((policy) => (
                        <tr key={policy.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{policy.policyNumber}</div>
                            <div className="text-sm text-gray-500">{policy.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {policy.type === "health" && <Heart className="h-4 w-4 mr-2 text-red-500" />}
                              {policy.type === "motor" && <Car className="h-4 w-4 mr-2 text-blue-500" />}
                              {policy.type === "home" && <Home className="h-4 w-4 mr-2 text-green-500" />}
                              {policy.type === "travel" && <Plane className="h-4 w-4 mr-2 text-purple-500" />}
                              <span className="text-sm capitalize">{policy.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{policy.premium.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(policy.status)}>
                              {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Claims Management</h2>
              <Button onClick={() => handleExportPDF("claims")}>
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
                          Claim ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {claims.map((claim) => (
                        <tr key={claim.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{claim.id}</div>
                            <div className="text-sm text-gray-500">{claim.submittedDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{claim.type}</div>
                            <div className="text-sm text-gray-500">{claim.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{claim.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getStatusColor(claim.status)}>
                              {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {claim.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleClaimAction(claim.id, "approve")}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleClaimAction(claim.id, "reject")}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Agent Management</h2>
              <div className="flex space-x-2">
                <Button onClick={() => handleExportPDF("agents")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Agent
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarFallback>
                          {agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{agent.name}</h3>
                        <p className="text-sm text-gray-600">{agent.email}</p>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Clients</span>
                        <span className="font-medium">{agent.clients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Commission</span>
                        <span className="font-medium">₹{agent.commission.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Performance</span>
                        <span className="font-medium">{agent.performance}%</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
