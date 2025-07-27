import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Custom Shield Icon (as provided in the original file)
function Shield({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

interface AgentCardProps {
  name: string
  title: string
  rating: number
  reviews: number
  distance: string
  address: string
  phone: string
  specialties: string[]
  languages: string[]
  image?: string
}

function AgentCard({
  name,
  title,
  rating,
  reviews,
  distance,
  address,
  phone,
  specialties,
  languages,
  image,
}: AgentCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={image || "/placeholder.svg?height=100&width=100&query=insurance+agent+profile"}
              alt={name}
              className="rounded-full w-24 h-24 object-cover border"
            />
          </div>
          <div className="flex-grow space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
                <span className="ml-1 text-sm text-muted-foreground">({reviews} reviews)</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {distance}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <span>{phone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Languages: </span>
                {languages.join(", ")}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:items-end md:justify-start md:w-48 mt-4 md:mt-0">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Schedule Appointment</Button>
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FindAgentPage() {
  // Mock data for agents
  const agents: AgentCardProps[] = [
    {
      name: "Sarah Johnson",
      title: "Senior Insurance Agent",
      rating: 4.9,
      reviews: 127,
      distance: "1.2 miles",
      address: "123 Main St, Suite 101, Anytown, USA 12345",
      phone: "(555) 123-4567",
      specialties: ["Auto", "Home", "Life"],
      languages: ["English", "Spanish"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Michael Chen",
      title: "Insurance Specialist",
      rating: 4.7,
      reviews: 98,
      distance: "2.5 miles",
      address: "456 Park Ave, Anytown, USA 12345",
      phone: "(555) 234-5678",
      specialties: ["Auto", "Home", "Business"],
      languages: ["English", "Mandarin"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jessica Martinez",
      title: "Insurance Advisor",
      rating: 4.8,
      reviews: 112,
      distance: "3.1 miles",
      address: "789 Broadway, Anytown, USA 12345",
      phone: "(555) 345-6789",
      specialties: ["Auto", "Home", "Health"],
      languages: ["English", "Spanish"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "David Wilson",
      title: "Senior Insurance Consultant",
      rating: 4.6,
      reviews: 87,
      distance: "4.3 miles",
      address: "321 Lexington Ave, Anytown, USA 12345",
      phone: "(555) 456-7890",
      specialties: ["Auto", "Home", "Life", "Business"],
      languages: ["English"],
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-teal-600">
            <Shield className="h-6 w-6" />
            <span>SecureLife</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Auto
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Health
            </Link>
            <Link href="/find-agent" className="text-sm font-medium text-primary">
              Find an Agent
            </Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="#">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="#">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8 sm:py-12">
          <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mb-3">
                Find an Insurance Agent Near You
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with a local agent who can help you find the right insurance coverage for your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 xl:col-span-3">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl">Search Filters</CardTitle>
                    <CardDescription>Refine your search to find the perfect agent.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex space-x-2">
                        <Input id="location" placeholder="ZIP code or city" />
                        <Button size="icon" variant="ghost" aria-label="Search location">
                          <Search className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Insurance Type</Label>
                      <div className="space-y-2.5">
                        {(["Auto", "Home", "Life", "Health", "Business"] as const).map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={type.toLowerCase()}
                              name="insuranceType"
                              value={type}
                              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              defaultChecked={type === "Auto" || type === "Home"}
                            />
                            <Label htmlFor={type.toLowerCase()} className="font-normal">
                              {type} Insurance
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Distance</Label>
                      <RadioGroup defaultValue="10" className="space-y-1">
                        {[
                          { value: "5", label: "Within 5 miles" },
                          { value: "10", label: "Within 10 miles" },
                          { value: "25", label: "Within 25 miles" },
                          { value: "50", label: "Within 50 miles" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`dist-${option.value}`} />
                            <Label htmlFor={`dist-${option.value}`} className="font-normal">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="any">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Any Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Language</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="mandarin">Mandarin</SelectItem>
                          <SelectItem value="vietnamese">Vietnamese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <RadioGroup defaultValue="any" className="space-y-1">
                        {[
                          { value: "any", label: "Any Rating" },
                          { value: "4+", label: "4+", stars: true },
                          { value: "4.5+", label: "4.5+", stars: true },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`rating-${option.value}`} />
                            <Label htmlFor={`rating-${option.value}`} className="flex items-center font-normal">
                              {option.label}
                              {option.stars && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 ml-1.5" />}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Apply Filters</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8 xl:col-span-9">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{agents.length} Agents Found</h2>
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="distance">Distance: Closest</SelectItem>
                      <SelectItem value="rating">Rating: Highest</SelectItem>
                      <SelectItem value="experience">Experience: Most</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  {agents.map((agent) => (
                    <AgentCard key={agent.name} {...agent} />
                  ))}

                  <div className="flex justify-center pt-4">
                    <Button variant="outline">Load More Agents</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-teal-50 p-8 rounded-lg shadow">
              <h3 className="text-2xl font-semibold text-teal-700 mb-3">Can't find the right agent?</h3>
              <p className="text-gray-600 mb-6 max-w-xl">
                Let us match you with an agent who specializes in your specific insurance needs. Fill out a quick form,
                and we'll connect you with the perfect professional.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-teal-600 hover:bg-teal-700">Match Me with an Agent</Button>
                <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-100">
                  Call Our Helpline
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 py-8">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-5 w-5 text-teal-600" />
            <span className="font-semibold text-gray-700">SecureLife</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary hover:underline">
              Contact Us
            </Link>
          </div>
          <p className="text-xs text-muted-foreground md:order-first">
            &copy; {new Date().getFullYear()} SecureLife. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// This would be your main page component, e.g. app/page.tsx or app/find-agent/page.tsx
// For this example, I'm naming it FindAgentPage and it will be rendered by app/page.tsx
// export default FindAgentPage;
