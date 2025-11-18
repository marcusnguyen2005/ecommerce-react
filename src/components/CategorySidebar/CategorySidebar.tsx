import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategorySidebarProps {
  categories: Category[];
  onCategoryChange?: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  onCategoryChange,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category") || "all";

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sticky top-20">
      <h3 className="font-bold text-lg mb-3 text-gray-900">Danh mục</h3>
      <ul className="space-y-1">
        <li>
          <Link
            to="?category=all"
            onClick={() => handleCategoryClick("all")}
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tất cả
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`?category=${category.id}`}
              onClick={() => handleCategoryClick(category.id)}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;

