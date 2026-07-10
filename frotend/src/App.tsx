import { useEffect, useState } from "react";
import apiClient from "./api/apiClient.js";
import type { IProduct } from "./api/types.js";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkProductApi = async () => {
      try {
        console.log("Testing endpoint: Fetching all products...");
        
        // Replace '/products' with your actual backend endpoint routing if different
        const response = await apiClient.get<IProduct[]>("/products");
        
        console.log("API Connection Success! Data received:", response.data);
        setProducts(response.data);
      } catch (err: any) {
        console.error("API Connection Failed:", err);
        setError(err.message || "Something went wrong while fetching products.");
      }
    };

    checkProductApi();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-6 rounded-xl shadow-2xl">
        <h1 className="text-xl font-bold tracking-tight mb-2 text-indigo-400">
          API Connection Test
        </h1>
        
        {error ? (
          <div className="text-sm bg-red-950/40 border border-red-900 text-red-400 p-3 rounded-lg">
            ❌ Error: {error}
          </div>
        ) : products.length > 0 ? (
          <div className="space-y-2">
            <div className="text-sm bg-emerald-950/40 border border-emerald-900 text-emerald-400 p-3 rounded-lg font-medium">
              ✅ Success! Connected to backend.
            </div>
            <p className="text-xs text-zinc-400">
              Found <span className="text-zinc-200 font-semibold">{products.length}</span> products inside your database. Check the browser console to inspect the full data structures!
            </p>
          </div>
        ) : (
          <div className="text-sm text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            Pinging database layers...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;