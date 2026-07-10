import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import type{ RegisterFormData } from "../validations/schemas";
import { registerSchema } from "../validations/schemas";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../api/authService";

export const Register: React.FC = () => {
  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setAccessToken(response.accessToken);
      setUser(response.user);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Create Account</h1>
          <p className="text-sm text-zinc-400 mt-1">Register for secure dashboard access.</p>
        </div>

        {apiError && <div className="text-xs bg-red-950/40 border border-red-900 text-red-400 p-3 rounded-lg">{apiError}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Full Name</label>
            <input type="text" {...register("name")} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-indigo-500 text-sm text-zinc-100 transition outline-none" />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Email Address</label>
            <input type="email" {...register("email")} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-indigo-500 text-sm text-zinc-100 transition outline-none" />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Password</label>
            <input type="password" {...register("password")} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-indigo-500 text-sm text-zinc-100 transition outline-none" />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">Confirm Password</label>
            <input type="password" {...register("confirmPassword")} className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:border-indigo-500 text-sm text-zinc-100 transition outline-none" />
            {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-sm font-semibold text-zinc-100 rounded-xl transition">
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
