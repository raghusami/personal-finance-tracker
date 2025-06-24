import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createExpense,
  getExpenseById,
  updateExpense,
} from "../../services/expenseService";
import { showToast } from "../../components/ToastPortal";
import PageHeader from "../../components/PageHeader";
import { Expense } from "../../types/Expense";
import {
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import categoryList from "../../data/expenseCategories.json";

const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  category: yup.string().required("Category is required"),
  subcategory: yup.string().optional(),
  description: yup.string().required("Description is required"),
  amount: yup.number().positive().required("Amount is required"),
  currency: yup.string().required("Currency is required"),
});

const AddEditExpense = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Expense, "id">>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      category: "",
      subcategory: "",
      description: "",
      amount: 0,
      currency: "INR",
    },
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    if (isEdit && id) {
      loadExpense(id);
    }
  }, [id]);

  const loadExpense = async (id: string) => {
    try {
      setLoading(true);
      const res = await getExpenseById(id);
      const data = res.data;
      Object.keys(data).forEach((key) => {
        setValue(key as keyof Expense, data[key]);
      });
    } catch {
      showToast("error", "Failed to load expense details.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: Omit<Expense, "id">) => {
    try {
      if (isEdit && id) {
        await updateExpense(id, { ...formData, type: "Expense" });
        showToast("success", "Expense updated successfully!");
      } else {
        await createExpense({ ...formData, type: "Expense" });
        showToast("success", "Expense added successfully!");
      }
      navigate("/expenses/list");
    } catch {
      showToast("error", "Failed to save expense.");
    }
  };

return (
  <div className="flex flex-col gap-2 p-4">
    <PageHeader
      title={isEdit ? "Edit Expense Entry" : "Add Expense Entry"}
      icon={<CreditCardIcon className="w-6 h-6" />}
      breadcrumb={["Components", "Expense", isEdit ? "Edit Expense" : "Add Expense"]}
    />

    <div className="flex justify-left">
      <div className="card bg-base-100 border border-base-200 shadow-sm w-full max-w-2xl">
        <div className="card-body">
          {loading ? (
            <p className="text-center text-sm text-base-content opacity-60">Loading form...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              {/* Date */}
              <div>
                <label className="label font-semibold text-base-content">Date</label>
                <input
                  type="date"
                  {...register("date")}
                  className="input input-bordered w-full"
                />
                {errors.date && (
                  <p className="text-error text-xs">{errors.date.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="label font-semibold text-base-content">Category</label>
                <select {...register("category")} className="select select-bordered w-full">
                  <option value="">Select Category</option>
                  {categoryList.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-error text-xs">{errors.category.message}</p>
                )}
              </div>

              {/* Subcategory */}
              {selectedCategory && (
                <div>
                  <label className="label font-semibold text-base-content">Subcategory</label>
                  <select {...register("subcategory")} className="select select-bordered w-full">
                    <option value="">Select Subcategory</option>
                    {categoryList
                      .find((cat) => cat.category === selectedCategory)
                      ?.subcategories.map((sub) => (
                        <option key={sub}>{sub}</option>
                      ))}
                  </select>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="label font-semibold text-base-content">Description</label>
                <input
                  type="text"
                  {...register("description")}
                  className="input input-bordered w-full"
                  placeholder="e.g. Monthly electricity bill"
                />
                {errors.description && (
                  <p className="text-error text-xs">{errors.description.message}</p>
                )}
              </div>

              {/* Amount + Currency */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="label font-semibold text-base-content">Amount</label>
                  <input
                    type="number"
                    {...register("amount")}
                    className="input input-bordered w-full"
                    placeholder="Enter amount"
                  />
                  {errors.amount && (
                    <p className="text-error text-xs">{errors.amount.message}</p>
                  )}
                </div>
                <div>
                  <label className="label font-semibold text-base-content">Currency</label>
                  <select {...register("currency")} className="select select-bordered w-full">
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                >
                  {isEdit ? "Update Entry" : "Save Entry"}
                </button>
                <button type="button" onClick={() => reset()} className="btn btn-outline">
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

export default AddEditExpense;
