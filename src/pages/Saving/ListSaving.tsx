import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSavings,
  deleteSaving,
} from "../../services/savingsService";
import { Saving } from "../../types/Saving";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import { deleteSavingPayment, getSavingPayments } from "../../services/savingpayments";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  BanknotesIcon,
  DocumentTextIcon
} from "@heroicons/react/24/solid";

const ListSaving = () => {
  const [savingList, setSavingList] = useState<Saving[]>([]);
  const [filteredList, setFilteredList] = useState<Saving[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterType, savingList]);

  const fetchSavings = async () => {
    try {
      const res = await getSavings();
      setSavingList(res.data);
    } catch {
      showToast("error", "Failed to load savings data.");
    }
  };

  const applyFilters = () => {
    let data = [...savingList];
    if (filterType !== "All") {
      data = data.filter((item) => item.savingType === filterType);
    }
    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.goalName?.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredList(data);
    setCurrentPage(1);
  };

  const paginatedData = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleEdit = (id: string | number) => {
    navigate(`/savings/edit/${id}`);
  };

  const handleDelete = (id: string | number) => {
    setDeleteId(String(id));
  };

const handleConfirmDelete = async () => {
  if (!deleteId) return;

  try {
    // 1. Get all payments for this saving
    const res = await getSavingPayments();
    const relatedPayments = res.data.filter(p => String(p.savingId) === deleteId);

    // 2. Delete each related payment
    await Promise.all(relatedPayments.map(p => deleteSavingPayment(p.id)));

    // 3. Delete the saving
    await deleteSaving(deleteId);
    showToast("success", "Saving and related payments deleted.");
    
    fetchSavings();
  } catch {
    showToast("error", "Failed to delete saving or its payments.");
  } finally {
    setDeleteId(null);
  }
};

return (
  <div className="p-2">
    <PageHeader
      title="Savings List"
      icon={<BanknotesIcon className="w-6 h-6" />}
      breadcrumb={["Components", "Savings", "List"]}
    />

    <div className="card bg-base-100 border border-base-200 shadow-sm">
      <div className="card-body">
        {/* Filters & Add Button */}
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
              <option value="Recurring">Recurring</option>
              <option value="One-time">One-time</option>
            </select>
          </div>

          <button
            className="btn btn-primary shadow hover:scale-105 transition-transform"
            onClick={() => navigate("/savings")}
          >
            <PlusIcon className="h-5 w-5" />
            <span className="ml-2">Add Saving</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4 border border-base-200 rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-100 text-base-content">
              <tr className="text-sm">
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
                <th>Goal</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="text-center py-8 text-base-content opacity-60">
                      <DocumentTextIcon className="h-10 w-10 mx-auto mb-2" />
                      <p className="text-md">No savings entries found.</p>
                      <button
                        onClick={() => navigate("/savings")}
                        className="btn btn-primary mt-2"
                      >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Your First Entry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-base-200 transition-all">
                    <td>{item.date}</td>
                    <td className="max-w-[180px] truncate">{item.title}</td>
                    <td className="badge badge-outline badge-primary badge-xs">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: item.currency,
                      }).format(item.amount)}
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          item.savingType === "Recurring"
                            ? "badge-info"
                            : "badge-success"
                        }`}
                      >
                        {item.savingType}
                      </span>
                    </td>
                    <td className="max-w-[120px] truncate">
                      {item.goalName || "-"}
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
        title="Delete Saving Entry"
        message="Are you sure you want to delete this saving entry?"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    )}
  </div>
);

};

export default ListSaving;
