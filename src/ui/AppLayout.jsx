import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="">
      {isLoading && <Loader />}

      <Outlet />
    </div>
  );
}

export default AppLayout;
