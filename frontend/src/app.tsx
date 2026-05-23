import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export function App() {
  return (
    <div className='h-dvh w-full flex justify-center
        items-center p-10'
    >
      <div className='flex w-full justify-center'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}