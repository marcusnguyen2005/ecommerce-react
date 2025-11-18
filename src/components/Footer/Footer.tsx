import React from "react";
import { Link } from "react-router-dom";
import anhlogo from "../../assets/images/Ten-truong-do-1000x159.png";

interface Category {
  id: string;
  name: string;
}

interface FooterProps {
  categories?: Category[];
}

const Footer: React.FC<FooterProps> = ({ categories = [] }) => {
  // Default categories if not provided
  const defaultCategories: Category[] = [
    { id: "ao", name: "Áo" },
    { id: "non", name: "Nón" },
    { id: "quan", name: "Quần" },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1: Logo và Địa chỉ */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={anhlogo}
                alt="Logo"
                className="h-12 w-auto object-contain max-w-full filter brightness-0 invert"
              />
            </Link>
            <div className="space-y-2 text-sm">
              <p className="text-white font-semibold">Địa chỉ:</p>
              <p>123 Đường ABC, Phường XYZ</p>
              <p>Quận 1, TP. Hồ Chí Minh</p>
              <p className="mt-4">
                <span className="text-white font-semibold">Email:</span> info@example.com
              </p>
              <p>
                <span className="text-white font-semibold">Điện thoại:</span> 0123 456 789
              </p>
              
              {/* Social Media Icons */}
              <div className="mt-6">
                <p className="text-white font-semibold mb-3">Theo dõi chúng tôi:</p>
                <div className="flex items-center space-x-3">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2: Danh mục sản phẩm */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              {displayCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/sanpham?category=${category.id}`}
                    className="text-sm hover:text-white transition-colors duration-200 block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Các trang */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-white transition-colors duration-200 block"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/thoi-trang"
                  className="text-sm hover:text-white transition-colors duration-200 block"
                >
                  Thời trang
                </Link>
              </li>
              <li>
                <Link
                  to="/ve-chung-toi"
                  className="text-sm hover:text-white transition-colors duration-200 block"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="text-sm hover:text-white transition-colors duration-200 block"
                >
                  Quản trị
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 Demo Application. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

