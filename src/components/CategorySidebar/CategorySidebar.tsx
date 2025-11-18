import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSlugs } from "../../hooks/useSlugUrl";
import { getSlugSync, getUrlFromSlug } from "../../utils/slugResolver";

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
  const slugs = useSlugs();
  const pathname = location.pathname;
  
  // Check if current path matches a category slug
  const isCategoryActive = (categoryName: string) => {
    const categorySlug = getSlugSync(slugs, "category", categoryName);
    if (categorySlug) {
      const categoryUrl = getUrlFromSlug(categorySlug);
      return pathname === categoryUrl;
    }
    return false;
  };

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-1 sticky top-20">
      <h3 className="font-bold text-lg mb-3 text-gray-900">Danh mục</h3>
      <ul className="space-y-1">
        <li>
          <Link
            to="/san-pham"
            onClick={() => handleCategoryClick("all")}
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              pathname === "/san-pham"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tất cả
          </Link>
        </li>
        {categories.map((category) => {
          const categorySlug = getSlugSync(slugs, "category", category.name);
          const categoryUrl = categorySlug ? getUrlFromSlug(categorySlug) : `/danh-muc/${category.id}`;
          const isActive = isCategoryActive(category.name);

          return (
            <li key={category.id}>
              <Link
                to={categoryUrl}
                onClick={() => handleCategoryClick(category.id)}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
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
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySidebar;

