export default function searchHelper(products, query){
console.log('query:', query, typeof query);
console.log('query keys:', query, Object.keys(query));
const q = (query || '').trim().toLowerCase();
if (!q) return [];

  return products.filter((product) =>
  product.title?.includes(query) ||
  product.description?.includes(query) ||
  product.category?.includes(query)
)

}