import React, { useState, useMemo } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  itemsPerPage?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  onEdit,
  onDelete,
  itemsPerPage = 10,
  searchable = true,
  searchPlaceholder = "Tìm kiếm...",
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Filter data
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) => {
      return columns.some((col) => {
        const value =
          typeof col.accessor === "function"
            ? String(col.accessor(row))
            : String(row[col.accessor]);
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (accessor: keyof T) => {
    setSortConfig((prev) => ({
      key: accessor,
      direction:
        prev.key === accessor && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return String(row[column.accessor] ?? "");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() =>
                    column.sortable &&
                    typeof column.accessor !== "function" &&
                    handleSort(column.accessor)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.header}</span>
                    {column.sortable &&
                      typeof column.accessor !== "function" &&
                      sortConfig.key === column.accessor && (
                        <svg
                          className={`w-4 h-4 ${
                            sortConfig.direction === "asc" ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={String(row.id)} className="hover:bg-gray-50">
                  {columns.map((column, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCellValue(row, column)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Sửa
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Hiển thị{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            đến{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, sortedData.length)}
            </span>{" "}
            trong tổng số <span className="font-medium">{sortedData.length}</span> kết quả
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;

