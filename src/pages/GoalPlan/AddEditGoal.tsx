import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createGoal,
  updateGoal,
  getGoalById,
} from "../../services/goalService";
import { showToast } from "../../components/ToastPortal";
import PageHeader from "../../components/PageHeader";
import { Goal } from "../../types/Goal";
import { FlagIcon } from "@heroicons/react/24/solid";

const schema = yup.object().shape({
  name: yup.string().required("Goal name is required"),
  targetAmount: yup
    .number()
    .typeError("Must be a number")
    .positive("Target amount must be positive")
    .required("Target amount is required"),
  currentAmount: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Current amount cannot be negative")
    .required("Current amount is required"),
  targetDate: yup.string().required("Target date is required"),
  status: yup
    .mixed<Goal["status"]>()
    .oneOf(["Not Started", "In Progress", "Completed", "Cancelled"])
    .required("Status is required"),
  notes: yup.string().optional(),
});

const AddEditGoal = () => {
  const { id } = useParams(); // from /goal/edit/:id
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Goal, "id" | "userId">>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: "",
      status: "Not Started",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadGoal(id);
    }
  }, [id]);

  const loadGoal = async (id: string) => {
    try {
      setLoading(true);
      const response = await getGoalById(id);
      const data = response.data;

      const { name, targetAmount, currentAmount, targetDate, status, notes } = data;
      reset({ name, targetAmount, currentAmount, targetDate, status, notes });
    } catch (error) {
      showToast("error", "Failed to load goal details.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: Omit<Goal, "id" | "userId">) => {
    try {
      if (isEdit && id) {
        await updateGoal(id, formData);
        showToast("success", "Goal updated successfully!");
      } else {
        await createGoal(formData);
        showToast("success", "Goal added successfully!");
      }

      navigate("/goal/list");
    } catch (error) {
      showToast("error", "Failed to save goal.");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <PageHeader
        title={isEdit ? "Edit Goal" : "Add Goal"}
        icon={<FlagIcon className="w-6 h-6" />}
        breadcrumb={["Finance", "Goals", isEdit ? "Edit Goal" : "Add Goal"]}
      />

      <div className="flex justify-start">
        <div className="card bg-base-100 border border-base-200 shadow-sm">
          <div className="card-body">
            {loading ? (
              <p className="text-center text-sm text-base-content opacity-60">
                Loading form...
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
                {/* Goal Name */}
                <div>
                  <label className="label font-semibold">Goal Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="input input-bordered w-full"
                    placeholder="e.g., Emergency Fund"
                  />
                  {errors.name && (
                    <p className="text-error text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label font-semibold">Target Amount</label>
                    <input
                      type="number"
                      {...register("targetAmount")}
                      className="input input-bordered w-full"
                    />
                    {errors.targetAmount && (
                      <p className="text-error text-xs mt-1">
                        {errors.targetAmount.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label font-semibold">Current Amount</label>
                    <input
                      type="number"
                      {...register("currentAmount")}
                      className="input input-bordered w-full"
                    />
                    {errors.currentAmount && (
                      <p className="text-error text-xs mt-1">
                        {errors.currentAmount.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Target Date */}
                <div>
                  <label className="label font-semibold">Target Date</label>
                  <input
                    type="date"
                    {...register("targetDate")}
                    className="input input-bordered w-full"
                  />
                  {errors.targetDate && (
                    <p className="text-error text-xs mt-1">
                      {errors.targetDate.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="label font-semibold">Status</label>
                  <select {...register("status")} className="select select-bordered w-full">
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {errors.status && (
                    <p className="text-error text-xs mt-1">{errors.status.message}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="label font-semibold">Notes</label>
                  <textarea
                    {...register("notes")}
                    className="textarea textarea-bordered w-full"
                    placeholder="Optional description..."
                    rows={3}
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                  >
                    {isEdit ? "Update Goal" : "Save Goal"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/goal/list")}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditGoal;
