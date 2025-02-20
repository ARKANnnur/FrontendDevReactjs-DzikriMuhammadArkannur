import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Resto from "./pages/Resto";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/resto/:restoId",
        element: <Resto />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `https://67b28fe3bc0165def8cdd101.mockapi.io/my-api/restaurants/${params.restoId}`,
            );
            if (!res.ok) throw new Error("Gagal mengambil data!");
            return res.json();
          } catch (error) {
            console.log(error);
            throw new Response("Not Found", { status: 404 });
          }
        },
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
