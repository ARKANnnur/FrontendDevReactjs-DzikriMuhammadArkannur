/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import Card from "../ui/Card";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    openNow: false,
    price: "",
    categories: "",
  });

  useEffect(() => {
    async function getRestoData() {
      try {
        setIsLoading(true);

        let url =
          "https://67b28fe3bc0165def8cdd101.mockapi.io/my-api/restaurants";
        if (filters.categories) {
          url += `?categories=${filters.categories}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getRestoData();
  }, [filters.categories]);

  useEffect(() => {
    let filtered = data;

    if (filters.openNow) {
      filtered = filtered.filter((item) => item.open_now === true);
    }
    if (filters.price) {
      filtered = filtered.filter((item) => item.price_range === filters.price);
    }
    if (filters.categories) {
      filtered = filtered.filter((item) =>
        item.categories.includes(filters.categories),
      );
    }

    setFilteredData(filtered);
  }, [filters, data]);

  return (
    <div className="space-y-5 pb-12">
      <div className="title px-12 pt-12">
        <h1 className="text-2xl md:text-4xl">Restaurant</h1>
        <p className="w-full md:w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime porro
          aperiam neque laboriosam dolorem quos cumque ducimus saepe
          perspiciatis, explicabo odit laudantium. Accusantium temporibus
          tempore, doloremque modi voluptates eaque provident.
        </p>
      </div>
      <Filter filters={filters} setFilters={setFilters} />
      {isLoading ? <Loader /> : <ListToko data={filteredData} />}
      {!filteredData.length && (
        <p className="px-12 text-center text-lg font-bold">
          Restaurant Tidak Ada
        </p>
      )}
    </div>
  );
}

function Filter({ filters, setFilters }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-300 p-4 px-12">
      <div className="flex items-center gap-4">
        <h2 className="font-semibold">Filter By:</h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.openNow}
            onChange={() =>
              setFilters((prev) => ({ ...prev, openNow: !prev.openNow }))
            }
            className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-blue-500 checked:bg-blue-500"
          />
          <span>Open Now</span>
        </label>
        <select
          value={filters.price}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, price: e.target.value }))
          }
          className="rounded border p-1 shadow-sm"
        >
          <option value="">Price</option>
          <option value="Rp30.000 - Rp80.000/orang">Rp30.000 - Rp80.000</option>
          <option value="Rp50.000 - Rp100.000/orang">
            Rp50.000 - Rp100.000
          </option>
          <option value="Rp100.000 - Rp200.000/orang">
            Rp100.000 - Rp200.000
          </option>
          <option value="Rp200.000 - Rp500.000/orang">
            Rp200.000 - Rp500.000
          </option>
        </select>
        <select
          value={filters.categories}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, categories: e.target.value }))
          }
          className="rounded border p-1 shadow-sm"
        >
          <option value="">Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Sushi">Sushi</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Japanese">Japanese</option>
          <option value="Cafe">Cafe</option>
        </select>
      </div>
      <button
        onClick={() =>
          setFilters({ openNow: false, price: "", categories: "" })
        }
        className="rounded border p-1 px-4 text-blue-400 shadow-sm"
      >
        Clear All
      </button>
    </div>
  );
}

function ListToko({ data }) {
  return (
    <div className="space-y-5 px-12">
      <h2>All Restaurant</h2>
      <div className="grid grid-cols-4 gap-5 gap-y-16">
        {data.map((item) => (
          <div key={item.id} className="space-y-5">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
