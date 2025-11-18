import React, { useState, useEffect } from "react";
import { Product } from "../../types";
import ProductCard from "../ProductCard";

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4 | 5;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  columns = 5,
}) => {
  const gridCols = {
    2: "grid-cols-2 md:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  if (loading) {
    return (
      <div className={`grid gap-2.5 ${gridCols[columns]}`}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md animate-pulse"
          >
            <div className="w-full h-64 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-2.5 ${gridCols[columns]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

