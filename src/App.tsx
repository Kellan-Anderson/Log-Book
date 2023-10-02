import SpendingPage from "./views/spending";
import WelcomePage from "./views/welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage />
    },
    {
      path: '/spending',
      element: <SpendingPage />
    }
  ]);

  return (
    <Provider store={store}>
      <div className="w-full h-screen p-4">
        <RouterProvider router={router} />
      </div>
    </Provider>
  )
}