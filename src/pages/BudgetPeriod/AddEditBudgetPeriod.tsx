import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createBudgetPeriod,
  getBudgetPeriodById,
  updateBudgetPeriod,
} from "../../services/budgetPeriodService";
import { showToast } from "../../components/ToastPortal";
import PageHeader from "../../components/PageHeader";
import { BudgetPeriod } from "../../types/BudgetPeriod";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import categoryList from "../../data/expenseCategories.json"; // Optional: for category dropdown

const schema = yup.object().shape({
  fromDate: yup.string().required("From date is required"),
  toDate: yup.string().required("To date is required"),
  category: yup.string().required("Category is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  notes: yup.string().optional(),
  durationType: yup
    .mixed<BudgetPeriod["durationType"]>()
    .oneOf(["monthly", "quarterly", "custom"], "Invalid duration")
    .optional(),
});

const AddEditBudgetPeriod = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<BudgetPeriod, "id">>({
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: "",
      toDate: "",
      category: "",
      amount: 0,
      notes: "",
      durationType: "monthly",
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadBudgetPeriod(id);
    }
  }, [id]);

  const loadBudgetPeriod = async (id: string) => {
    try {
      setLoading(true);
      const res = await getBudgetPeriodById(id);
      reset(res.data);
    } catch {
      showToast("error", "Failed to load budget period.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: Omit<BudgetPeriod, "id">) => {
    try {
      if (isEdit && id) {
        await updateBudgetPeriod(id, data);
        showToast("success", "Budget period updated successfully!");
      } else {
        await createBudgetPeriod(data);
        showToast("success", "Budget period created successfully!");
      }
      navigate("/budget-period/list");
    } catch {
      showToast("error", "Failed to save budget period.");
    }
  };
  return (
    <div className="p-4">
      <PageHeader
        title={isEdit ? "Edit Budget Period" : "Add Budget Period"}
        icon={<CalendarDaysIcon className="w-6 h-6" />}
        breadcrumb={["Finance", "Budget", isEdit ? "Edit" : "Add"]}
      />

    <div className="flex justify-left">
      <div className="card bg-base-100 border border-base-200 shadow-sm w-full max-w-2xl">
        <div className="card-body">
          {loading ? (
            <p className="text-center text-sm text-base-content opacity-60">Loading form...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              {/* From Date */}
              <div>
                <label className="label font-semibold">From Date</label>
                <input
                  type="date"
                  {...register("fromDate")}
                  className="input input-bordered w-full"
                />
                {errors.fromDate && <p className="text-error text-xs">{errors.fromDate.message}</p>}
              </div>

              {/* To Date */}
              <div>
                <label className="label font-semibold">To Date</label>
                <input
                  type="date"
                  {...register("toDate")}
                  className="input input-bordered w-full"
                />
                {errors.toDate && <p className="text-error text-xs">{errors.toDate.message}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="label font-semibold">Category</label>
                <select {...register("category")} className="select select-bordered w-full">
                  <option value="">Select Category</option>
                  {categoryList.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-error text-xs">{errors.category.message}</p>}
              </div>

              {/* Amount */}
              <div>
                <label className="label font-semibold">Amount</label>
                <input
                  type="number"
                  {...register("amount")}
                  className="input input-bordered w-full"
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="text-error text-xs">{errors.amount.message}</p>}
              </div>

              {/* Duration Type */}
              <div>
                <label className="label font-semibold">Duration Type</label>
                <select {...register("durationType")} className="select select-bordered w-full">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="custom">Custom</option>
                </select>
                {errors.durationType && (
                  <p className="text-error text-xs">{errors.durationType.message}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="label font-semibold">Notes</label>
                <textarea
                  {...register("notes")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Optional notes..."
                  rows={3}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isEdit ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/budget-period/list")}
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

export default AddEditBudgetPeriod;
