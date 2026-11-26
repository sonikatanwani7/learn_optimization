export function CartSummary({ cartProducts }) {
  console.log("cartProducts in cart summary", cartProducts);
  const total = cartProducts?.reduce((sum, item) => {
    return sum + item.quantity * item.product?.price;
  }, 0);
  return (
    <>
      <h4>Cart summary : Total cost: Rs. {total}</h4>
    </>
  );
}
