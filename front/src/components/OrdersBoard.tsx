import type { Order } from "@/types/Order";
import { Button } from "./ui/button";
import { useState } from "react";
import OrderModal from "./OrderModal";

interface BoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export default function OrdersBoard({ icon, title, orders }: BoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }

  return (
    <>
      <div className="w-full h-auto flex flex-col justify-center items-center gap-4 p-4 border border-gray-200 rounded-sm min-h-[240px]">
        <div className="flex w-full justify-center items-center gap-2">
          <span>{icon}</span>
          <strong>{title}</strong>
          <span>({orders.length})</span>
        </div>
        {orders.length > 0 && (
          <>
            {orders.map((order) => (
              <Button
                key={order._id}
                variant={"outline"}
                className="cursor-pointer w-full flex flex-1 flex-col justify-center items-center border bg-white border-gray-100"
                onClick={() => handleOpenModal(order)}
              >
                <h2>Mesa {order.table}</h2>
                <span>{order.products.length} Item(ns)</span>
              </Button>
            ))}
          </>
        )}
      </div>
      <OrderModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </>
  );
}
