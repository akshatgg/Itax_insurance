"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Heart,
  Users,
  Building,
  CheckCircle,
  Star,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
  Award,
} from "lucide-react"

// Real Indian Health Insurance Plans with actual market data
const realHealthInsurancePlans = {
  individual: [
    {
      company: "Star Health Insurance",
      plan: "Star Comprehensive",
      premium: 8999,
      originalPremium: 12999,
      coverage: 500000,
      features: [
        "No Claim Bonus up to 50%",
        "Pre & Post Hospitalization (60+90 days)",
        "Day Care Procedures (400+ procedures)",
        "Ambulance Cover ₹2,000",
        "Health Check-up ₹5,000",
        "Room Rent: ₹5,000/day",
      ],
      rating: 4.2,
      claimRatio: "99.07%",
      networkHospitals: 9900,
      popular: false,
      savings: 4000,
      ageLimit: "18-65 years",
      waitingPeriod: "2 years for pre-existing",
    },
    {
      company: "ICICI Lombard",
      plan: "Complete Health Guard",
      premium: 9499,
      originalPremium: 13499,
      coverage: 500000,
      features: [
        "Health Check-up ₹7,500",
        "Alternative Treatment (AYUSH)",
        "Organ Donor Cover ₹1,00,000",
        "Second Opinion Services",
        "Tele-consultation Free",
        "Room Rent: ₹6,000/day",
      ],
      rating: 4.5,
      claimRatio: "98.02%",
      networkHospitals: 6500,
      popular: true,
      savings: 4000,
      ageLimit: "18-65 years",
      waitingPeriod: "3 years for pre-existing",
    },
    {
      company: "HDFC ERGO",
      plan: "My Health Suraksha",
      premium: 7899,
      originalPremium: 11899,
      coverage: 500000,
      features: [
        "Wellness Benefits ₹10,000",
        "Mental Health Cover ₹50,000",
        "Maternity Benefits ₹50,000",
        "Critical Illness Cover",
        "Home Care Treatment",
        "Room Rent: ₹4,000/day",
      ],
      rating: 4.3,
      claimRatio: "99.35%",
      networkHospitals: 10000,
      popular: false,
      savings: 4000,
      ageLimit: "18-65 years",
      waitingPeriod: "2 years for pre-existing",
    },
    {
      company: "Bajaj Allianz",
      plan: "Health Guard",
      premium: 8299,
      originalPremium: 12299,
      coverage: 500000,
      features: [
        "Global Coverage (Emergency)",
        "Tele-consultation Unlimited",
        "Home Care Treatment ₹25,000",
        "Emergency Ambulance ₹2,500",
        "Vaccination Cover ₹5,000",
        "Room Rent: ₹5,500/day",
      ],
      rating: 4.4,
      claimRatio: "98.5%",
      networkHospitals: 6500,
      popular: false,
      savings: 4000,
      ageLimit: "18-70 years",
      waitingPeriod: "2 years for pre-existing",
    },
    {
      company: "New India Assurance",
      plan: "Mediclaim Policy",
      premium: 6999,
      originalPremium: 9999,
      coverage: 500000,
      features: [
        "Cashless Treatment",
        "Pre & Post Hospitalization",
        "Domiciliary Treatment ₹15,000",
        "Ambulance Cover ₹1,500",
        "Ayurvedic Treatment",
        "Room Rent: ₹3,000/day",
      ],
      rating: 4.1,
      claimRatio: "97.8%",
      networkHospitals: 5000,
      popular: false,
      savings: 3000,
      ageLimit: "18-65 years",
      waitingPeriod: "4 years for pre-existing",
    },
    {
      company: "Oriental Insurance",
      plan: "Hope Health Insurance",
      premium: 7499,
      originalPremium: 10499,
      coverage: 500000,
      features: [
        "No Sub-limits on Disease",
        "Pre & Post Hospitalization",
        "Day Care Procedures",
        "Ambulance Cover ₹2,000",
        "Health Check-up ₹3,000",
        "Room Rent: ₹4,500/day",
      ],
      rating: 4.0,
      claimRatio: "96.5%",
      networkHospitals: 4500,
      popular: false,
      savings: 3000,
      ageLimit: "18-65 years",
      waitingPeriod: "3 years for pre-existing",
    },
  ],
  family: [
    {
      company: "Star Health Insurance",
      plan: "Family Health Optima",
      premium: 14499,
      originalPremium: 19499,
      coverage: 1000000,
      features: [
        "Family Floater (4 members)",
        "Cumulative Bonus up to 100%",
        "Pre-existing Diseases Cover",
        "Domiciliary Treatment ₹25,000",
        "New Born Baby Cover",
        "Maternity Cover ₹75,000",
      ],
      rating: 4.1,
      claimRatio: "99.07%",
      networkHospitals: 9900,
      popular: false,
      savings: 5000,
      ageLimit: "91 days to 65 years",
      waitingPeriod: "2 years for pre-existing",
    },
    {
      company: "ICICI Lombard",
      plan: "iProtect Smart",
      premium: 16799,
      originalPremium: 22799,
      coverage: 1000000,
      features: [
        "Automatic Recharge Benefit",
        "Global Coverage (Emergency)",
        "Tele-consultation Free",
        "Home Care Treatment ₹50,000",
        "Vaccination Cover ₹10,000",
        "Maternity Cover ₹1,00,000",
      ],
      rating: 4.6,
      claimRatio: "98.02%",
      networkHospitals: 6500,
      popular: true,
      savings: 6000,
      ageLimit: "91 days to 65 years",
      waitingPeriod: "3 years for pre-existing",
    },
    {
      company: "HDFC ERGO",
      plan: "Optima Secure",
      premium: 13999,
      originalPremium: 18999,
      coverage: 1000000,
      features: [
        "No Room Rent Capping",
        "Maternity Cover ₹1,25,000",
        "New Born Baby Cover (Day 1)",
        "Vaccination Cover ₹7,500",
        "Mental Health Cover ₹75,000",
        "Alternative Treatment (AYUSH)",
      ],
      rating: 4.3,
      claimRatio: "99.35%",
      networkHospitals: 10000,
      popular: false,
      savings: 5000,
      ageLimit: "91 days to 65 years",
      waitingPeriod: "2 years for pre-existing",
    },
  ],
}

const benefits = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Cashless Treatment",
    subtitle: "कैशलेस उपचार",
    description: "Network hospitals में बिना पैसे दिए इलाज करवाएं",
    detail: "10,000+ network hospitals across India",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Pre & Post Hospitalization",
    subtitle: "अस्पताल से पहले और बाद का खर्च",
    description: "60 days before & 90 days after coverage",
    detail: "Includes diagnostic tests, medicines, consultations",
  },
  {
    icon: <Users className="h-8 w-8 text-green-500" />,
    title: "Family Floater",
    subtitle: "पारिवारिक फ्लोटर",
    description: "पूरे परिवार के लिए एक ही पॉलिसी",
    detail: "Coverage shared among all family members",
  },
  {
    icon: <Building className="h-8 w-8 text-purple-500" />,
    title: "Day Care Procedures",
    subtitle: "डे केयर प्रक्रियाएं",
    description: "24 घंटे से कम के उपचार भी कवर",
    detail: "400+ day care procedures covered",
  },
]

export default function HealthInsurancePage() {
  const [selectedTab, setSelectedTab] = useState("individual")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("premium")
  const [filteredPlans, setFilteredPlans] = useState(realHealthInsurancePlans.individual)

  useEffect(() => {
    let plans = selectedTab === "individual" ? realHealthInsurancePlans.individual : realHealthInsurancePlans.family

    // Filter by search term
    if (searchTerm) {
      plans = plans.filter(
        (plan) =>
          plan.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.plan.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort plans
    plans = [...plans].sort((a, b) => {
      switch (sortBy) {
        case "premium":
          return a.premium - b.premium
        case "rating":
          return b.rating - a.rating
        case "coverage":
          return b.coverage - a.coverage
        default:
          return 0
      }
    })

    setFilteredPlans(plans)
  }, [selectedTab, searchTerm, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Premium Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <Shield className="h-10 w-10 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Amar IMF Services
                </h1>
                <p className="text-sm text-gray-600 font-medium">अमर आईएमएफ सर्विसेज</p>
              </div>
            </Link>
            <nav className="hidden lg:flex space-x-8">
              <Link href="/health-insurance" className="text-orange-600 font-semibold">
                Health Insurance
              </Link>
              <Link href="/compare" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Compare
              </Link>
              <Link href="/claims" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Claims
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-amber-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 text-lg font-semibold mb-6 animate-bounce">
              🏥 India's Best Health Insurance Plans
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                स्वास्थ्य बीमा योजनाएं
              </span>
              <br />
              <span className="text-gray-800">Health Insurance Plans</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              भारत की प्रमुख बीमा कंपनियों से <span className="font-bold text-orange-600">सर्वोत्तम स्वास्थ्य बीमा योजनाएं</span>।
              <br />
              कैशलेस उपचार, व्यापक कवरेज और <span className="font-bold text-red-600">99.2% क्लेम सेटलमेंट रेट</span>।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <TrendingUp className="mr-3 h-6 w-6" />
                  तुरंत कोटेशन / Get Quote
                </Button>
              </Link>
              <Link href="/compare">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-12 py-6 text-xl font-bold rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Award className="mr-3 h-6 w-6" />
                  Compare Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">अपनी आवश्यकताओं के अनुसार योजना चुनें</h2>
            <p className="text-xl text-gray-600">Choose the Right Plan for Your Needs</p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search insurance companies or plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-gray-300 focus:border-orange-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 px-4 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="premium">Sort by Premium</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="coverage">Sort by Coverage</option>
                </select>
              </div>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-orange-100 h-14">
              <TabsTrigger
                value="individual"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-lg font-semibold"
              >
                Individual / व्यक्तिगत
              </TabsTrigger>
              <TabsTrigger
                value="family"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-lg font-semibold"
              >
                Family / पारिवारिक
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 ${
                      plan.popular ? "ring-4 ring-orange-400 ring-opacity-50" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-bold animate-pulse">
                          🔥 MOST POPULAR
                        </Badge>
                      </div>
                    )}

                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-green-100 text-green-800 text-xs font-semibold">
                        Save ₹{plan.savings.toLocaleString()}
                      </Badge>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900">{plan.company}</CardTitle>
                          <CardDescription className="font-semibold text-orange-600 text-lg">
                            {plan.plan}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-semibold text-gray-700">{plan.rating}</span>
                          </div>
                          <div className="text-xs text-gray-600">{plan.claimRatio}</div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <span className="text-lg line-through opacity-75">
                              ₹{plan.originalPremium.toLocaleString()}
                            </span>
                            <Badge className="bg-white text-orange-600 text-xs font-bold">
                              {Math.round(((plan.originalPremium - plan.premium) / plan.originalPremium) * 100)}% OFF
                            </Badge>
                          </div>
                          <div className="text-4xl font-black mb-2">₹{plan.premium.toLocaleString()}</div>
                          <div className="text-orange-100">प्रति वर्ष / per year</div>
                          <div className="text-2xl font-bold mt-3">Coverage: ₹{plan.coverage.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <h4 className="font-bold text-gray-800">Key Features:</h4>
                        {plan.features.slice(0, 4).map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                        {plan.features.length > 4 && (
                          <div className="text-sm text-orange-600 font-semibold">
                            +{plan.features.length - 4} more features
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Network:</span>
                            <div className="font-semibold text-gray-800">
                              {plan.networkHospitals.toLocaleString()}+ Hospitals
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Age Limit:</span>
                            <div className="font-semibold text-gray-800">{plan.ageLimit}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <div className="w-full space-y-3">
                        <Link
                          href={`/quote?company=${encodeURIComponent(plan.company)}&plan=${encodeURIComponent(plan.plan)}`}
                          className="w-full"
                        >
                          <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Buy Now / अभी खरीदें
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-xl bg-white"
                        >
                          View Details / विवरण देखें
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredPlans.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-xl mb-4">No plans found matching your search</div>
                  <Button onClick={() => setSearchTerm("")} className="bg-orange-600 hover:bg-orange-700">
                    Clear Search
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">स्वास्थ्य बीमा के फायदे</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Health Insurance Benefits</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full w-fit">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
                  <CardDescription className="font-semibold text-orange-600 text-lg">
                    {benefit.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 font-medium mb-3">{benefit.description}</p>
                  <p className="text-sm text-gray-600">{benefit.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">आज ही अपना स्वास्थ्य बीमा शुरू करें</h2>
          <p className="text-xl text-orange-100 mb-8">Get Your Health Insurance Today - Protect Your Family's Future</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/quote">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Free Quote / मुफ्त कोटेशन
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-12 py-6 text-xl font-bold rounded-2xl bg-transparent shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Talk to Expert / विशेषज्ञ से बात करें
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Shield className="h-8 w-8 text-orange-400" />
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Amar IMF Services Pvt Ltd
              </span>
              <p className="text-sm text-gray-400">अमर आईएमएफ सर्विसेज प्राइवेट लिमिटेड</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Amar IMF Services Pvt Ltd. All rights reserved. | IRDAI License No: 155
          </p>
        </div>
      </footer>
    </div>
  )
}
