"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Shield,
  Menu,
  Search,
  Phone,
  User,
  Car,
  Heart,
  Home,
  Plane,
  Building2,
  Calculator,
  ChevronDown,
} from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const insuranceProducts = [
    { id: "motor", name: "Motor Insurance", icon: Car, href: "/products/motor" },
    { id: "health", name: "Health Insurance", icon: Heart, href: "/products/health" },
    { id: "home", name: "Home Insurance", icon: Home, href: "/products/home" },
    { id: "travel", name: "Travel Insurance", icon: Plane, href: "/products/travel" },
    { id: "business", name: "Business Insurance", icon: Building2, href: "/products/business" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Check if it's a claim ID, policy number, or PAN
      const query = searchQuery.trim().toUpperCase()

      if (query.startsWith("CLM") || query.startsWith("CLAIM")) {
        // Redirect to claim search
        window.location.href = `/claims/search?id=${encodeURIComponent(query)}`
      } else if (query.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
        // PAN format - redirect to policy search
        window.location.href = `/policies/search?pan=${encodeURIComponent(query)}`
      } else if (query.startsWith("POL") || query.match(/^[A-Z0-9]{8,15}$/)) {
        // Policy number format
        window.location.href = `/policies/search?policy=${encodeURIComponent(query)}`
      } else {
        // General search
        window.location.href = `/search?q=${encodeURIComponent(query)}`
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 mr-8">
          <div className="relative">
            <Shield className="h-8 w-8 text-vanilla-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-vanilla-600 to-vanilla-800 bg-clip-text text-transparent">
              Amar Insurance
            </h1>
            <p className="text-xs text-muted-foreground">Trusted Protection</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 flex-1">
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {insuranceProducts.map((product) => (
                <DropdownMenuItem key={product.id} asChild>
                  <Link href={product.href} className="flex items-center space-x-2">
                    <product.icon className="h-4 w-4" />
                    <span>{product.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/compare" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Compare Plans
          </Link>
          <Link href="/claims" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Claims
          </Link>
          <Link href="/support" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Support
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 ml-auto">
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by Claim ID, Policy No, PAN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </form>

          {/* Mobile Search Toggle */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-4 w-4" />
          </Button>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/quote">
              <Button size="sm" className="bg-vanilla-600 hover:bg-vanilla-700">
                <Calculator className="h-4 w-4 mr-2" />
                Get Quote
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </Button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="space-y-2">
                  <h3 className="font-semibold text-vanilla-900">Insurance Products</h3>
                  {insuranceProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={product.href}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-vanilla-50"
                    >
                      <product.icon className="h-4 w-4 text-vanilla-600" />
                      <span>{product.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-2">
                  <Link href="/compare" className="block p-2 rounded-lg hover:bg-vanilla-50">
                    Compare Plans
                  </Link>
                  <Link href="/claims" className="block p-2 rounded-lg hover:bg-vanilla-50">
                    Claims
                  </Link>
                  <Link href="/support" className="block p-2 rounded-lg hover:bg-vanilla-50">
                    Support
                  </Link>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Link href="/quote">
                    <Button className="w-full bg-vanilla-600 hover:bg-vanilla-700">
                      <Calculator className="h-4 w-4 mr-2" />
                      Get Quote
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t p-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by Claim ID, Policy No, PAN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </div>
      )}

      {/* Live Support Badge */}
      <div className="absolute top-4 right-4">
        <Badge className="bg-green-100 text-green-800 animate-pulse">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Live Support
        </Badge>
      </div>
    </header>
  )
}
