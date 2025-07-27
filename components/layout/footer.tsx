"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Car,
  Heart,
  Home,
  Plane,
  Building2,
  Clock,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const insuranceProducts = [
    { name: "Motor Insurance", href: "/products/motor", icon: Car },
    { name: "Health Insurance", href: "/products/health", icon: Heart },
    { name: "Home Insurance", href: "/products/home", icon: Home },
    { name: "Travel Insurance", href: "/products/travel", icon: Plane },
    { name: "Business Insurance", href: "/products/business", icon: Building2 },
  ]

  const quickLinks = [
    { name: "Get Quote", href: "/quote" },
    { name: "Compare Plans", href: "/compare" },
    { name: "File Claim", href: "/claims/new" },
    { name: "Track Claim", href: "/claims/track" },
    { name: "Find Agent", href: "/find-agent" },
    { name: "Customer Support", href: "/support" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Grievance", href: "/grievance" },
    { name: "IRDAI Guidelines", href: "/irdai" },
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "YouTube", href: "#", icon: Youtube },
  ]

  return (
    <footer className="bg-vanilla-900 text-vanilla-100">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-vanilla-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Amar Insurance</h3>
                <p className="text-sm text-vanilla-400">Trusted Protection</p>
              </div>
            </div>

            <p className="text-vanilla-300 leading-relaxed">
              India's leading general insurance company providing comprehensive coverage for Motor, Health, Home,
              Travel, and Business insurance needs.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-vanilla-400" />
                <a href="tel:8770877270" className="text-vanilla-300 hover:text-white transition-colors">
                  8770877270
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-vanilla-400" />
                <a
                  href="mailto:support@amarinsurance.com"
                  className="text-vanilla-300 hover:text-white transition-colors"
                >
                  support@amarinsurance.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-vanilla-400" />
                <span className="text-vanilla-300">G41, Gandhi Nagar, Padav, Gwalior</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-vanilla-400" />
                <span className="text-vanilla-300">24/7 Customer Support</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-vanilla-800 rounded-full flex items-center justify-center hover:bg-vanilla-700 transition-colors"
                >
                  <social.icon className="h-4 w-4 text-vanilla-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Insurance Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Insurance Products</h3>
            <ul className="space-y-3">
              {insuranceProducts.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className="flex items-center space-x-2 text-vanilla-300 hover:text-white transition-colors"
                  >
                    <product.icon className="h-4 w-4" />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Badge className="bg-vanilla-600 text-white">IRDAI Approved</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-vanilla-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-vanilla-300 text-sm">Subscribe to get the latest insurance news and offers</p>

            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-vanilla-800 border-vanilla-700 text-white placeholder:text-vanilla-400"
              />
              <Button className="w-full bg-vanilla-600 hover:bg-vanilla-700">Subscribe</Button>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-vanilla-400 hover:text-vanilla-300 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-vanilla-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-vanilla-400">© {currentYear} Amar Insurance Pvt Ltd. All rights reserved.</p>
              <div className="flex items-center space-x-4 text-xs text-vanilla-500">
                <span>IRDAI Registration: 155</span>
                <span>|</span>
                <span>ISO 27001:2013 Certified</span>
                <span>|</span>
                <span>CIN: U66010MH2024PTC123456</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-vanilla-700 text-vanilla-400">
                🔒 SSL Secured
              </Badge>
              <Badge variant="outline" className="border-vanilla-700 text-vanilla-400">
                ⭐ 4.5/5 Rating
              </Badge>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-vanilla-800">
            <p className="text-xs text-vanilla-500 text-center">
              <strong>Disclaimer:</strong> Insurance is the subject matter of solicitation. Please read the policy terms
              and conditions carefully before concluding a sale. For more details on risk factors, terms and conditions,
              please read the sales brochure carefully before concluding a sale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
