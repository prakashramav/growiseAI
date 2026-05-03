"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, BarChart3, Bot, Shield, Zap, CheckCircle2, 
  LineChart, Wallet, PieChart, Star, Lock, Target
} from "lucide-react";

export default function LandingContent() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30 text-foreground overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              GrowWise AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative container mx-auto px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8"
          >
            <Zap className="mr-2 h-4 w-4" />
            GrowWise AI 2.0 is here
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 text-balance max-w-4xl mx-auto leading-tight"
          >
            Master your wealth with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              intelligent insights.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            The modern financial OS powered by advanced AI. Track expenses, forecast budgets, and receive personalized advice to accelerate your financial freedom.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Start your free trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-background/50 backdrop-blur-sm border-muted-foreground/20 hover:bg-muted/50 transition-colors">
                Explore Features
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 relative w-full max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 top-1/2"></div>
            <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
              {/* Abstract Dashboard representation */}
              <div className="absolute inset-0 p-8 grid grid-cols-3 grid-rows-3 gap-6 opacity-80">
                <div className="col-span-2 row-span-2 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl border border-white/5 p-6 flex flex-col justify-end">
                   <div className="h-32 w-full bg-gradient-to-t from-emerald-500/20 to-transparent rounded-lg"></div>
                </div>
                <div className="row-span-1 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl border border-white/5 p-6"></div>
                <div className="row-span-1 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl border border-white/5 p-6"></div>
                <div className="col-span-3 row-span-1 bg-gradient-to-r from-white/5 to-transparent rounded-xl border border-white/5 p-6 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20"></div>
                  <div className="h-4 w-64 bg-white/10 rounded"></div>
                </div>
              </div>
              <div className="z-20 text-center">
                <Bot className="h-16 w-16 text-emerald-500 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Dashboard Preview</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-white/5 bg-muted/10">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-8">TRUSTED BY FORWARD-THINKING INDIVIDUALS</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-xl font-bold"><Zap className="h-6 w-6"/> BoltFinance</div>
              <div className="flex items-center gap-2 text-xl font-bold"><PieChart className="h-6 w-6"/> SliceWealth</div>
              <div className="flex items-center gap-2 text-xl font-bold"><Shield className="h-6 w-6"/> SecureFund</div>
              <div className="flex items-center gap-2 text-xl font-bold"><LineChart className="h-6 w-6"/> TrendTrack</div>
            </div>
          </div>
        </section>

        {/* Features Bento Box */}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">A complete financial command center.</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to track, manage, and grow your wealth, beautifully designed and powered by advanced AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Feature 1: Large */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-gradient-to-br from-card to-card/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                <Bot className="h-10 w-10 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-bold mb-3">AI Financial Advisor</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Chat with your personal AI advisor. Get tailored insights on spending habits, investment strategies, and personalized budgets based on your real data.
                </p>
                <div className="h-32 rounded-xl bg-black/20 border border-white/5 flex items-center p-4 gap-4 backdrop-blur-sm">
                   <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><Bot className="h-4 w-4 text-emerald-500"/></div>
                   <div className="bg-emerald-500/10 rounded-2xl rounded-tl-none p-3 text-sm text-emerald-100 border border-emerald-500/20">
                     I noticed you spent 15% less on dining this month. Great job! Consider moving those savings to your investment account.
                   </div>
                </div>
              </motion.div>

              {/* Feature 2: Small */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-card to-card/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                <Zap className="h-10 w-10 text-blue-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Auto Categorization</h3>
                <p className="text-muted-foreground">
                  Say goodbye to manual entry. Our AI instantly categorizes every transaction with 99% accuracy.
                </p>
              </motion.div>

              {/* Feature 3: Small */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-card to-card/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                <Target className="h-10 w-10 text-purple-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Goal Tracking</h3>
                <p className="text-muted-foreground">
                  Set dynamic savings goals. Visual progress bars keep you motivated and on track to hit your targets.
                </p>
              </motion.div>

              {/* Feature 4: Large */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-gradient-to-br from-card to-card/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
              >
                 <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all"></div>
                <LineChart className="h-10 w-10 text-amber-500 mb-6" />
                <h3 className="text-2xl font-bold mb-3">Beautiful Analytics</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Understand your money at a glance. Interactive charts and deep-dive reports give you complete clarity on where your money goes.
                </p>
                <div className="flex gap-2 items-end h-24 mt-auto">
                   {[40, 70, 45, 90, 65, 110, 85].map((height, i) => (
                     <div key={i} className="w-full bg-amber-500/20 rounded-t-md hover:bg-amber-500/40 transition-colors" style={{ height: `${height}%` }}></div>
                   ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-muted/30 border-y border-white/5 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">How GrowWise works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Three simple steps to take control of your financial future.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -z-10"></div>
              
              {[
                { step: "01", title: "Add your data", desc: "Securely input your transactions or upload your financial history in seconds.", icon: Wallet },
                { step: "02", title: "AI Analyzes", desc: "Our engine categorizes spending, identifies trends, and builds your custom dashboard.", icon: Zap },
                { step: "03", title: "Grow Wealth", desc: "Follow AI-driven advice, stick to smart budgets, and watch your net worth soar.", icon: LineChart }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center relative">
                  <div className="w-24 h-24 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center mb-6 shadow-xl shadow-primary/5">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-primary font-mono text-sm font-bold mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 relative overflow-hidden">
           <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Loved by thousands</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Sarah J.", role: "Freelancer", text: "GrowWise completely changed how I manage my variable income. The AI insights caught subscriptions I forgot about!" },
                { name: "David M.", role: "Software Engineer", text: "The cleanest financial dashboard I've ever used. The categorization is spot on, and the UI is incredibly snappy." },
                { name: "Elena R.", role: "Small Business Owner", text: "Having an AI advisor to bounce budgeting ideas off of is a game-changer. It's like having a CFO in my pocket." }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-3xl bg-card border border-white/5 shadow-lg">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="h-4 w-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-background relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing</h2>
              <p className="text-lg text-muted-foreground">Start for free, upgrade when you need more power.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="rounded-3xl p-8 border border-white/10 bg-card flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-muted-foreground mb-6">Perfect for getting started.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">$0</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Manual transaction entry', 'Basic analytics dashboard', '1 Budget goal', 'Standard support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button variant="outline" className="w-full h-12 text-base">Get Started Free</Button>
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="rounded-3xl p-8 border-2 border-primary bg-card relative shadow-2xl shadow-primary/20 flex flex-col transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-muted-foreground mb-6">For those serious about wealth.</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">$12</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Unlimited automated tracking', 'Advanced AI Financial Advisor', 'Unlimited budget goals', 'Custom categories', 'Priority support'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full h-12 text-base">Upgrade to Pro</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8">Ready to master your money?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial lives with GrowWise AI.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold">GrowWise AI</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                The modern financial operating system for individuals who want to take control of their wealth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© 2026 GrowWise AI Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
