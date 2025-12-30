import Header from "./components/Header"
import Orders from "./components/Orders"

export default function App() {
  return (
    <main className="w-full min-w-screen bg-gray-50 h-lvh min-h-lvh flex flex-col gap-8">
      <Header />
      <Orders />
    </main>
  )
}
