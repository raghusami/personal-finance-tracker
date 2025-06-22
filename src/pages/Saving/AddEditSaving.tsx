import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Saving } from "../../types/Saving";
import { createSaving, getSavingById, updateSaving } from "../../services/savingsService";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";

import { BanknotesIcon } from "@heroicons/react/24/solid";
import { createSavingPayment } from "../../services/savingpayments"; // Assuming this is the correct path


// ✅ Category list
const categoryOptions = [
  "SIP",
  "FD (Fixed Deposit)",
  "RD (Recurring Deposit)",
  "Cash",
  "Chit",
  "Bank",
  "Emergency Fund",
  "Gold",
  "PPF",
  "NPS",
  "Mutual Fund (non-SIP)",
  "Vacation",
  "Education",
  "Retirement",
  "Wedding",
  "Home Renovation",
  "Vehicle Purchase",
  "Health Expenses",
  "Gadgets",
  "Travel",
  "Others"
];

// ... [existing imports]
const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  title: yup.string().required("Title is required"),
  amount: yup.number().positive("Amount must be positive").required("Amount is required"),
  currency: yup.string().required("Currency is required"),
  savingType: yup.string().oneOf(["Recurring", "One-time"]),
  category: yup.string().required("Category is required"),

  // 🎯 New validations
  interestAmount: yup.number().positive("Interest must be positive").nullable(),
  numberOfMonths: yup.number().positive("Must be more than 0").nullable(),
  vendorName: yup.string().nullable(),

  goalName: yup.string(),
  targetAmount: yup.number().positive().nullable(),
  interestRate: yup.number().positive().nullable(),
  targetDate: yup.string(),
  maturityDate: yup.string(),
  account: yup.string(),
  notes: yup.string(),
});


const AddEditSaving = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Saving, "id">>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      title: "", 
      amount: 0,
      currency: "INR",
      savingType: "Recurring",
      category: "",
      account: "",
      goalName: "",
      targetAmount: undefined,
      targetDate: "",
      interestRate: undefined,
      maturityDate: "",
      notes: "",
     interestAmount: undefined,
     numberOfMonths: undefined,
     vendorName: "",
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadSaving(id);
    }
  }, [id]);

  const loadSaving = async (id: string) => {
    try {
      setLoading(true);
      const res = await getSavingById(id);
      const data = res.data;
      Object.keys(data).forEach((key) => {
        if (key in data) {
          setValue(key as keyof Saving, data[key]);
        }
      });
    } catch (error) {
      showToast("error", "Failed to load saving details.");
    } finally {
      setLoading(false);
    }
  };

    const onSubmit = async (formData: Omit<Saving, "id">) => {
  try {
    let savingId: number | string;

    if (isEdit && id) {
      await updateSaving(id, formData);
      savingId = id;
      showToast("success", "Saving updated successfully!");
    } else {
      const savingRes = await createSaving(formData);
      savingId = savingRes.data.id;
      showToast("success", "Saving added successfully!");
    }

    // ✅ Add SavingPayments for Recurring Type
    if (formData.savingType === "Recurring" && formData.numberOfMonths && savingId) {
      const startDate = new Date(formData.date);

      for (let i = 0; i < formData.numberOfMonths; i++) {
        const paymentDate = new Date(startDate);
        paymentDate.setMonth(startDate.getMonth() + i);

        const paymentData = {
          savingId: savingId,
          date: paymentDate.toISOString().split("T")[0],
          amount: formData.amount,
          status: "Pending" as const,
          paymentMethod: "Bank Transfer",
          notes: `Auto-generated for month ${i + 1}`,
        };

        await createSavingPayment(paymentData);
      }

      showToast("success", `${formData.numberOfMonths} monthly payments created.`);
    }

    navigate("/savings/list");
  } catch (error) {
    showToast("error", "Failed to save saving entry.");
  }
};
  return (
    <div className="flex flex-col gap-2 p-4">
      <PageHeader
        title={isEdit ? "Edit Saving Entry" : "Add Saving Entry"}
        icon={<BanknotesIcon className="w-6 h-6" />}
        breadcrumb={["Components", "Savings", isEdit ? "Edit Saving" : "Add Saving"]}
      />

      <div className="flex justify-left">
        <div className="card bg-white border border-gray-200 shadow-sm">
          <div className="card-body">
            {loading ? (
              <p className="text-center text-sm text-gray-500">Loading form...</p>
            ) : (
<form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-3">
  {/* Date */}
  <div>
    <label className="label font-semibold">Start Date</label>
    <input type="date" {...register("date")} className="input input-bordered w-full" />
    {errors.date && <p className="text-error text-xs mt-1">{errors.date.message}</p>}
  </div>

  {/* Title */}
  <div>
    <label className="label font-semibold">Title</label>
    <input type="text" {...register("title")} className="input input-bordered w-full" />
    {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
  </div>

  {/* Amount */}
  <div>
    <label className="label font-semibold">Amount</label>
    <input type="number" {...register("amount")} className="input input-bordered w-full" />
    {errors.amount && <p className="text-error text-xs mt-1">{errors.amount.message}</p>}
  </div>

  {/* Currency */}
  <div>
    <label className="label font-semibold">Currency</label>
    <select {...register("currency")} className="select select-bordered w-full">
      <option value="INR">INR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  </div>

  {/* Saving Type */}
  <div>
    <label className="label font-semibold">Saving Type</label>
    <select {...register("savingType")} className="select select-bordered w-full">
      <option value="Recurring">Recurring</option>
      <option value="One-time">One-time</option>
    </select>
  </div>

  {/* Category */}
  <div>
    <label className="label font-semibold">Category</label>
    <select {...register("category")} className="select select-bordered w-full">
      <option value="">-- Select Category --</option>
      {categoryOptions.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    {errors.category && <p className="text-error text-xs mt-1">{errors.category.message}</p>}
  </div>

  {/* Goal Name */}
  <div>
    <label className="label font-semibold">Goal Name (optional)</label>
    <input type="text" {...register("goalName")} className="input input-bordered w-full" />
  </div>

  {/* Target Amount */}
  <div>
    <label className="label font-semibold">Target Amount</label>
    <input type="number" {...register("targetAmount")} className="input input-bordered w-full" />
  </div>

  {/* Target Date */}
  <div>
    <label className="label font-semibold">Target Date</label>
    <input type="date" {...register("targetDate")} className="input input-bordered w-full" />
  </div>

  {/* Interest Rate */}
  <div>
    <label className="label font-semibold">Interest Rate (%)</label>
    <input type="number" {...register("interestRate")} className="input input-bordered w-full" />
  </div>

  {/* Maturity Date */}
  <div>
    <label className="label font-semibold">Maturity Date</label>
    <input type="date" {...register("maturityDate")} className="input input-bordered w-full" />
  </div>

  {/* Account */}
  <div>
    <label className="label font-semibold">Account (optional)</label>
    <input type="text" {...register("account")} className="input input-bordered w-full" />
  </div>

  {/* Interest Amount */}
  <div>
    <label className="label font-semibold">Interest Amount</label>
    <input type="number" {...register("interestAmount")} className="input input-bordered w-full" />
  </div>

  {/* Number of Months */}
  <div>
    <label className="label font-semibold">Number of Months</label>
    <input type="number" {...register("numberOfMonths")} className="input input-bordered w-full" />
  </div>

  {/* Vendor Name */}
  <div>
    <label className="label font-semibold">Vendor Name</label>
    <input type="text" {...register("vendorName")} className="input input-bordered w-full" />
  </div>
 {/* Notes */}
  <div className="md:col-span-3">
    <label className="label font-semibold">Notes</label>
    <textarea {...register("notes")} className="textarea textarea-bordered w-full" rows={3} />
  </div>
  {/* Buttons */}
  <div className="md:col-span-3 flex justify-end gap-3 pt-4">
    <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}>
      {isEdit ? "Update Entry" : "Save Entry"}
    </button>
    <button type="button" onClick={() => reset()} className="btn btn-active">
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

export default AddEditSaving;
