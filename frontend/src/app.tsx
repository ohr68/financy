import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  return (
    <div className="min-h-dvh bg-gray-100 p-10">
        <RouterProvider router={router} />
    </div>
  )
}