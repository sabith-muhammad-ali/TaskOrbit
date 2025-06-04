import { Link } from "react-router-dom";
import logo from "../../../public/logo.svg";
import { useSelector } from "react-redux";
import UserDropdownMenu from "./UserDropdownMenu";
import type { RootState } from "../../store";
import AuthBotton from "./AuthBotton";

const Header = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-50 text-pink-500 px-6 py-3 shadow-md border-b border-slate-400">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="w-8 h-8 cursor-pointer" />
          </Link>
          <Link to={"/"} className="text-2xl font-bold ">
            TaskOrbit
          </Link>
        </div>

        <div>
          {userInfo? (
            <>
              <UserDropdownMenu title={userInfo.name} />
            </>
          ) : (
            <>
              <AuthBotton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
