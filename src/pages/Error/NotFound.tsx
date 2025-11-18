import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Trang không tìm thấy
          </h2>
          <p className="text-gray-600 mb-8">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Về trang chủ
          </Link>
          <div>
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Quay lại trang trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

