export default function AdvertisedItem({ product }) {
  const {
    img,
    location,
    name: title,
    price,
    originalPrice,
    postedDate,
    sellerName,
    specification,
    yearsOfUse,
    id: brand,
  } = product;
  return (
    <div className="shadow-md shadow-green-200 card w-96 bg-base-100">
      <figure>
        <img
          className="object-cover object-top w-full h-80"
          src={img}
          alt={brand}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="my-5 space-y-2 text-base font-semibold">
          <p>Manufacturer Name: {brand}</p>
          <p>Specification: {specification}</p>
          <p>Original Price: ${originalPrice}</p>
          <p>Buying Year: {yearsOfUse}</p>
          <p>Posted Time: {new Date(postedDate).toDateString()}</p>
          <p>Seller Name: {sellerName}</p>
          <p>Location: {location}</p>
          <p>Current Price: ${price}</p>
        </div>
      </div>
    </div>
  );
}
