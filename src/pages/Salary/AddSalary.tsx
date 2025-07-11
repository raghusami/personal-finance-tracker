import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createIncome,
  getIncomeById,
  updateIncome,
} from "../../services/IncomeService";
import { showToast } from "../../components/ToastPortal";
import PageHeader from "../../components/PageHeader";
import { Income } from "../../types/Income";
import {
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

import DatePickerField from "../../components/DatePickerField";


const schema = yup.object().shape({
  incomeDate: yup.string().required("Date is required"),
  incomeSource: yup.string().required("Source is required"),
  amount: yup.number().positive().required("Amount is required"),
  currency: yup.string().required("Currency is required"),
  notes: yup.string().optional(),
  incomeType: yup.string().oneOf(["Primary", "Secondary", "Bonus", "Freelance"]),
});

const AddEditSalary = () => {
  const { id } = useParams(); // from /salary/edit/:id
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState<Income | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Income, "id">>({
    resolver: yupResolver(schema),
    defaultValues: {
      incomeDate: "",
      incomeSource: "Salary",
      amount: 0,
      notes: "",
      currency: "INR",
      incomeType: "Primary",
    },
  });

  // Load existing data if editing
  useEffect(() => {
    if (isEdit && id) {
      loadSalary(id);
    }
  }, [id]);

  const loadSalary = async (id: string) => {
    try {
      setLoading(true);
      const response = await getIncomeById(id);
      const data = response.data.responseData;
      setExistingData(data); // ✅ save to state
      // Set form values for edit
      Object.keys(data).forEach((key) => {
        if (key in data) {
          setValue(key as keyof Income, data[key]);
        }
      });
    } catch (error) {
      showToast("error", "Failed to load salary details.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: Omit<Income, "id">) => {
    try {
  
      // Format incomeDate to yyyy-MM-dd
    const formattedData = {
      ...formData,
      incomeDate: formData.incomeDate
        ? new Date(formData.incomeDate).toISOString().split("T")[0]
        : "",
    };

      if (isEdit && id) {
        await updateIncome(id, formattedData);
        showToast("success", "Salary updated successfully!");
      } else {
        await createIncome(formattedData);
        showToast("success", "Salary added successfully!");
      }

      navigate("/salary/list");
    } catch (error) {
      showToast("error", "Failed to save salary.");
    }
  };

return (
  <div className="flex flex-col gap-2 p-4">
    <PageHeader
      title={isEdit ? "Edit Income Entry" : "Add Income Entry"}
      icon={<CurrencyRupeeIcon className="w-6 h-6" />}
      breadcrumb={["Components", "Income", isEdit ? "Edit Income" : "Add Income"]}
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
              {/* Date */}
                  <DatePickerField
              label="Date"
              name="incomeDate"
              setValue={setValue}
              errors={errors}
             defaultValue={existingData?.incomeDate}

            />

              {/* Source of Income */}
              <div>
                <label className="label font-semibold text-base-content">Source of Income</label>
                <select {...register("incomeSource")} className="select select-bordered w-full">
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Gift">Gift</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Amount & Currency */}
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
                    <p className="text-error text-xs mt-1">{errors.amount.message}</p>
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

              {/* Income Type */}
              <div>
                <label className="label font-semibold text-base-content">Income Type</label>
                <select {...register("incomeType")} className="select select-bordered w-full">
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Bonus">Bonus</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="label font-semibold text-base-content">Notes</label>
                <textarea
                  {...register("notes")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Any additional comments..."
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
                  {isEdit ? "Update Entry" : "Save Entry"}
                </button>
                <button
                  type="button"
                  onClick={() => reset()}
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

export default AddEditSalary;
