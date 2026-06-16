import Card from "../cards/Card";
interface OrdersHeaderProps {
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  } | null;
}

const OrdersHeader = ({ user }: OrdersHeaderProps) => {
  console.log("OrdersHeader received user:", user);
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {user?.photoURL && <img src={user.photoURL} alt='User Avatar' />}
        {user && (
          <div>
            <p>Display Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrdersHeader;
