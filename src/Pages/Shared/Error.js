import React from "react";
import { useRouteError } from "react-router-dom";
import img from "../../image/broken-heart.webp";
export default function Error() {
  const error = useRouteError();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white font-semibold"
      style={{
        backgroundImage: `linear-gradient(to right bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${img})`,
      }}
    >
      <h1 className="text-6xl">Oops!</h1>
      <p className="my-6 text-xl">Sorry, an unexpected error has occured.</p>
      <p className="text-lg">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
