import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Investment } from "../../types/Investment";
import {
  createInvestment,
  getInvestmentById,
  updateInvestment,
} from "../../services/investmentService";

import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import { BanknotesIcon } from "@heroicons/react/24/solid";

// Validation schema
const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  investmentType: yup.string().required("Investment type is required"),
  platform: yup.string().required("Platform is required"),
  amount: yup.number().positive().required("Investment amount is required"),
  currentValue: yup.number().min(0, "Current value must be >= 0"),
  status: yup
    .mixed<"Active" | "Exited">()
    .oneOf(["Active", "Exited"])
    .required("Status is required"),
  notes: yup.string().nullable(),
});

const AddEditInvestment = () => {
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
  } = useForm<Omit<Investment, "id">>({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      investmentType: "",
      platform: "",
      amount: 0,
      currentValue: 0,
      status: "Active",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadInvestment(id);
    }
  }, [id]);

  const loadInvestment = async (id: string) => {
    try {
      setLoading(true);
      const res = await getInvestmentById(id);
      const data = res.data;
      Object.keys(data).forEach((key) => {
        setValue(key as keyof Investment, data[key]);
      });
    } catch {
      showToast("error", "Failed to load investment data.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: Omit<Investment, "id">) => {
    try {
      if (isEdit && id) {
        await updateInvestment(id, formData);
        showToast("success", "Investment updated successfully!");
      } else {
        await createInvestment(formData);
        showToast("success", "Investment added successfully!");
      }
      navigate("/investments/list");
    } catch {
      showToast("error", "Failed to save investment.");
    }
  };

  return (
    <div className="p-4">
      <PageHeader
        title={isEdit ? "Edit Investment" : "Add Investment"}
        icon={<BanknotesIcon className="w-6 h-6" />}
        breadcrumb={["Components", "Investments", isEdit ? "Edit" : "Add"]}
      />
      <div className="flex justify-left">
      <div className="card bg-white border border-gray-200 shadow-sm">
        <div className="card-body">
          {loading ? (
            <p className="text-center text-sm text-gray-500">Loading form...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="label font-semibold">Date</label>
                <input type="date" {...register("date")} className="input input-bordered w-full" />
                {errors.date && <p className="text-error text-xs mt-1">{errors.date.message}</p>}
              </div>

                        <div>
            <label className="label font-semibold">Investment Type</label>
            <select {...register("investmentType")} className="select select-bordered w-full">
                <option value="">-- Select Type --</option>
                <option value="Stocks">Stocks</option>
                <option value="Mutual Funds">Mutual Funds</option>
                <option value="Gold">Gold</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
                <option value="Crypto">Crypto</option>
                <option value="Others">Others</option>
            </select>
            {errors.investmentType && <p className="text-error text-xs mt-1">{errors.investmentType.message}</p>}
            </div>

                <div>
                <label className="label font-semibold">Platform</label>
                <select {...register("platform")} className="select select-bordered w-full">
                    <option value="">-- Select Platform --</option>
                    <option value="Zerodha">Zerodha</option>
                    <option value="Groww">Groww</option>
                    <option value="Upstox">Upstox</option>
                    <option value="Coin by Zerodha">Coin</option>
                    <option value="Bank">Bank</option>
                    <option value="Others">Others</option>
                </select>
                {errors.platform && <p className="text-error text-xs mt-1">{errors.platform.message}</p>}
                </div>


              <div>
                <label className="label font-semibold">Invested Amount</label>
                <input type="number" {...register("amount")} className="input input-bordered w-full" />
                {errors.amount && <p className="text-error text-xs mt-1">{errors.amount.message}</p>}
              </div>

              <div>
                <label className="label font-semibold">Current Value</label>
                <input type="number" {...register("currentValue")} className="input input-bordered w-full" />
                {errors.currentValue && <p className="text-error text-xs mt-1">{errors.currentValue.message}</p>}
              </div>

              <div>
                <label className="label font-semibold">Status</label>
                <select {...register("status")} className="select select-bordered w-full">
                  <option value="Active">Active</option>
                  <option value="Exited">Exited</option>
                </select>
                {errors.status && <p className="text-error text-xs mt-1">{errors.status.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold">Notes</label>
                <textarea {...register("notes")} className="textarea textarea-bordered w-full" rows={3} />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}>
                  {isEdit ? "Update Investment" : "Save Investment"}
                </button>
                <button type="button" onClick={() => reset()} className="btn">
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

export default AddEditInvestment;
