import { useContext } from "react"
import { FilterProductStore } from "../../Store/filterProduct-store"
import { ProductCard } from "../pages/ProductCard"

export function FilteredProduct(){
const [ searchTerm, setSearchTerm, searchResults, setSearchResults, filterResult, setFilterResult ] = useContext(FilterProductStore);
let product = filterResult
console.log(`product${product}`)
return(
<>
    <div className="mt-20 p-4 flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
    {product.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
</div>
</>    
)
}