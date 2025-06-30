"use client";
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""});
  const [currentuser, setCurrentuser] = useState(null);
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [username]); // refetch if username changes

  useEffect(() => {
    if (searchParams.get("payment") === "true") {
      toast('Thanks for your donation', {
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
    }
    router.push(`/${username}`);
  }, [searchParams, username, router]);

  const getData = async () => {
    try {
      const u = await fetchuser(username);
      setCurrentuser(u);
      const dbpayments = await fetchpayments(username);
      setPayments(dbpayments);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const pay = async (amount) => {
    try {
      const a = await initiate(amount, username, paymentform);
      const orderId = a.id;

      const options = {
        key: currentuser.razorpayId,
        amount,
        currency: "INR",
        name: "Get Me A Chai",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: paymentform.name || "Anonymous",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment could not be initiated");
    }
  };

  // show loading state until currentuser is loaded
  if (!currentuser) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} theme="light" />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        {currentuser.coverpic && (
          <img className="object-cover w-full h-48 md:h-[350px]" src={currentuser.coverpic} alt="cover" />
        )}
        <div className="absolute -bottom-16 right-[32%] md:right-[46%] rounded-full">
          {currentuser.profilepic && (
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-white"
              src={currentuser.profilepic}
              alt="avatar"
            />
          )}
        </div>
      </div>

      <div className="info flex  justify-center items-center my-24 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let's help {username} to get a chai</div>
        <div className="text-slate-400">
          {payments.length} Payments · {currentuser.name} has raised ₹
          {payments.reduce((a, b) => a + b.amount, 0)}
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-700 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Top 7 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length === 0 && <li>No Payments Yet</li>}
              {payments.map((p, i) => (
                <li key={p._id || i} className="my-4 flex gap-2 items-center">
                  <img width={33} src="avatar.gif" alt="user avatar" />
                  <span>
                    {p.name} donated <span className="font-bold">{p.amount}</span> with message "{p.message}"
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="makePayment w-full md:w-1/2 bg-slate-700 rounded-lg text-white p-5">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                name="name"
                value={paymentform.name || ''}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                name="message"
                value={paymentform.message || ''}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                name="amount"
                value={paymentform.amount || ''}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}
                onClick={() => pay(Number(paymentform.amount) * 100) }
                className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${
  paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1
    ? 'bg-slate-600 cursor-not-allowed'
    : 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4'
}`}

              >
                Pay
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
              <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
              <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
