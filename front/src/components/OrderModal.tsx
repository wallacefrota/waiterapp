import type { Order, OrderStatus } from "@/types/Order";
import { useMemo } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface OrderModalProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderModal({
  visible,
  onClose,
  order,
}: OrderModalProps) {
  if (!order) return null;

  function getTextByStatus(status: OrderStatus) {
    switch (status) {
      case "DONE":
        return (
          <p className="text-2xl">
            ✅ <span className="font-medium text-lg">Concluído</span>
          </p>
        );
      case "IN PRODUCTION":
        return (
          <p className="text-2xl">
            👩🏻‍🍳 <span className="font-medium text-lg">Em preparação</span>
          </p>
        );
      case "WAITING":
        return (
          <p className="text-2xl">
            ⏱ <span className="font-medium text-lg">Fila de espera</span>
          </p>
        );
      default:
        return <span>Status inválido!</span>;
    }
  }

  const currencyBRL = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      }),
    []
  );

  const total = order.products.reduce(
    (acc, { product, quantity }) => acc + quantity * product.price,
    0
  );

  return (
    <Dialog modal open={visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Mesa {order.table}</DialogTitle>
          <DialogDescription>
            Veja abaixo detalhes deste pedido
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-auto flex flex-col gap-8">
          <div className="w-full flex flex-col gap-1">
            <span className="text-gray-500 font-normal">Status do Pedido</span>
            {getTextByStatus(order.status)}
          </div>
          <div className="w-full h-auto flex flex-col gap-4">
            <p className="text-gray-400 font-sans text-sm">Item(ns)</p>
            {order.products.map((item) => {
              return (
                <div
                  className="w-full flex gap-2 border border-gray-100 rounded-sm p-2"
                  key={item._id}
                >
                  <img
                    src={`http://localhost:3001/api/uploads/${item.product.imagePath}`}
                    alt={item.product.name}
                    className="w-12 h-10 rounded-sm"
                  />
                  <div className="flex w-full gap-2">
                    <span className="text-sm text-gray-500">
                      {item.quantity}x
                    </span>
                    <div className="flex-1 flex flex-col justify-between gap-2 p-0">
                      <span className="font-sans">{item.product.name}</span>
                      <span className="font-medium">
                        {currencyBRL.format(item.product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-between items-center mb-4">
            <span className="font-medium text-gray-500">Total</span>
            <span className="font-medium">{currencyBRL.format(total)}</span>
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-col w-full gap-2">
            <Button
              size={"lg"}
              className="rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
            >
              👩🏻‍🍳 Iniciar Produção
            </Button>
            <Button variant={"link"} className="cursor-pointer">
              <span className="text-red-900">Cancelar pedido</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
