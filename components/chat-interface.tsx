"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, Bot, User, Loader2, Phone, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "info"
  quickReplies?: string[]
}

interface ChatInterfaceProps {
  className?: string
  defaultOpen?: boolean
}

export function ChatInterface({ className, defaultOpen = false }: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Amar IMF Services assistant. I can help you with insurance queries, policy information, claims, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "quick-reply",
      quickReplies: ["Get a Quote", "File a Claim", "Policy Status", "Contact Agent"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API call
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || getBotResponse(content),
        sender: "bot",
        timestamp: new Date(),
        type: data.type || "text",
        quickReplies: data.quickReplies,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("quote") || message.includes("price")) {
      return "I can help you get a quote! Please visit our quote page or tell me what type of insurance you're interested in (Health, Motor, Home, or Travel)."
    }

    if (message.includes("claim")) {
      return "For claims assistance, you can file a claim online or call our claims hotline at 8770877270. Do you need help with filing a new claim or checking an existing claim status?"
    }

    if (message.includes("policy") || message.includes("status")) {
      return "To check your policy status, please provide your policy number or visit the policy search page. You can also log into your dashboard to view all your policies."
    }

    if (message.includes("agent") || message.includes("contact")) {
      return "You can find a certified agent near you using our agent locator, or contact our support team at 8770877270 or support@amarimf.com."
    }

    if (message.includes("health")) {
      return "Our health insurance plans offer comprehensive coverage including hospitalization, pre and post hospitalization expenses, day care procedures, and more. Would you like to get a quote?"
    }

    if (message.includes("motor") || message.includes("car") || message.includes("vehicle")) {
      return "Our motor insurance provides complete protection for your vehicle including own damage, third party liability, and add-on covers. Do you need a quote for your vehicle?"
    }

    if (message.includes("home")) {
      return "Home insurance protects your property and belongings against fire, theft, natural disasters, and more. Would you like to know more about our home insurance plans?"
    }

    if (message.includes("travel")) {
      return "Travel insurance covers medical emergencies, trip cancellations, lost baggage, and more during your travels. Planning a trip soon?"
    }

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! How can I help you with your insurance needs today?"
    }

    return "I understand you're looking for information. For specific queries, please call us at 8770877270 or email support@amarimf.com. Our team is available 24/7 to assist you."
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-orange-600 hover:bg-orange-700"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <Card className={cn("w-80 shadow-xl", isMinimized ? "h-16" : "h-96")}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
              <Bot className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-sm">Amar IMF Assistant</CardTitle>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
              ×
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "flex items-start space-x-2 max-w-[80%]",
                        message.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row",
                      )}
                    >
                      <Avatar className="w-6 h-6">
                        {message.sender === "user" ? (
                          <AvatarFallback className="bg-blue-100">
                            <User className="h-3 w-3 text-blue-600" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-orange-100">
                            <Bot className="h-3 w-3 text-orange-600" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm",
                            message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900 border",
                          )}
                        >
                          {message.content}
                        </div>
                        {message.quickReplies && (
                          <div className="flex flex-wrap gap-1">
                            {message.quickReplies.map((reply, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs bg-transparent"
                                onClick={() => handleQuickReply(reply)}
                              >
                                {reply}
                              </Button>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-orange-100">
                          <Bot className="h-3 w-3 text-orange-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 border">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Powered by Amar IMF Services</span>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>8770877270</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
