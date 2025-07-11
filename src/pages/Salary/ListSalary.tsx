import { useEffect, useState } from "react";
import {
  getIncomes,
  deleteIncome,
} from "../../services/IncomeService";
import { Income } from "../../types/Income";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon
} from "@heroicons/react/24/solid";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const ListSalary = () => {
  const [salaryList, setSalaryList] = useState<Income[]>([]);
  const [filteredSalaries, setFilteredSalaries] = useState<Income[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchSalaries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterType, salaryList]);

  const fetchSalaries = async () => {
    try {
      const res = await getIncomes();
      console.log("Fetched salaries:", res.data.responseData); // Debugging line to check fetched data
      setSalaryList(res.data.responseData);
    } catch {
      showToast("error", "Failed to load salary entries.");
    }
  };

  const applyFilters = () => {
    let data = [...salaryList];
    if (filterType !== "All") {
      data = data.filter((item) => item.IncomeType === filterType);
    }
    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.incomeSource.toLowerCase().includes(search.toLowerCase()) ||
          item.notes?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredSalaries(data);
    setCurrentPage(1);
  };

  const paginatedSalaries = filteredSalaries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSalaries.length / itemsPerPage);



  const handleDelete = (id: string) => setDeleteId(id);
  
  const handleEdit = (id: string) => {
    navigate(`/salary/edit/${id}`);
  };
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteIncome(deleteId);
      showToast("success", "Deleted successfully.");
      fetchSalaries();
    } catch {            
      showToast("error", "Failed to delete.");
    } finally {
      setDeleteId(null);
    }
  };

 return (
  <div className="p-2">
    <PageHeader
      title="Income List"
      icon={<CurrencyRupeeIcon className="w-6 h-6" />}
      breadcrumb={["Components", "Income", "Income List"]}
    />

    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body">
        {/* Header with Add + Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="select select-bordered"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Freelance">Freelance</option>
              <option value="Bonus">Bonus</option>
            </select>
          </div>

          <button
            className="btn btn-primary btn-md shadow hover:scale-105 transition-transform"
            onClick={() => navigate("/salary")}
            title="Add Salary"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="ml-2">Add Income</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-sm rounded-lg border border-base-200 mt-4">
          <table className="table table-zebra w-full">
            <thead className="bg-base-100 text-base-content">
              <tr className="text-sm">
                <th>Date</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Type</th>
                <th>Notes</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSalaries.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="text-center py-8 text-base-content opacity-60">
                      <DocumentTextIcon className="h-10 w-10 mx-auto mb-2" />
                      <p className="text-md">No Income entries found.</p>
                      <button onClick={() => navigate("/salary")} className="btn btn-primary mt-2">
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Your First Entry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedSalaries.map((item) => (
                  <tr key={item.id} className="hover:bg-base-200 transition-all">
                    <td>{item.incomeDate}</td>
                    <td>{item.incomeSource}</td>
                    <td className="badge badge-outline badge-primary badge-xs">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: item.currency,
                      }).format(item.amount)}
                    </td>
                    <td>{item.currency}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          item.incomeType === "Primary"
                            ? "badge-primary"
                            : item.incomeType === "Bonus"
                            ? "badge-success"
                            : item.incomeType === "Freelance"
                            ? "badge-warning"
                            : "badge-neutral"
                        }`}
                      >
                        {item.incomeType}
                      </span>
                    </td>
                    <td className="max-w-[150px] truncate">{item.notes || "-"}</td>
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

    {/* Delete Modal */}
    {deleteId && (
        <ConfirmDeleteModal
        title="Delete Income Entry"
        message="Are you sure you want to permanently delete this income entry?"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    )}
  </div>
);

};

export default ListSalary;
