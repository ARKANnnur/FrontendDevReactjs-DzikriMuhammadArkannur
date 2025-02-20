/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaTag, FaDollarSign, FaArrowLeft } from "react-icons/fa";
import Stars from "../ui/Stars";

function Resto() {
  const { restoId } = useParams();
  const [resto, setResto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRestoDetail() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://67b28fe3bc0165def8cdd101.mockapi.io/my-api/restaurants/${restoId}`,
        );
        if (!res.ok) {
          throw new Error("Restaurant not found");
        }
        const data = await res.json();
        setResto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestoDetail();
  }, [restoId]);

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!resto) return <p className="text-center">Restaurant not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="left-0-0 absolute top-0 z-50">
        <Link to="/">
          <FaArrowLeft className="m-2 h-8 w-8 rounded-full bg-white p-2" />
        </Link>
      </div>
      <div className="relative h-[50vh]">
        <img
          src={`https://picsum.photos/1600/900?random=${resto.id}`}
          alt={resto.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-bold">{resto.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <Stars star={resto.rating} />
            <span>({resto.rating} / 5)</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="text-gray-600">{resto.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                <InfoCard
                  icon={<FaTag />}
                  label="Categories"
                  value={resto.categories.join(", ")}
                />
                <InfoCard
                  icon={<FaDollarSign />}
                  label="Price Range"
                  value={resto.price_range}
                />
                <InfoCard
                  icon={<FaClock />}
                  label="Status"
                  value={resto.open_now ? "Open Now" : "Closed"}
                  valueClass={
                    resto.open_now ? "text-green-600" : "text-red-600"
                  }
                />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-2xl font-semibold">Customer Reviews</h2>
              <div className="space-y-4">
                {resto.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex gap-4 rounded-lg bg-gray-100 p-4"
                  >
                    <img
                      src={`https://picsum.photos/100/100?random=${review.id}`}
                      alt={review.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <h3 className="font-semibold">{review.name}</h3>
                        <Stars star={review.rating} />
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 font-semibold">Location</h3>
              <img
                src={`https://picsum.photos/400/300?random=${resto.id}-map`}
                alt="Location"
                className="rounded-lg object-cover"
              />
              <p className="mt-2 text-gray-600">
                123 Sample Street, City, Country
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, valueClass = "text-gray-700" }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="mb-1 flex items-center gap-2 text-gray-600">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className={`font-medium ${valueClass}`}>{value}</div>
    </div>
  );
}

export default Resto;
