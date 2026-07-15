import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// ---------------------------------------------------------------------------
// 1. Root Layout: Global structural reset and foundational shell
// ---------------------------------------------------------------------------
export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <Outlet />
    </div>
  );
};
// ---------------------------------------------------------------------------
// 2. Storefront Layout: Public-facing e-commerce shopping client shell
// ---------------------------------------------------------------------------
export const StorefrontLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [cartCount] = useState<number>(0); // Connect this to your dynamic cart context state later
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Banner Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo Anchor */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-sm tracking-wider shadow-md shadow-indigo-500/20">
              Ω
            </span>
            <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 to-zinc-400 group-hover:text-zinc-50 transition-colors">
              NEXUS<span className="text-indigo-500">SHOP</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link to="/products" className="hover:text-zinc-100 transition-colors">Browse Shop</Link>
            <Link to="/categories" className="hover:text-zinc-100 transition-colors">Categories</Link>
            <Link to="/deals" className="hover:text-zinc-100 transition-colors">Hot Deals</Link>
          </nav>

          {/* Action Items Panel */}
          <div className="flex items-center gap-4">
            
            {/* Direct Shopping Cart Indicator Trigger */}
            <Link 
              to="/cart" 
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors relative rounded-full hover:bg-zinc-900"
              aria-label="View Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Conditional Authentication Context Menu Container */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-sm font-medium hover:bg-zinc-900 transition focus:outline-none"
                >
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold uppercase">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <span className="max-w-[100px] truncate hidden sm:inline text-zinc-300">{user.name}</span>
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                      {user.role === "admin" && (
                        <Link 
                          to="/dashboard" 
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex w-full items-center px-3 py-2 text-xs rounded-lg text-indigo-400 font-semibold hover:bg-zinc-800 transition"
                        >
                          Console Dashboard
                        </Link>
                      )}
                      <Link 
                        to="/orders" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex w-full items-center px-3 py-2 text-xs rounded-lg text-zinc-300 hover:bg-zinc-800 transition"
                      >
                        Order History
                      </Link>
                      <hr className="my-1 border-zinc-800" />
                      <button 
                        onClick={() => { setUserDropdownOpen(false); logout(); }} 
                        className="flex w-full items-center px-3 py-2 text-xs rounded-lg text-red-400 font-medium hover:bg-red-500/10 transition text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-sm font-semibold bg-zinc-100 text-zinc-950 px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}

          </div>
        </div>
      </header>

      {/* Main E-Commerce Content Payload Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Clean Utility Minimal Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 NexusShop Inc. All Rights Reserved.</p>
          <div className="flex gap-4 text-zinc-500">
            <Link to="/privacy" className="hover:text-zinc-400 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-zinc-400 transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
// ---------------------------------------------------------------------------
// 3. Dashboard Layout: Secure internal system portal back-office console frame
// ---------------------------------------------------------------------------
export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Helper macro to verify location paths and dynamic visual highlighting links
  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) => `
    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
    ${isActive(path) 
      ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/15" 
      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"}
  `;

  return (
    <div className="flex min-h-screen bg-zinc-950">
      
      {/* Sidebar Control Deck Panel */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-900/20 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Dashboard Module Identifier Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <div>
              <h2 className="text-xs font-black tracking-widest text-indigo-400 uppercase">CONSOLE CORE</h2>
              <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">v2.4.0-stable</p>
            </div>
            <Link to="/" className="text-xs text-zinc-500 hover:text-zinc-300 underline font-medium">Store ↗</Link>
          </div>

          {/* Core Management Panel Navigation Anchors */}
          <nav className="flex flex-col gap-1">
            <Link to="/dashboard" className={linkStyle("/dashboard")}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              Overview
            </Link>

            <Link to="/dashboard/products" className={linkStyle("/dashboard/products")}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Products Catalog
            </Link>

            <Link to="/dashboard/orders" className={linkStyle("/dashboard/orders")}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Orders Fulfillment
            </Link>

            <Link to="/dashboard/settings" className={linkStyle("/dashboard/settings")}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Global Settings
            </Link>
          </nav>
        </div>

        {/* User Workspace Profile Section */}
        <div className="border-t border-zinc-900 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-900">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="text-xs min-w-0 flex-1">
              <p className="font-semibold text-zinc-200 truncate">{user?.name || "System Admin"}</p>
              <p className="text-zinc-500 truncate text-[10px] font-mono">{user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={logout} 
            className="w-full text-center px-3 py-2 text-xs rounded-lg text-red-400 font-medium border border-red-500/10 hover:bg-red-500/5 hover:text-red-300 transition"
          >
            End Control Session
          </button>
        </div>
      </aside>

      {/* Dynamic Screen Mounting Main Pane */}
      <main className="flex-1 p-8 sm:p-10 overflow-y-auto max-w-[1600px] mx-auto">
        <Outlet />
      </main>

    </div>
  );
};