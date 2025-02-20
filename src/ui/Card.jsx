import { useNavigate } from "react-router-dom";
import Stars from "./Stars";

/* eslint-disable react/prop-types */
function Card({ item }) {
  const navigate = useNavigate();

  const { id, name, rating, categories, price_range, open_now, photos } = item;
  return (
    <>
      <div className="h-56 w-full bg-slate-300">
        <img
          src={`https://picsum.photos/800/600?random=${id}`}
          alt={photos}
          className="size-full object-fill"
        />
      </div>
      <div className="info space-y-1">
        <h3 className="text-lg font-bold">{name}</h3>
        <Stars star={rating} />
        <p>{categories.join(", ")}</p>
        <div className="flex items-center justify-between text-xs">
          <p>{price_range}</p>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                open_now ? "bg-blue-500" : "bg-red-500"
              }`}
            ></div>
            <p>{open_now ? "Open Now" : "Closed"}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/resto/${id}`)}
        className="w-full bg-[#012854] p-2 text-center text-white"
      >
        Check Detail
      </button>
    </>
  );
}
export default Card;
