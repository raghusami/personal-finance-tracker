import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGoals, deleteGoal } from "../../services/goalService";
import { Goal } from "../../types/Goal";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  FlagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const ListGoal = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterStatus, goals]);

  const fetchGoals = async () => {
    try {
      const res = await getGoals();
      setGoals(res.data);
    } catch {
      showToast("error", "Failed to load goals.");
    }
  };

  const applyFilters = () => {
    let data = [...goals];
    if (filterStatus !== "All") {
      data = data.filter((g) => g.status === filterStatus);
    }
    if (search.trim()) {
      data = data.filter(
        (g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.notes?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredGoals(data);
    setCurrentPage(1);
  };

  const paginatedGoals = filteredGoals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredGoals.length / itemsPerPage);

  const handleDelete = (id: number) => setDeleteId(id);

  const handleEdit = (id: number) => navigate(`/goal/edit/${id}`);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteGoal(deleteId);
      showToast("success", "Goal deleted successfully.");
      fetchGoals();
    } catch {
      showToast("error", "Failed to delete goal.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-2">
      <PageHeader
        title="Goal List"
        icon={<FlagIcon className="w-6 h-6" />}
        breadcrumb={["Finance", "Goals", "Goal List"]}
      />

      <div className="card bg-base-100 border border-base-200 shadow-sm">
        <div className="card-body">
          {/* Search + Filter + Add */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search goal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="select select-bordered"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              className="btn btn-primary shadow hover:scale-105 transition-transform"
              onClick={() => navigate("/goal")}
            >
              <PlusIcon className="w-5 h-5" />
              <span className="ml-2">Add Goal</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4 border border-base-200 rounded-lg shadow-sm">
            <table className="table table-zebra w-full">
              <thead className="bg-base-100 text-base-content">
                <tr className="text-sm">
                  <th>Name</th>
                  <th>Target</th>
                  <th>Progress</th>
                  <th>Target Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGoals.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="text-center py-8 opacity-60">
                        <DocumentTextIcon className="w-10 h-10 mx-auto mb-2" />
                        <p>No goals found.</p>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => navigate("/goal")}
                        >
                          <PlusIcon className="w-5 h-5 mr-1" />
                          Add Your First Goal
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedGoals.map((goal) => (
                    <tr key={goal.id}>
                      <td>{goal.name}</td>
                      <td>
                        ₹{goal.targetAmount.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <progress
                          className="progress progress-primary w-24"
                          value={goal.currentAmount}
                          max={goal.targetAmount}
                        />
                      </td>
                      <td>{goal.targetDate}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            goal.status === "Completed"
                              ? "badge-success"
                              : goal.status === "In Progress"
                              ? "badge-primary"
                              : goal.status === "Cancelled"
                              ? "badge-error"
                              : "badge-ghost"
                          }`}
                        >
                          {goal.status}
                        </span>
                      </td>
                      <td className="max-w-[150px] truncate">
                        {goal.notes || "-"}
                      </td>
                      <td className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm btn-outline btn-primary btn-square tooltip"
                          data-tip="Edit"
                          onClick={() => handleEdit(goal.id)}
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error btn-square tooltip"
                          data-tip="Delete"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
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
              {Array.from({ length: totalPages }, (_, index) => (
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
      {deleteId !== null && (
        <ConfirmDeleteModal
          title="Delete Goal"
          message="Are you sure you want to delete this goal?"
          confirmLabel="Yes, Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ListGoal;
