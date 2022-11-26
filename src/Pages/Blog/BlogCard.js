export default function BlogCard({ blogCard }) {
  return (
    <div className="p-4 rounded shadow shadow-green-100">
      <h2 className="mb-5 text-lg font-semibold text-gray-700 sm:text-2xl ">
        {blogCard.question}
      </h2>
      <p className="text-gray-500 md:font-medium">{blogCard.ans}</p>
    </div>
  );
}
