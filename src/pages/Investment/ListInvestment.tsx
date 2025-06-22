import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvestments, deleteInvestment } from "../../services/investmentService";
import { Investment } from "../../types/Investment";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const ListInvestment = () => {
  const [investmentList, setInvestmentList] = useState<Investment[]>([]);
  const [filteredList, setFilteredList] = useState<Investment[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvestments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterType, investmentList]);

  const fetchInvestments = async () => {
    try {
      const res = await getInvestments();
      setInvestmentList(res.data);
    } catch {
      showToast("error", "Failed to load investment records.");
    }
  };

  const applyFilters = () => {
    let data = [...investmentList];
    if (filterType !== "All") {
      data = data.filter((item) => item.investmentType === filterType);
    }
    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.investmentType.toLowerCase().includes(search.toLowerCase()) ||
          item.platform.toLowerCase().includes(search.toLowerCase()) ||
          item.notes?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredList(data);
    setCurrentPage(1);
  };

  const totalAmount = filteredList.reduce((sum, item) => sum + item.amount, 0);

  const paginatedData = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleEdit = (id: string | number) => {
    navigate(`/investments/edit/${id}`);
  };

  const handleDelete = (id: string | number) => {
    setDeleteId(String(id));
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteInvestment(deleteId);
      showToast("success", "Investment record deleted.");
      fetchInvestments();
    } catch {
      showToast("error", "Failed to delete investment.");
    } finally {
      setDeleteId(null);
    }
  };

  const ConfirmDeleteModal = ({ onConfirm, onCancel }: any) => (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this investment record?</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onConfirm}>Yes, Delete</button>
          <button className="btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
  );

  return (
    <div className="p-2">
      <PageHeader
        title="Investment List"
        icon={<ChartBarIcon className="w-6 h-6" />}
        breadcrumb={["Components", "Investments", "List"]}
      />

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="stats bg-base-200 shadow-md">
          <div className="stat">
            <div className="stat-title">Total Invested Amount</div>
            <div className="stat-value text-primary">
              ₹ {totalAmount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white border border-gray-200 shadow-sm">
        <div className="card-body">
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search by platform or notes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="select select-bordered"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Mutual Fund">Mutual Fund</option>
                <option value="Stock">Stock</option>
                <option value="Gold">Gold</option>
                <option value="Real Estate">Real Estate</option>
              </select>
            </div>

            <button
              className="btn btn-primary shadow hover:scale-105 transition-transform"
              onClick={() => navigate("/investments")}
            >
              <PlusIcon className="h-5 w-5" />
              <span className="ml-2">Add Investment</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow-sm rounded-lg border border-base-200 mt-4">
            <table className="table table-zebra w-full">
              <thead className="bg-base-100 text-base-content">
                <tr className="text-sm">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Platform</th>
                  <th>Notes</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      <div className="text-center py-8 text-gray-500">
                        <DocumentTextIcon className="h-10 w-10 mx-auto mb-2" />
                        <p className="text-md">No investments found.</p>
                        <button
                          onClick={() => navigate("/investments")}
                          className="btn btn-primary mt-2"
                        >
                          <PlusIcon className="h-5 w-5 mr-1" />
                          Add Your First Investment
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-base-200 transition-all">
                      <td>{item.date}</td>
                      <td className="badge badge-outline badge-primary badge-xs">
                        ₹ {item.amount.toLocaleString("en-IN")}
                      </td>
                      <td>{item.investmentType}</td>
                      <td>{item.platform}</td>
                      <td className="max-w-[180px] truncate">{item.notes || "-"}</td>
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
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ListInvestment;
