import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { RootLayout, DashboardLayout } from "./layouts/RootLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Products  from "./pages/products";

// Temporary test dashboard elements
const Overview = () => <div className="text-zinc-100"><h1 className="text-3xl font-extrabold tracking-tight">System Status: Active</h1></div>;


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public Open Auth Shell Routes
      { path: "", element: <Navigate to="/dashboard" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      
      // Protected Private Infrastructure Shell Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              { path: "", element: <Overview /> },
              { path: "products", element: <Products/> }
            ]
          }
        ]
      },
      
      // Fallback redirection catch-all block
      { path: "*", element: <Navigate to="/dashboard" replace /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;