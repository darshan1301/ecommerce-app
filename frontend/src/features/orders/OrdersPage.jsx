import LoadingScreen from "../../components/LoadingScreen";
import OrderCard from "./OrderCard";
import { useOrders } from "./useOrders";

const OrdersPage = () => {
  const { orders, isLoading } = useOrders();
  if (isLoading) return <LoadingScreen />;
  if (orders.length === 0)
    return <p className="mt-10 flex justify-center">No orders.</p>;
  return (
    <div className="mx-20">
      {orders.map((item) => (
        <OrderCard order={item} key={item._id} />
      ))}
    </div>
  );
};

export default OrdersPage;
