import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import SetAuthToken from "../../Utils/SetAuthToken";
import SaveToDb from "../../Utils/SaveToDb";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { login, googleLogin, logout } = useAuth();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async function (data) {
    try {
      setLoginError("");
      const { email, password } = data;
      const result = await login(email, password);
      const user = result.user;

      if (user?.uid) {
        const jwtData = await SetAuthToken(user, logout);

        if (jwtData.token) {
          navigate(from, { replace: true });
          toast.success(
            `Hey ${user?.displayName}, you're successfully logged in :)`,
            { duration: 2500 }
          );
        }
      }
    } catch (err) {
      setLoginError(err.message);
      console.error(err);
    }
  };

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
        Login to your account
      </h1>
      <div className="p-4 rounded-md shadow-md shadow-green-200">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 ">
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
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          {loginError && <span className="text-red-500">{loginError}</span>}
          <button className="w-full btn-primary-main" type="submit">
            Login
          </button>
          <span className="block mt-1 font-semibold">
            New To E-Stall{" "}
            <Link
              className="text-green-500 underline decoration-green-400 decoration-2"
              to="/signup"
            >
              Signup
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
