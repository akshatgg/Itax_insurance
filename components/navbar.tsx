"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Shield,
  Menu,
  Phone,
  Mail,
  MapPin,
  Heart,
  Car,
  Home,
  Plane,
  Users,
  FileText,
  Calculator,
  Search,
  LogIn,
  UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"

const insuranceTypes = [
  {
    title: "Health Insurance",
    href: "/health-insurance",
    description: "Comprehensive health coverage for you and your family",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Motor Insurance",
    href: "/motor-insurance",
    description: "Complete protection for your vehicle",
    icon: Car,
    color: "text-blue-500",
  },
  {
    title: "Home Insurance",
    href: "/home-insurance",
    description: "Secure your home and belongings",
    icon: Home,
    color: "text-green-500",
  },
  {
    title: "Travel Insurance",
    href: "/travel-insurance",
    description: "Safe travels with comprehensive coverage",
    icon: Plane,
    color: "text-purple-500",
  },
]

const services = [
  {
    title: "Find an Agent",
    href: "/find-agent",
    description: "Connect with certified insurance agents",
    icon: Users,
  },
  {
    title: "File a Claim",
    href: "/claims",
    description: "Submit and track your insurance claims",
    icon: FileText,
  },
  {
    title: "Get a Quote",
    href: "/quote",
    description: "Get instant insurance quotes",
    icon: Calculator,
  },
  {
    title: "Policy Search",
    href: "/policies/search",
    description: "Search and manage your policies",
    icon: Search,
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Amar IMF</span>
              <p className="text-xs text-gray-600">Services Pvt Ltd</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive("/") && "bg-accent text-accent-foreground",
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Insurance</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {insuranceTypes.map((type) => (
                      <Link key={type.href} href={type.href} legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center space-x-2">
                            <type.icon className={cn("h-4 w-4", type.color)} />
                            <div className="text-sm font-medium leading-none">{type.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{type.description}</p>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {services.map((service) => (
                      <Link key={service.href} href={service.href} legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="flex items-center space-x-2">
                            <service.icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {service.description}
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/compare" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive("/compare") && "bg-accent text-accent-foreground",
                    )}
                  >
                    Compare
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/claims" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActive("/claims") && "bg-accent text-accent-foreground",
                    )}
                  >
                    Claims
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact Info & Auth */}
          <div className="flex items-center space-x-4">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden xl:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>8770877270</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@amarimf.com</span>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Company Info */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-gray-900">Amar IMF</span>
                      <p className="text-xs text-gray-600">Services Pvt Ltd</p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center space-x-2 text-lg font-medium transition-colors hover:text-orange-600",
                        isActive("/") && "text-orange-600",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Home</span>
                    </Link>

                    {/* Insurance Types */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Insurance</h3>
                      {insuranceTypes.map((type) => (
                        <Link
                          key={type.href}
                          href={type.href}
                          className={cn(
                            "flex items-center space-x-3 text-base transition-colors hover:text-orange-600 pl-4",
                            isActive(type.href) && "text-orange-600",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <type.icon className={cn("h-4 w-4", type.color)} />
                          <span>{type.title}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Services */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Services</h3>
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={cn(
                            "flex items-center space-x-3 text-base transition-colors hover:text-orange-600 pl-4",
                            isActive(service.href) && "text-orange-600",
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <service.icon className="h-4 w-4" />
                          <span>{service.title}</span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/compare"
                      className={cn(
                        "flex items-center space-x-2 text-lg font-medium transition-colors hover:text-orange-600",
                        isActive("/compare") && "text-orange-600",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Compare Plans</span>
                    </Link>
                  </nav>

                  {/* Contact Info */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Us</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">8770877270</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">support@amarimf.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">G41, Gandhi Nagar, Padav, Gwalior</span>
                      </div>
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <div className="flex flex-col space-y-2 pt-6 border-t">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-start">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
