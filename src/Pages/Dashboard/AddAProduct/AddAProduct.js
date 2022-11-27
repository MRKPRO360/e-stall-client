import { useForm } from "react-hook-form";
import { useAuth } from "../../../Context/AuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function AddAProduct() {
  const { currentuser } = useAuth();
  const sellerEmail = currentuser?.email;
  const sellerName = currentuser?.displayName;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddProduct = async function (data) {
    const {
      manufacturerName,
      yearsOfPurchase,
      yearsOfUse,
      productName,
      conditionType,
      price,
      originalPrice,
      meetingLocation,
      upload,
      specification,
    } = data;

    const image = upload[0];
    const formData = new FormData();
    formData.append("image", image);

    const config = {
      method: "POST",
      body: formData,
    };

    try {
      const imgBbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageHostKey}`,
        config
      );

      const imgBbData = await imgBbRes.json();

      if (imgBbData.success) {
        const product = {
          sellerEmail,
          sellerName,
          id: manufacturerName.toLowerCase(),
          yearsOfPurchase,
          yearsOfUse,
          name: productName,
          verified: false,
          sold: false,
          conditionType: conditionType,
          price: price,
          originalPrice: originalPrice,
          location: meetingLocation,
          img: imgBbData.data.url,
          postedDate: new Date().toUTCString(),
          specification,
        };

        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
          },
          body: JSON.stringify(product),
        };

        const res = await fetch(
          "https://e-stall-server-mrkpro360.vercel.app/products",
          config
        );
        const data = await res.json();

        if (data.acknowledged) {
          navigate("/dashboard/myProducts");
          toast.success(
            `Hey ${sellerName}!, ${productName} added successfully`,
            { duration: 2500 }
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-auto">
      <h1 className="mb-8 text-2xl font-semibold text-center text-black">
        Add A Product
      </h1>
      <form className="mt-8" onSubmit={handleSubmit(handleAddProduct)}>
        <div className="gap-8 sm:flex">
          <div className="w-full sm:w-1/2">
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <span className="text-red-500">Product Name is required</span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Manufacturer Name</span>
              </label>
              <input
                type="text"
                placeholder="dell,hp, or lenovo only"
                className="w-full input input-bordered "
                {...register("manufacturerName", { required: true })}
              />
              {errors.manufacturerName && (
                <span className="text-red-500">
                  Manufacturer Name is required
                </span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Specification</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                {...register("specification", { required: true })}
              />
              {errors.specification && (
                <span className="text-red-500">Specification is required</span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Original Price</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                {...register("originalPrice", { required: true })}
              />
              {errors.originalPrice && (
                <span className="text-red-500">Original price is required</span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Condition Type</span>
              </label>
              <select
                {...register("conditionType")}
                className="w-full select select-bordered"
              >
                <option selected value="good">
                  Good
                </option>
                <option value="fair">Fair</option>
                <option value="excellent">Excellent</option>
              </select>
            </div>
          </div>

          <div className="w-full sm:flex-1 sm:space-y-1">
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Current Price</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-red-500">Price is required</span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Years of purchase</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                {...register("yearsOfPurchase", { required: true })}
              />
              {errors.yearsOfPurchase && (
                <span className="text-red-500">
                  Years of purchase is required
                </span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Years of use</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered "
                {...register("yearsOfUse", { required: true })}
              />
              {errors.yearsOfUse && (
                <span className="text-red-500">
                  Years of purchase is required
                </span>
              )}
            </div>
            <div className="w-full form-control">
              <label className="mb-1 text-base font-semibold">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                className="w-full input input-bordered"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="text-red-500">Phone is required</span>
              )}
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
                {...register("meetingLocation", { required: true })}
              />
              {errors.meetingLocation && (
                <span className="text-red-500">
                  Meeting location is required
                </span>
              )}
            </div>
            <div className="relative w-full form-control">
              <label className="cursor-pointer label" htmlFor="uploadImage">
                <span className="text-base font-semibold ">Upload Image</span>
              </label>

              <label htmlFor="uploadImage" className="absolute cursor-pointer">
                <FaCloudUploadAlt className="absolute text-3xl text-green-500 top-12 left-5" />
                <span className="absolute block top-12 left-16 ">Upload</span>
              </label>

              <input
                type="file"
                name="uploadImage"
                id="uploadImage"
                placeholder="Enter Title"
                className="invisible w-full max-w-lg input input-bordered"
                {...register("upload", { required: true })}
              />
              {errors?.upload && (
                <p className="text-red-500">Image must be provided</p>
              )}
            </div>
          </div>
        </div>

        <div className="h-16">
          <button type="submit" className="w-full mb-10 btn-primary-main">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
