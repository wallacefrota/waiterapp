export type OrderStatus = "WAITING" | "IN PRODUCTION" | "DONE";

export interface Order {
  _id: string;
  table: string;
  status: OrderStatus;
  products: Array<{
    _id: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      imagePath: string;
      price: number;
    }
  }>
}
