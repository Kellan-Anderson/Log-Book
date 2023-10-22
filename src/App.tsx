import SpendingPage from "./views/spending/spendingPage";
import WelcomePage from "./views/welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/ui/themeProvider";
import ComingSoonPage from "./views/ComingSoon";

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage />
    },
    {
      path: '/spending',
      element: <SpendingPage />
    },
    {
      path: '/time',
      element: <ComingSoonPage />
    },
    {
      path: '/calories',
      element: <ComingSoonPage />
    },
    {
      path: '/hunting',
      element: <ComingSoonPage />
    },
    {
      path: '/fishing',
      element: <ComingSoonPage />
    },
  ]);

  

  return (
    <ThemeProvider>
      <Provider store={store}>
        <div className="w-full h-screen p-4 flex flex-col">
          <RouterProvider router={router} />
        </div>
        <Toaster />
      </Provider>
    </ThemeProvider>
  )
}