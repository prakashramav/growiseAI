"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, 
  Bot, 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  PieChart, 
  Settings, 
  Target,
  TrendingUp,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import LiveTicker from "@/components/dashboard/LiveTicker";
import { getCookie, deleteCookie } from "@/lib/api";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Budgets", href: "/budgets", icon: PieChart },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Projections", href: "/projections", icon: TrendingUp },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const token = getCookie("token");
    const storedUser = localStorage.getItem("user");
    
    if (!token || !storedUser) {
      router.push("/login");
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        router.push("/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    deleteCookie("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-muted/30">Loading...</div>;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">GrowWise AI</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-emerald-50 text-emerald-700" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}>
                  <Icon className="h-5 w-5" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t">
          <Link href="/settings">
            <span className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Settings className="h-5 w-5" />
              Settings
            </span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mt-1">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b bg-background">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-emerald-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <div className="hidden md:block"></div> {/* Spacer */}
          <div className="flex items-center gap-4 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium text-sm border border-emerald-200 hover:bg-emerald-200 transition-colors focus:outline-none"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                <div className="absolute right-0 top-11 w-60 rounded-xl border bg-background shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b bg-muted/10 rounded-t-xl">
                    <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link href="/settings" onClick={() => setIsProfileOpen(false)}>
                      <span className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Settings className="h-4 w-4" />
                        Settings
                      </span>
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors mt-0.5"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Mobile Menu (Overlay) */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b">
               <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">GrowWise AI</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isActive ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100" : "text-slate-600 hover:bg-slate-50"
                    }`}>
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="p-6 border-t bg-slate-50/50">
              <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-100 transition-all">
                  <Settings className="h-5 w-5" />
                  Settings
                </span>
              </Link>
              <button 
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50 transition-all mt-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        )}

        <LiveTicker />

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto relative z-0">
          {children}
        </div>
      </main>
    </div>
  );
}
