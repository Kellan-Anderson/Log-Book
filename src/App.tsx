import WelcomeArea from "./views/welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomeArea />
    }
  ])

  return (
    <div className="w-full h-screen p-4">
      <RouterProvider router={router} />
    </div>
  )
}