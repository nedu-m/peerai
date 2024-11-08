/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useToast } from "@/hooks/use-toast"

import { useRef, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Brain, Users, Shield, CheckCircle, X } from 'lucide-react'

const colors = {
  primary: "bg-orange-500",
  secondary: "bg-yellow-400",
  text: "text-gray-800",
  lightBg: "bg-orange-50",
};

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  useEffect(() => {
    const smoothScroll = (e: MouseEvent) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const targetId = target.getAttribute('href')?.substring(1)
      const targetElement = document.getElementById(targetId || '')
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', (e) => smoothScroll(e as MouseEvent));
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', (e) => smoothScroll(e as MouseEvent));
      })
    }
  }, [])

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        toast.toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll be in touch soon!",
        })
        setEmail('')
      } else {
        throw new Error('Failed to join waitlist')
      }
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "There was a problem joining the waitlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen ${colors.lightBg} ${colors.text}`}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-center space-x-6">
            <li><a href="#hero" className="text-sm font-medium hover:text-orange-500 transition-colors">Home</a></li>
            <li><a href="#about" className="text-sm font-medium hover:text-orange-500 transition-colors">About</a></li>
            <li><a href="#features" className="text-sm font-medium hover:text-orange-500 transition-colors">Features</a></li>
            <li><a href="#testimonials" className="text-sm font-medium hover:text-orange-500 transition-colors">Testimonials</a></li>
            <li><a href="#comparison" className="text-sm font-medium hover:text-orange-500 transition-colors">Comparison</a></li>
            <li><a href="#faq" className="text-sm font-medium hover:text-orange-500 transition-colors">FAQ</a></li>
          </ul>
        </nav>
      </header>

      <main className="pt-12">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className={`py-32 ${colors.primary} text-white text-center`}>
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">A Safe, Supportive Community for Mental Health, Enhanced by AI Moderation</h1>
            <p className="text-xl mb-10 text-white/90">Connect with peers who understand, with AI keeping conversations safe and supportive.</p>
            <Button size="lg" className={`text-lg px-8 py-6 bg-white text-orange-500 hover:bg-orange-100 transition-colors`}>Join the Waitlist</Button>
          </div>
        </section>

        {/* About the Platform */}
        <section id="about" ref={aboutRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">How It Works</h2>
            <p className="text-lg mb-8 text-center max-w-2xl mx-auto">
              Our platform combines the power of peer support with advanced AI moderation to create a safe,
              supportive environment for mental health conversations. Connect with others who share similar
              experiences while our AI ensures all interactions remain respectful and constructive.
            </p>
          </div>
        </section>

        {/* Features & Benefits */}
        <section id="features" ref={featuresRef} className={`py-20 ${colors.lightBg}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-orange-500">Main Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "AI-Moderated Safety", description: "Real-time AI moderation to ensure safe, respectful conversations." },
                { icon: Users, title: "Personalized Peer Matching", description: "Connect with people who understand your experience." },
                { icon: Brain, title: "Crisis Support", description: "Quick escalation and support in times of need." },
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-orange-500">
                  <feature.icon className="mx-auto mb-4 h-12 w-12 text-orange-500" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Representation */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="rounded-lg p-8 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-orange-100 to-yellow-100 shadow-lg">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-orange-500">Visualize Your Support Network</h2>
                <p className="text-lg text-gray-700">Our platform creates a safe space for meaningful connections, all enhanced by AI to ensure a positive experience.</p>
              </div>
              <div className="md:w-1/2">
                <div className={`${colors.secondary} rounded-lg shadow-lg p-4 aspect-video flex items-center justify-center`}>
                  <p className="text-gray-800 text-lg font-semibold">Interactive visualization of support network</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className={`py-20 ${colors.lightBg}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Why Peer Support with AI?</h2>
            <ul className="max-w-2xl mx-auto space-y-4">
              <li className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <CheckCircle className="mr-2 h-6 w-6 text-orange-500 flex-shrink-0" />
                <span><strong className="text-orange-500">Safety & Trust:</strong> Ensures respectful and productive conversations.</span>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <CheckCircle className="mr-2 h-6 w-6 text-orange-500 flex-shrink-0" />
                <span><strong className="text-orange-500">Privacy:</strong> AI is there to support, not replace, human interactions.</span>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <CheckCircle className="mr-2 h-6 w-6 text-orange-500 flex-shrink-0" />
                <span><strong className="text-orange-500">Accessibility:</strong> Support available when and where you need it.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" ref={testimonialsRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-orange-500">What People Are Saying</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <blockquote className="bg-orange-50 p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
                <p className="mb-4 text-gray-700">&quot;I want a safe place to talk about mental health without fear of judgment.&quot;</p>
                <footer className="text-sm text-orange-600">- Potential User</footer>
              </blockquote>
              <blockquote className="bg-yellow-50 p-6 rounded-lg shadow-lg border-l-4 border-yellow-400">
                <p className="mb-4 text-gray-700">&quot;Knowing there&apos;s an AI ensuring safe conversations gives me peace of mind.&quot;</p>
                <footer className="text-sm text-yellow-600">- Beta Tester</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" ref={comparisonRef} className={`py-20 ${colors.lightBg}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-orange-500">How We Compare</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="p-2 text-left text-orange-600">Feature</th>
                    <th className="p-2 text-center text-orange-600">Our Platform</th>
                    <th className="p-2 text-center text-orange-600">7 Cups</th>
                    <th className="p-2 text-center text-orange-600">Calm</th>
                    <th className="p-2 text-center text-orange-600">Woebot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b">AI Moderation</td>
                    <td className="p-2 border-b text-center"><CheckCircle className="inline h-5 w-5 text-orange-500" /></td>
                    <td className="p-2 border-b text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                    <td className="p-2 border-b text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                    <td className="p-2 border-b text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b">Peer Support</td>
                    <td className="p-2 border-b text-center"><CheckCircle className="inline h-5 w-5 text-orange-500" /></td>
                    <td className="p-2 border-b text-center"><CheckCircle className="inline h-5 w-5 text-orange-500" /></td>
                    <td className="p-2 border-b text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                    <td className="p-2 border-b text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                  <tr>
                    <td className="p-2">Personalized Matching</td>
                    <td className="p-2 text-center"><CheckCircle className="inline h-5 w-5 text-orange-500" /></td>
                    <td className="p-2 text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                    <td className="p-2 text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                    <td className="p-2 text-center"><X className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" ref={faqRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-orange-500">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-orange-500 hover:text-orange-600">How does AI moderation work?</AccordionTrigger>
                <AccordionContent>
                  Our AI analyzes conversations to ensure they remain safe and respectful, without intruding on privacy.
                  It uses advanced natural language processing to detect potentially harmful content and intervene when necessary.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-orange-500 hover:text-orange-600">Who will I be matched with?</AccordionTrigger>
                <AccordionContent>
                  You&apos;ll be matched with peers based on shared experiences and support needs. Our algorithm takes into
                  account factors like your mental health concerns, goals, and preferences to find the most suitable matches.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-orange-500 hover:text-orange-600">Is my data safe?</AccordionTrigger>
                <AccordionContent>
                  Yes. We prioritize privacy and use AI solely for moderation and safety. All personal data is encrypted,
                  and we adhere to strict data protection regulations to ensure your information remains confidential.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA for Waitlist */}
        <section id="cta" ref={ctaRef} className={`py-20 ${colors.secondary} text-gray-800`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Be Part of the Movement</h2>
            <p className="text-xl mb-8 text-gray-700">Sign up now for early access and help build a safe, supportive mental health community.</p>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-white/80 text-gray-800 placeholder-gray-500 border-orange-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className={`${colors.primary} text-white hover:bg-orange-600 transition-colors`} disabled={isSubmitting}>
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </div>
              <p className="mt-2 text-sm text-gray-700">Be among the first 100 users and get exclusive features!</p>
            </form>
          </div>
        </section>

        {/* Feedback Form */}
        <section className={`py-20 ${colors.lightBg}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">We Value Your Feedback</h2>
            <form className="max-w-2xl mx-auto space-y-4">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium mb-1 text-orange-600">What do you want most in a mental health community?</label>
                <Textarea id="feedback" placeholder="Share your thoughts..." className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div>
                <label htmlFor="concern" className="block text-sm font-medium mb-1 text-orange-600">What&apos;s your biggest concern with peer support platforms?</label>
                <Textarea id="concern" placeholder="Tell us your concerns..." className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <Button type="submit" className={`${colors.primary} text-white hover:bg-orange-600 transition-colors`}>Submit Feedback</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-8">
        <div className="container mx-auto px-4">
          <p className="mb-4">&copy; 2024 PeerAI Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-orange-300 hover:text-orange-200 transition-colors">Twitter</a>
            <a href="#" className="text-orange-300 hover:text-orange-200 transition-colors">LinkedIn</a>
            <a href="#" className="text-orange-300 hover:text-orange-200 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}