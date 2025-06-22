import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavingPayments, deleteSavingPayment } from "../../services/savingpayments";
import { SavingPayments } from "../../types/SavingPayments";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const ListSavingPayments = () => {
  const [paymentList, setPaymentList] = useState<SavingPayments[]>([]);
  const [filteredList, setFilteredList] = useState<SavingPayments[]>([]);
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterMethod, paymentList]);

  const fetchPayments = async () => {
    try {
      const res = await getSavingPayments();
      setPaymentList(res.data);
    } catch {
      showToast("error", "Failed to load saving payments.");
    }
  };

  const applyFilters = () => {
    let data = [...paymentList];

    if (filterMethod !== "All") {
      data = data.filter((p) => p.paymentMethod === filterMethod);
    }

    if (search.trim()) {
      data = data.filter(
        (p) =>
          p.notes?.toLowerCase().includes(search.toLowerCase()) ||
          p.paymentMethod.toLowerCase().includes(search.toLowerCase())
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

  const handleEdit = (id: string | number) => navigate(`/saving-payments/edit/${id}`);
  const handleDelete = (id: string | number) => setDeleteId(String(id));

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSavingPayment(deleteId);
      showToast("success", "Payment deleted.");
      fetchPayments();
    } catch {
      showToast("error", "Failed to delete payment.");
    } finally {
      setDeleteId(null);
    }
  };

  const ConfirmDeleteModal = ({ onConfirm, onCancel }: any) => (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this saving payment entry?</p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );

  return (
    <div className="p-2">
      <PageHeader
        title="Saving Payments List"
        icon={<CreditCardIcon className="w-6 h-6" />}
        breadcrumb={["Components", "Saving Payments", "List"]}
      />

      <div className="card bg-white border border-gray-200 shadow-sm">
        <div className="card-body">
          {/* Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search by notes or method"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="select select-bordered"
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
              >
                <option value="All">All Methods</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <button
              className="btn btn-primary shadow hover:scale-105 transition-transform"
              onClick={() => navigate("/saving-payments")}
            >
              <PlusIcon className="h-5 w-5" />
              <span className="ml-2">Add Payment</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow-sm rounded-lg border border-base-200 mt-4">
            <table className="table table-zebra w-full">
              <thead className="bg-base-100 text-base-content">
                <tr className="text-sm">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Method</th>
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
                        <p className="text-md">No saving payments found.</p>
                        <button
                          onClick={() => navigate("/saving-payments")}
                          className="btn btn-primary mt-2"
                        >
                          <PlusIcon className="h-5 w-5 mr-1" />
                          Add Your First Payment
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-base-200 transition-all">
                      <td>{item.date}</td>
                      <td className="badge badge-outline badge-primary badge-xs">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item.amount)}
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            item.status === "Completed"
                              ? "badge-success"
                              : item.status === "Pending"
                              ? "badge-info"
                              : "badge-error"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.paymentMethod}</td>
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

export default ListSavingPayments;
