// Matches your MongoDB User Schema exactly (minus the password for security)
export interface IUser {
  _id: string;
  name: string;
  email: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: IUser;
  accessToken: string;
}

export interface AuthContextType {
  accessToken: string | null;
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
  logout: () => Promise<void>;
}

// Data required for User Registration
export interface RegisterRequest {
  name: string;
  email: string;
  password: string; // Required when sending to backend
}

// Data required for User Login
export interface LoginRequest {
  email: string;
  password: string;
}

// Standard Auth API Response structure
export interface AuthResponse {
  success: boolean;
  message: string;
  user: IUser;
  accessToken: string; // If you pass the token in the response body
}


// Matches the backend IProductImage interface
export interface IProductImage {
  publicUrl: string;
  privateUrl: string;
}

// Matches your Product Schema on the frontend (omitting Mongoose Document internals)
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  category?: string;
  tags: string[];
  images: IProductImage[];
  createdAt: string;
  updatedAt: string;
}

// Data required when creating a new product
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  inStock?: boolean;
  category?: string;
  tags?: string[];
  images: IProductImage[];
}

// Optional: for updating a product (all fields optional)
export type UpdateProductDto = Partial<CreateProductDto>;