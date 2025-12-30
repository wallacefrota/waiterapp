export default function Header() {
  return (
    <header className="w-full h-[198px] bg-red-700 flex px-8">
      <div className="w-full flex max-w-[1216px] justify-between items-center mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Pedidos</h1>
          <h2 className="text-sm font-normal opacity-90 text-white">
            Acompanhe os pedidos de clientes
          </h2>
        </div>

        <img src="" alt="Waiter app" />
      </div>
    </header>
  );
}
