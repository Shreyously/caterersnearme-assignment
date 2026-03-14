import { useEffect, useMemo, useState } from "react";

type Caterer = {
  id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const CaterersPage = () => {
  const [caterers, setCaterers] = useState<Caterer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/caterers`);
        if (!response.ok) {
          throw new Error("Failed to fetch caterers");
        }

        const data: Caterer[] = await response.json();
        setCaterers(data);

        const computedMaxPrice =
          data.length > 0
            ? data.reduce(
                (currentMax, item) =>
                  item.pricePerPlate > currentMax
                    ? item.pricePerPlate
                    : currentMax,
                0
              )
            : 0;

        setMaxPriceLimit(computedMaxPrice);
        setMaxPrice(computedMaxPrice);
      } catch {
        setError("Could not load caterers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaterers();
  }, []);

  const filteredCaterers = useMemo(() => {
    return caterers.filter((caterer) => {
      const matchesName = caterer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice = caterer.pricePerPlate <= maxPrice;
      return matchesName && matchesPrice;
    });
  }, [caterers, maxPrice, searchTerm]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <header className="mb-10 text-center">
          <p className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Catering Search
          </p>
  
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Find The Perfect Caterer
          </h1>
  
          <p className="mt-2 text-slate-600">
            Discover top-rated caterers near you and filter by price.
          </p>
        </header>
  
        {/* Filters */}
        <section className="mb-8 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
          
          {/* Search */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Search Caterer
            </label>
  
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm transition focus:border-slate-600 focus:ring-2 focus:ring-slate-200 outline-none"
            />
          </div>
  
          {/* Price slider */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Max Price Per Plate
              </label>
  
              <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium">
                ₹{maxPrice}
              </span>
            </div>
  
            <input
              type="range"
              min={0}
              max={maxPriceLimit || 0}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full accent-slate-900"
              disabled={maxPriceLimit === 0}
            />
          </div>
        </section>
  
        {/* Loading */}
        {loading && (
          <div className="rounded-xl border bg-white p-6 text-center text-sm shadow-sm">
            Loading caterers...
          </div>
        )}
  
        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}
  
        {/* Empty */}
        {!loading && !error && filteredCaterers.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">No caterers match your filters.</p>
          </div>
        )}
  
        {/* Caterer Cards */}
        {!loading && !error && filteredCaterers.length > 0 && (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCaterers.map((caterer) => (
              <article
                key={caterer.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Name */}
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                  {caterer.name}
                </h2>
  
                {/* Location */}
                <p className="text-sm text-slate-500">{caterer.location}</p>
  
                {/* Price */}
                <p className="mt-4 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">
                    Price per plate:
                  </span>{" "}
                  ₹{caterer.pricePerPlate}
                </p>
  
                {/* Rating */}
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">Rating:</span>{" "}
                  ⭐ {caterer.rating} / 5
                </p>
  
                {/* Cuisine Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {caterer.cuisines.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
  
};

export default CaterersPage;
