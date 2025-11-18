import React from "react";
import { Link } from "react-router-dom";

interface ServerErrorProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

const ServerError: React.FC<ServerErrorProps> = ({ error, errorInfo }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-9xl font-bold text-red-500">500</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              Lỗi máy chủ
            </h2>
            <p className="text-gray-600">
              Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.
            </p>
          </div>

          {/* Error Details - Only show in development */}
          {process.env.NODE_ENV === "development" && error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Chi tiết lỗi:</h3>
              <div className="text-sm text-red-800 font-mono overflow-auto max-h-64">
                <div className="mb-2">
                  <strong>Error:</strong> {error.toString()}
                </div>
                {error.stack && (
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-xs">
                      {error.stack}
                    </pre>
                  </div>
                )}
                {errorInfo && errorInfo.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-xs">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Về trang chủ
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;

