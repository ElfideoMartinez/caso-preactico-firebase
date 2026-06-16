const OrderCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <p>Producto: Nombre del producto</p>
      <p>Cantidad: 1</p>
      <p>Precio: $10.00</p>
      {children}
    </div>
  );
};

export default OrderCard;
