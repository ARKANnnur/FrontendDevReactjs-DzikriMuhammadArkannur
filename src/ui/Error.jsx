import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center text-2xl font-bold">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <Link to="/">Go back</Link>
    </div>
  );
}

export default Error;
