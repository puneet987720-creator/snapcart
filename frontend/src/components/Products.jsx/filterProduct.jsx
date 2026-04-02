import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FilterProductStore } from "../../Store/filterProduct-store";
import { filterProduct } from "../../services/poducts";
const category = ["Electronics","mobile", "Clothing", "Books", "Home & Garden", "Sports", "Toys", "Beauty", "Automotive"];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG", "Zara", "H&M", "Dell", "HP"];

export function FilterPage() {
  const Navigate = useNavigate()
  const [ searchTerm, setSearchTerm, searchResults, setSearchResults, filterResult, setFilterResult ] = useContext(FilterProductStore)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const handleCategory = async() => {
    const CategoryString = await selectedCategories.join(",")
    const brandString = await selectedBrands.join(",")
    console.log('filter',CategoryString,selectedBrands,minPrice,maxPrice)
   const response = await filterProduct(CategoryString,brandString,minPrice,maxPrice)    
   setFilterResult(response.data.products)
   Navigate('/filtered-product')
  }
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setCategorySearch("");
    setBrandSearch("");
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  const filteredCategories = category.filter((c) =>
    c.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md px-4 sm:px-6">
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-bold">Product Filters</h1>
        </div>
        {activeFilterCount > 0 && (
          <div className="flex-none">
            <div className="badge badge-primary badge-lg gap-2">
              {activeFilterCount} active
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Filter Products</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="btn btn-ghost btn-sm text-error"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {/* Category Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Category
                {selectedCategories.length > 0 && (
                  <div className="badge badge-secondary">{selectedCategories.length}</div>
                )}
              </h2>
              <p className="text-sm sm:text-base text-base-content/60 mb-3">
                Select one or more product category.
              </p>

              <input
                type="text"
                placeholder="Search category..."
                className="input input-bordered input-sm w-full mb-3"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
              />

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`badge badge-lg cursor-pointer transition-all ${
                      selectedCategories.includes(cat)
                        ? "badge-primary"
                        : "badge-outline hover:badge-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                {filteredCategories.length === 0 && (
                  <p className="text-sm text-base-content/40 italic">No category found.</p>
                )}
              </div>

              {selectedCategories.length > 0 && (
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => setSelectedCategories([])}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Brand Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Brand
                {selectedBrands.length > 0 && (
                  <div className="badge badge-secondary">{selectedBrands.length}</div>
                )}
              </h2>
              <p className="text-sm sm:text-base text-base-content/60 mb-3">
                Choose brands you want to filter by.
              </p>

              <input
                type="text"
                placeholder="Search brands..."
                className="input input-bordered input-sm w-full mb-3"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
              />

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`badge badge-lg cursor-pointer transition-all ${
                      selectedBrands.includes(brand)
                        ? "badge-accent"
                        : "badge-outline hover:badge-accent"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
                {filteredBrands.length === 0 && (
                  <p className="text-sm text-base-content/40 italic">No brands found.</p>
                )}
              </div>

              {selectedBrands.length > 0 && (
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => setSelectedBrands([])}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Price Range Card */}
          <div className="card bg-base-100 shadow-xl col-span-1 md:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Price Range</h2>
              <p className="text-sm sm:text-base text-base-content/60 mb-2">
                Set a minimum and maximum price to narrow results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Min Price</span>
                    {minPrice && (
                      <span className="label-text-alt text-primary font-semibold">
                        ₹{Number(minPrice).toLocaleString()}
                      </span>
                    )}
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <span className="text-base-content/50 text-sm">₹</span>
                    <input
                      type="number"
                      className="grow"
                      placeholder="0"
                      min="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </label>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Max Price</span>
                    {maxPrice && (
                      <span className="label-text-alt text-primary font-semibold">
                        ₹{Number(maxPrice).toLocaleString()}
                      </span>
                    )}
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <span className="text-base-content/50 text-sm">₹</span>
                    <input
                      type="number"
                      className="grow"
                      placeholder="999999"
                      min="0"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              {minPrice && maxPrice && Number(minPrice) > Number(maxPrice) && (
                <div className="alert alert-error mt-3 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Min price cannot exceed max price.</span>
                </div>
              )}

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-ghost btn-sm sm:btn-md"
                  onClick={() => { setMinPrice(""); setMaxPrice(""); }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <div className="card bg-base-100 shadow-xl col-span-1 md:col-span-2 border border-primary/20">
              <div className="card-body">
                <h2 className="card-title text-primary">Active Filters</h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCategories.map((cat) => (
                    <div key={cat} className="badge badge-primary gap-1">
                      {cat}
                      <button onClick={() => toggleCategory(cat)} className="ml-1">✕</button>
                    </div>
                  ))}
                  {selectedBrands.map((brand) => (
                    <div key={brand} className="badge badge-accent gap-1">
                      {brand}
                      <button onClick={() => toggleBrand(brand)} className="ml-1">✕</button>
                    </div>
                  ))}
                  {minPrice && (
                    <div className="badge badge-secondary gap-1">
                      Min: ₹{Number(minPrice).toLocaleString()}
                      <button onClick={() => setMinPrice("")} className="ml-1">✕</button>
                    </div>
                  )}
                  {maxPrice && (
                    <div className="badge badge-secondary gap-1">
                      Max: ₹{Number(maxPrice).toLocaleString()}
                      <button onClick={() => setMaxPrice("")} className="ml-1">✕</button>
                    </div>
                  )}
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-ghost btn-sm sm:btn-md text-error" onClick={clearAll}>
                    Clear All
                  </button>
                  <button onClick={handleCategory} className="btn btn-primary btn-sm sm:btn-md">Apply Filters</button>
                </div>
              </div>
            </div>
          )}

          {/* Apply Button when no active filters */}
          {activeFilterCount === 0 && (
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <button className="btn btn-primary btn-sm sm:btn-md" disabled>
                Apply Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}