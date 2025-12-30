import type { Order } from "@/types/Order";
import OrdersBoard from "./OrdersBoard";

const orders: Order[] = [
  {
    _id: "693073dbee67712a8b265790",
    table: "123",
    status: "WAITING",
    products: [
      {
        product: {
          _id: "693068450ed9cdecec325618",
          name: "Pizza de 4 queijos",
          imagePath: "1764780101378-ivan-torres-MQUqbmszGGM-unsplash.jpg",
          price: 87.84,
        },
        quantity: 2,
        _id: "693073dbee67712a8b265791",
      },
      {
        product: {
          _id: "693073c1ee67712a8b265789",
          name: "Coca Cola",
          imagePath: "1764783041531-ivan-torres-MQUqbmszGGM-unsplash.jpg",
          price: 12.2,
        },
        quantity: 1,
        _id: "693073dbee67712a8b265792",
      },
    ],
  },
  {
    _id: "6953caebb8575811c31f07cf",
    table: "3",
    status: "WAITING",
    products: [
      {
        product: {
          _id: "693073c1ee67712a8b265789",
          name: "Coca Cola",
          imagePath: "1764783041531-ivan-torres-MQUqbmszGGM-unsplash.jpg",
          price: 12.2,
        },
        quantity: 3,
        _id: "6953caebb8575811c31f07d0",
      },
    ],
  },
];

export default function Orders() {
  return (
    <div className="w-full max-w-[1216px] mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <OrdersBoard icon="⏱" title="Fila de espera" orders={orders}/>
      <OrdersBoard icon="👩🏻‍🍳" title="Em preparação" orders={[]}/>
      <OrdersBoard icon="✅" title="Pronto!" orders={[]}/>
    </div>
  );
}
