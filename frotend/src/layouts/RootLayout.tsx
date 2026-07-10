import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Global Main Layout Wrapper
export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans antialiased">
      <Outlet />
    </div>
  );
};

// Internal Dashboard Navigation Frame
export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <h2 className="text-lg font-bold tracking-wider text-indigo-400">CONSOLE CORE</h2>
          <nav className="flex flex-col gap-2">
            <Link to="/dashboard" className="px-3 py-2 rounded-lg bg-zinc-800 text-sm font-medium">Overview</Link>
            <Link to="/dashboard/products" className="px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800/50 text-sm font-medium transition">Products</Link>
          </nav>
        </div>
        <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
          <div className="text-xs">
            <p className="font-semibold text-zinc-200">{user?.name}</p>
            <p className="text-zinc-500 truncate">{user?.email}</p>
          </div>
          <button onClick={logout} className="w-full text-left text-xs text-red-400 hover:text-red-300 transition">
            Log Out Session
          </button>
        </div>
      </aside>
      <main className="flex-1 p-10 bg-zinc-950">
        <Outlet />
      </main>
    </div>
  );
};