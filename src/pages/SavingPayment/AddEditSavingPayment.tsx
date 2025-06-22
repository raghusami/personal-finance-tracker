import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { SavingPayments } from "../../types/SavingPayments";
import {
  createSavingPayment,
  getSavingPaymentById,
  updateSavingPayment,
} from "../../services/savingpayments";
import PageHeader from "../../components/PageHeader";
import { showToast } from "../../components/ToastPortal";
import { CreditCardIcon } from "@heroicons/react/24/solid";

const schema = yup.object().shape({
  savingId: yup.string().required("Saving ID is required"),
  date: yup.string().required("Date is required"),
  amount: yup.number().positive().required("Amount is required"),
  status: yup
    .mixed()
    .oneOf(["Pending", "Completed", "Failed"])
    .required("Status is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  notes: yup.string().nullable(),
});

const AddEditSavingPayment = () => {
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
  } = useForm<Omit<SavingPayments, "id">>({
    resolver: yupResolver(schema),
    defaultValues: {
      savingId: "",
      date: "",
      amount: 0,
      status: "Pending",
      paymentMethod: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      loadPayment(id);
    }
  }, [id]);

  const loadPayment = async (id: string) => {
    try {
      setLoading(true);
      const res = await getSavingPaymentById(id);
      const data = res.data;
      Object.keys(data).forEach((key) => {
        setValue(key as keyof SavingPayments, data[key]);
      });
    } catch {
      showToast("error", "Failed to load payment.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: Omit<SavingPayments, "id">) => {
    try {
      if (isEdit && id) {
        await updateSavingPayment(id, formData);
        showToast("success", "Payment updated successfully!");
      } else {
        await createSavingPayment(formData);
        showToast("success", "Payment added successfully!");
      }
      navigate("/saving-payments/list");
    } catch {
      showToast("error", "Failed to save payment.");
    }
  };

  return (
    <div className="p-4">
      <PageHeader
        title={isEdit ? "Edit Saving Payment" : "Add Saving Payment"}
        icon={<CreditCardIcon className="w-6 h-6" />}
        breadcrumb={["Components", "Saving Payments", isEdit ? "Edit" : "Add"]}
      />
   <div className="flex justify-left">
      <div className="card bg-white border border-gray-200 shadow-sm">
        <div className="card-body">
          {loading ? (
            <p className="text-center text-sm text-gray-500">Loading form...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="label font-semibold">Saving ID</label>
                <input {...register("savingId")} className="input input-bordered w-full" />
                {errors.savingId && <p className="text-error text-xs mt-1">{errors.savingId.message}</p>}
              </div>

              <div>
                <label className="label font-semibold">Date</label>
                <input type="date" {...register("date")} className="input input-bordered w-full" />
                {errors.date && <p className="text-error text-xs mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <label className="label font-semibold">Amount</label>
                <input type="number" {...register("amount")} className="input input-bordered w-full" />
                {errors.amount && <p className="text-error text-xs mt-1">{errors.amount.message}</p>}
              </div>

              <div>
                <label className="label font-semibold">Status</label>
                <select {...register("status")} className="select select-bordered w-full">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
                {errors.status && <p className="text-error text-xs mt-1">{errors.status.message}</p>}
              </div>

                        <div>
            <label className="label font-semibold">Payment Method</label>
            <select {...register("paymentMethod")} className="select select-bordered w-full">
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Other">Other</option>
            </select>
            {errors.paymentMethod && (
                <p className="text-error text-xs mt-1">{errors.paymentMethod.message}</p>
            )}
            </div>


              <div className="md:col-span-2">
                <label className="label font-semibold">Notes</label>
                <textarea {...register("notes")} className="textarea textarea-bordered w-full" rows={3} />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}>
                  {isEdit ? "Update Payment" : "Save Payment"}
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

export default AddEditSavingPayment;
