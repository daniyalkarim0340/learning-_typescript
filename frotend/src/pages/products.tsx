import { useEffect, useState } from "react";
import { productService } from "../api/productService"; 



// 1. Updated interface keys to perfectly align with your log dump
interface CloudinaryImage {
  publicUrl: string;
  privateUrl: string;
  _id: string;
}

interface AlignedProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  images: CloudinaryImage[]; // ◄ Aligned with your array structure
  tags?: string[];
}

const Products = () => {
  const [products, setProducts] = useState<AlignedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const responseData = await productService.getAllProducts();
        
        // 2. Safely unpack arrays based on your clean network delivery layout
        if (Array.isArray(responseData)) {
          setProducts(responseData as unknown as AlignedProduct[]);
        } else if (responseData && typeof responseData === "object" && Array.isArray((responseData as any).data)) {
          setProducts((responseData as any).data);
        } else if (responseData && typeof responseData === "object" && Array.isArray((responseData as any).products)) {
          setProducts((responseData as any).products);
        } else {
          setProducts([]);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch products from server");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="text-center p-8 text-gray-600 font-medium">Loading products...</div>;
  if (error) return <div className="text-center p-8 text-red-500 font-medium">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found in the catalog.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            // 3. Extract the Cloudinary publicUrl safely from the first array item
            const productImageUrl = product.images && product.images.length > 0 
              ? product.images[0].publicUrl 
              : "https://placehold.co/400x300?text=No+Product+Image";

            return (
              <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white flex flex-col hover:shadow-md transition-shadow">
                
                {/* Image Box */}
                <div className="w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 relative">
                  <img
                    src={productImageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Product+Image";
                    }}
                  />
                  {!product.inStock && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-1 text-xs font-semibold tracking-wide uppercase text-blue-500">
                    {product.category || "General"}
                  </div>
                  
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
                    {product.name}
                  </h2>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 flex-grow mb-4">
                    {product.description || "No product details available."}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                    <span className="text-xl font-extrabold text-emerald-600">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <button 
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm text-white ${
                        product.inStock 
                          ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" 
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Sold Out"}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;