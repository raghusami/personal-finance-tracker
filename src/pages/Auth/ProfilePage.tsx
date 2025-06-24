// src/pages/ProfilePage.tsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showToast } from "../../components/ToastPortal";
import PageHeader from "../../components/PageHeader";
import { UserProfile } from "../../types/UserProfile";
import { updateUser, getUserById } from "../../services/UserService";
import { UserIcon } from "@heroicons/react/24/solid";

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  mobileNumber: yup.string().required("Mobile number is required"),
  preferredCurrency: yup.string().required("Currency is required"),
});

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.id) {
      setUserId(user.id);
      loadUser(user.id);
    }
  }, []);

  const loadUser = async (id: string) => {
    try {
      setLoading(true);
      const res = await getUserById(id);
      const data = res.data;
      Object.keys(data).forEach((key) => {
        setValue(key as keyof UserProfile, data[key]);
      });
    } catch {
      showToast("error", "Failed to load user details.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData: UserProfile) => {
    try {
      await updateUser(userId, formData);
      showToast("success", "Profile updated successfully!");
    } catch {
      showToast("error", "Failed to update profile.");
    }
  };

  return (
  <div className="flex flex-col gap-2 p-4">
    <PageHeader
      title="Edit Profile"
      icon={<UserIcon className="w-6 h-6" />}
      breadcrumb={["Account", "Edit Profile"]}
    />

    <div className="flex justify-left">
      <div className="card bg-base-100 border border-base-200 shadow-sm w-full max-w-3xl">
        <div className="card-body">
          {loading ? (
            <p className="text-center text-sm text-base-content/60">Loading profile...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              {/* First Name + Last Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label font-semibold text-base-content">First Name</label>
                  <input
                    {...register("firstname")}
                    className="input input-bordered w-full"
                    placeholder="Your first name"
                  />
                  {errors.firstname && (
                    <p className="text-error text-xs mt-1">{errors.firstname.message}</p>
                  )}
                </div>
                <div>
                  <label className="label font-semibold text-base-content">Last Name</label>
                  <input
                    {...register("lastname")}
                    className="input input-bordered w-full"
                    placeholder="Your last name"
                  />
                  {errors.lastname && (
                    <p className="text-error text-xs mt-1">{errors.lastname.message}</p>
                  )}
                </div>
              </div>

              {/* Email + Mobile */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label font-semibold text-base-content">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-error text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="label font-semibold text-base-content">Mobile Number</label>
                  <input
                    {...register("mobileNumber")}
                    className="input input-bordered w-full"
                    placeholder="Phone number"
                  />
                  {errors.mobileNumber && (
                    <p className="text-error text-xs mt-1">{errors.mobileNumber.message}</p>
                  )}
                </div>
              </div>

              {/* Currency */}
              <div>
                <label className="label font-semibold text-base-content">Preferred Currency</label>
                <select
                  {...register("preferredCurrency")}
                  className="select select-bordered w-full"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              {/* Profile Image */}
              <div>
                <label className="label font-semibold text-base-content">Upload Profile Image</label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  disabled
                />
                <p className="text-sm text-base-content/50 mt-1">(Image upload coming soon...)</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                >
                  Update Profile
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

export default ProfilePage;
