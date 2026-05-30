import { useContext } from "react"
import { FilterProductStore } from "../../Store/filterProduct-store"
import { ProductCard } from "../pages/ProductCard"

export function SearchProduct(){
const [ searchTerm, setSearchTerm, searchResults, setSearchResults, filterResult, setFilterResult] = useContext(FilterProductStore);
let product = searchResults
console.log(`product${product}`)
return(
<>
    <div className="mt-20 p-4 flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
    {searchResults.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
    {searchResults.length === 0 && (
      <p className="text-center text-white">No products found for "{searchTerm}"</p>
    )}
  </div>
</div>
</>    
)
}