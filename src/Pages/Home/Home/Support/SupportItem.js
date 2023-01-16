export default function SupportItem({ img, text, bg }) {
  return (
    <div className="text-center p-4 rounded-sm shadow-md shadow-green-100">
      <img src={img} alt="support" />
      <button className={`mt-6 p-1 font-semibold rounded-md ${bg}`}>
        {text}
      </button>
    </div>
  );
}
