import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roleRequired,
}) => {
  const user = auth.getCurrentUser();

  // Nếu chưa đăng nhập → chuyển về trang đăng nhập
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "⚠️ Vui lòng đăng nhập để tiếp tục!" }}
      />
    );
  }

  // Nếu route yêu cầu quyền admin → kiểm tra username
  if (roleRequired === "admin" && !auth.isAdmin()) {
    alert("❌ Bạn không có quyền truy cập trang quản trị!");
    return <Navigate to="/" replace />;
  }

  // Nếu hợp lệ → render nội dung bên trong
  return <>{children}</>;
};

export default ProtectedRoute;

