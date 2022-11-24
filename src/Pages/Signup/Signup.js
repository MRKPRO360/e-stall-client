import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSignup = async function (data) {
    try {
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async function () {
    try {
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className=" w-96 mx-auto">
      <h1 className="text-center text-2xl text-black font-semibold mb-8">
        Signup
      </h1>
      <div className="shadow-md shadow-green-200 p-4 rounded-md">
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4 ">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="name"
              placeholder="your name address"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="your email address"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="your password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <button className="btn-primary-main w-full" type="submit">
            Signup
          </button>
          <span className="font-semibold mt-1 block">
            Already have an account{" "}
            <Link
              className="text-green-500 underline decoration-green-400 decoration-2"
              to="/Login"
            >
              Login
            </Link>{" "}
            Now
          </span>
        </form>
        <div className="divider">OR</div>
        <button
          className="btn-primary-outline btn-primary-outline-thick w-full"
          onClick={handleGoogleLogin}
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
}
