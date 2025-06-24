import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBudgetPeriods,
  deleteBudgetPeriod,
} from "../../services/budgetPeriodService";
import { BudgetPeriod } from "../../types/BudgetPeriod";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import {
  CalendarDaysIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const ListBudgetPeriod = () => {
  const [budgetList, setBudgetList] = useState<BudgetPeriod[]>([]);
  const [filteredList, setFilteredList] = useState<BudgetPeriod[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBudgets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, budgetList]);

  const fetchBudgets = async () => {
    try {
      const res = await getBudgetPeriods();
      setBudgetList(res.data);
    } catch {
      showToast("error", "Failed to load budget periods.");
    }
  };

  const applyFilters = () => {
    let data = [...budgetList];
    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.notes?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredList(data);
    setCurrentPage(1);
  };

  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleDelete = (id: string) => setDeleteId(id);

  const handleEdit = (id: string) => {
    navigate(`/budget-period/edit/${id}`);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBudgetPeriod(deleteId);
      showToast("success", "Deleted successfully.");
      fetchBudgets();
    } catch {
      showToast("error", "Failed to delete.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-2">
      <PageHeader
        title="Budget Periods"
        icon={<CalendarDaysIcon className="w-6 h-6" />}
        breadcrumb={["Finance", "Budget", "List"]}
      />

      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary shadow hover:scale-105"
              onClick={() => navigate("/budget-period")}
            >
              <PlusIcon className="h-5 w-5" />
              <span className="ml-2">Add Budget</span>
            </button>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-lg border border-base-200 mt-4">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-sm">
                  <th>From</th>
                  <th>To</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Duration</th>
                  <th>Notes</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="text-center py-8 opacity-60">
                        <DocumentTextIcon className="h-10 w-10 mx-auto mb-2" />
                        <p>No budget periods found.</p>
                        <button onClick={() => navigate("/budget-period")} className="btn btn-primary mt-2">
                          <PlusIcon className="h-5 w-5 mr-1" />
                          Add Your First Budget
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item) => (
                    <tr key={item.id} className="hover:bg-base-200">
                      <td>{item.fromDate}</td>
                      <td>{item.toDate}</td>
                      <td>{item.category}</td>
                      <td>
                        ₹{item.amount.toLocaleString("en-IN")}
                      </td>
                      <td>{item.durationType}</td>
                      <td className="max-w-[150px] truncate">{item.notes || "-"}</td>
                      <td className="flex gap-2 justify-center">
                        <button
                          className="btn btn-sm btn-outline btn-primary"
                          onClick={() => handleEdit(item.id)}
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error"
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
                  className={`btn btn-sm ${
                    currentPage === index + 1 ? "btn-primary" : "btn-ghost"
                  }`}
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
          title="Delete Budget Period"
          message="Are you sure you want to delete this budget period?"
          confirmLabel="Yes, Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ListBudgetPeriod;