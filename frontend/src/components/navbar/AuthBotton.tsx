import { Link } from "react-router-dom";

const AuthBotton = () => {
  return (
    <>
      <Link
        to="/register"
        className="text-black  font-semibold focus:outline-none"
      >
        Register
      </Link>

      <Link
        to="/login"
        className="text-black  font-semibold focus:outline-none ml-12"
      >
        Login
      </Link>
    </>
  );
};

export default AuthBotton;
