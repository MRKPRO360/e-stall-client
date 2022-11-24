import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
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

      toast.success(`Hey ${user?.displayName}, you're successfully logged in!`);

      console.log(user);
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

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      };
      if (user?.uid) {
        const res = await fetch("http://localhost:5000/users", config);
        const data = await res.json();
        if (data.insertedId) {
          navigate("/");
          toast.success(
            `Hey ${user?.displayName}, your account created successfully!`
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
