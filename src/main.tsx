import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'; // Importar el componente App
import FundsPage from './pages/FundsPage'; // Asegúrate de importar las páginas
import TransactionsPage from './pages/TransactionPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Define las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <FundsPage />,
      },
      {
        path: "clients",
        element: <TransactionsPage />,
      }
 
    ],
  },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>
);
