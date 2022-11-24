import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SetAuthToken from "../../Utils/SetAuthToken";
import SaveToDb from "../../Utils/SaveToDb";
import toast from "react-hot-toast";

export default function Login() {
  const { signup, googleLogin, logout } = useAuth();
  const [signupError, setSignupError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignup = async function (data) {
    try {
      setSignupError("");

      const { name, email, password, role } = data;
      const result = await signup(email, password, name);
      const user = result.user;
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role,
      };

      if (user?.uid) {
        const jwtData = await SetAuthToken(user, logout);

        if (jwtData.token) {
          await SaveToDb(userInfo);
          navigate("/");
          toast.success(`Hey ${name}, your account created successfully!`, {
            duration: 2500,
          });
        }
      }
    } catch (err) {
      setSignupError(err.message);
      console.error(err);
    }
  };

  // const handleGoogleLogin = async function () {
  //   try {
  //     const result = await googleLogin();

  //     const user = result.user;

  //     const userInfo = {
  //       name: user?.displayName,
  //       email: user?.email,
  //       role: "buyer",
  //     };

  //     const config = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userInfo),
  //     };
  //     if (user?.uid) {
  //       const res = await fetch("http://localhost:5000/users", config);
  //       const data = await res.json();
  //       if (data.insertedId) {
  //         navigate("/");
  //         toast.success(
  //           `Hey ${user?.displayName}, your account created successfully!`,
  //           { duration: 2500 }
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleGoogleLogin = async function () {
    try {
      const result = await googleLogin();

      const user = result.user;

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role: "buyer",
      };

      if (user?.uid) {
        const jwtData = await SetAuthToken(user, logout);

        if (jwtData.token) {
          const data = await SaveToDb(userInfo);

          navigate(from, { replace: true });
          !data.message
            ? toast.success(
                `Hey ${user?.displayName}, your account created successfully!`,
                { duration: 2500 }
              )
            : toast.success(
                `Hey ${user?.displayName}, you're successfully logged in :)`,
                { duration: 2500 }
              );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-96">
      <h1 className="mb-8 text-2xl font-semibold text-center text-black">
        Signup
      </h1>
      <div className="p-4 rounded-md shadow-md shadow-green-200">
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4 ">
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Full Name</span>
            </label>
            <input
              type="name"
              placeholder="your name address"
              className="w-full input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="your email address"
              className="w-full input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="your password"
              className="w-full input input-bordered"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or long",
                },
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="w-full form-control">
            <label className="label">
              <span className="font-semibold label-text">Signup as</span>
            </label>
            <select
              {...register("role")}
              className="w-full max-w-xs select select-bordered"
            >
              <option selected value="buyer">
                A buyer
              </option>
              <option value="seller">A seller</option>
            </select>
          </div>
          {signupError && <span className="text-red-500">{signupError}</span>}
          <button className="w-full btn-primary-main" type="submit">
            Signup
          </button>
          <span className="block mt-1 font-semibold">
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
          className="w-full btn-primary-outline btn-primary-outline-thick"
          onClick={handleGoogleLogin}
        >
          Continue With Google
        </button>
      </div>
    </div>
  );
}
