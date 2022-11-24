import { FadeLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FadeLoader color="#22c55e" />
    </div>
  );
}
