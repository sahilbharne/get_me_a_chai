"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'


const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getData()
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const getData = async () => {
    let u = await fetchuser(session.user.name)
    setForm(u)
  }

  const handleSubmit = async (e) => {
    
    let a = await updateProfile(e, session.user.name)
    toast('Profile Updated', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
  };

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
    <div className="container mx-auto py-5 px-6">
      <div className="text-center py-3 text-2xl font-bold">
        Welcome to your Dashboard
      </div>

      <form action={handleSubmit} className="mx-auto w-2xl max-w-2xl">
        {/** Name */}
        <InputField
          label="Name"
          name="name"
          value={form.name}
          handleChange={handleChange}
        />

        {/** Email */}
        <InputField
          label="Email"
          name="email"
          value={form.email}
          handleChange={handleChange}
        />

        {/** Username */}
        <InputField
          label="Username"
          name="username"
          value={form.username}
          handleChange={handleChange}
        />

        {/** Profile Picture */}
        <InputField
          label="Profile Picture"
          name="profilepic"
          value={form.profilepic}
          handleChange={handleChange}
        />

        {/** Cover Picture */}
        <InputField
          label="Cover Picture"
          name="coverpic"
          value={form.coverpic}
          handleChange={handleChange}
        />

        {/** Razorpay ID */}
        <InputField
          label="Razorpay Id"
          name="razorpayId"
          value={form.razorpayId}
          handleChange={handleChange}
        />

        {/** Razorpay Secret */}
        <InputField
          label="Razorpay Secret"
          name="razorpaySecret"
          value={form.razorpaySecret}
          handleChange={handleChange}
        />

        <div className="py-4">
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

// Reusable input field component
const InputField = ({ label, name, value, handleChange }) => (
  <div className="py-2">
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
    />
  </div>
);

export default Dashboard;

