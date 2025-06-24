import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../services/expenseService";
import { Expense } from "../../types/Expense";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentTextIcon,
  WalletIcon
} from "@heroicons/react/24/solid";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const ListExpenses = () => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterCategory, expenseList]);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenseList(res.data);
    } catch {
      showToast("error", "Failed to load expense entries.");
    }
  };

  const applyFilters = () => {
    let data = [...expenseList];
    if (filterCategory !== "All") {
      data = data.filter((item) => item.category === filterCategory);
    }
    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.subcategory?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredExpenses(data);
    setCurrentPage(1);
  };

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleEdit = (id: number) => navigate(`/expenses/edit/${id}`);
  const handleDelete = (id: number) => setDeleteId(id);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteExpense(deleteId);
      showToast("success", "Expense deleted successfully.");
      fetchExpenses();
    } catch {
      showToast("error", "Failed to delete expense.");
    } finally {
      setDeleteId(null);
    }
  };

 return (
  <div className="p-2">
    <PageHeader
      title="Expense List"
      icon={<WalletIcon className="w-6 h-6" />}
      breadcrumb={["Components", "Expense", "Expense List"]}
    />

    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body">
        {/* Header with Search + Filter + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search by description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select select-bordered"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {[...new Set(expenseList.map(e => e.category))].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary btn-md shadow hover:scale-105 transition-transform"
            onClick={() => navigate("/expenses")}
          >
            <PlusIcon className="h-5 w-5" />
            <span className="ml-2">Add Expense</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-4 border border-base-200 rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-100 text-base-content">
              <tr className="text-sm">
                <th>Date</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="text-center py-8 text-base-content opacity-60">
                      <DocumentTextIcon className="h-10 w-10 mx-auto mb-2" />
                      <p className="text-md">No expense entries found.</p>
                      <button
                        onClick={() => navigate("/expense")}
                        className="btn btn-primary mt-2"
                      >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Your First Entry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedExpenses.map((item) => (
                  <tr key={item.id} className="hover:bg-base-200 transition-all">
                    <td>{item.date}</td>
                    <td>{item.category}</td>
                    <td>{item.subcategory || "-"}</td>
                    <td className="badge badge-outline badge-error badge-xs">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: item.currency || "INR",
                      }).format(item.amount)}
                    </td>
                    <td>{item.currency || "INR"}</td>
                    <td className="max-w-[150px] truncate">
                      {item.description || "-"}
                    </td>
                    <td className="flex gap-2 justify-center">
                      <button
                        className="btn btn-sm btn-square btn-outline btn-primary tooltip"
                        data-tip="Edit"
                        onClick={() => handleEdit(item.id)}
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-square btn-outline btn-error tooltip"
                        data-tip="Delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end pt-4 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Confirm Delete Modal */}
    {deleteId && (
      <ConfirmDeleteModal
        title="Confirm Deletion"
        message="Are you sure you want to delete this expense?"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    )}
  </div>
);

};

export default ListExpenses;
