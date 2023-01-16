import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../../Context/AuthContext";

export default function CategoryModal({ categoryData, setCategoryData }) {
  console.log("ok");
  const { name, price } = categoryData;
  const { currentuser } = useAuth();
  const handleBookingSubmit = async function (e) {
    if (!currentuser?.uid)
      return toast.error("Please login to book!", { duration: 2500 });
    e.preventDefault();
    const form = e.target;
    const purchaserName = currentuser?.displayName;
    const productId = categoryData._id;
    const email = currentuser?.email;
    const phone = form.phone.value;
    const meetingLocation = form.meeting.value;
    const price = categoryData.price;
    const img = categoryData.img;

    const book = {
      purchaserName,
      productId,
      email,
      phone,
      meetingLocation,
      price,
      img,
      name,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
      },
      body: JSON.stringify(book),
    };

    try {
      const res = await fetch(
        "https://e-stall-server-mrkpro360.vercel.app/bookings",
        config
      );
      const data = await res.json();

      if (data.insertedId) {
        setCategoryData({});
        toast.success(
          `Hey, ${currentuser?.displayName}, your booking confirmed`,
          { duration: 2500 }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor="my-modal-3"
            className="absolute flex justify-center w-8 h-8 text-2xl font-bold text-white bg-green-600 rounded-full cursor-pointer right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            You are booking for {name} buying with <br /> the price of ${price}
          </h3>
          <form className="mt-4 space-y-4" onSubmit={handleBookingSubmit}>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                defaultValue={currentuser?.displayName}
                readOnly
              />
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="w-full input input-bordered "
                defaultValue={currentuser?.email}
                readOnly
              />
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                className="w-full input input-bordered"
                placeholder="+88 01*********"
              />
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Meeting Location</span>
              </label>
              <input
                type="text"
                name="meeting"
                className="w-full input input-bordered"
                placeholder="Dhaka"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary-main">
              Confirm Book!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
