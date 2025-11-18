import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600 mt-1">Danh sách tất cả danh mục trong hệ thống</p>
        </div>
        <button
          onClick={() => navigate("/admin/categories/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Thêm danh mục</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Chức năng quản lý danh mục sẽ được phát triển sau.</p>
      </div>
    </div>
  );
};

export default CategoryList;

