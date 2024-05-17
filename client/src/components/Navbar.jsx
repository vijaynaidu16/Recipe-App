import { Link, useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth")
  }
  return (
    <nav className="w-full  bg-orange-500">
      <ul className="flex flex-wrap justify-center items-center gap-5 p-3 ">
        <li className="px-4  text-white py-3 hover:shadow-2xl rounded-lg hover:bg-orange-600"> <Link to="/"> Home</Link></li>
        <li className="px-4  text-white py-3 hover:shadow-2xl rounded-lg hover:bg-orange-600"><Link to="/create-recipe">Create Recipe</Link></li>
        {/* <li className="px-4  text-white py-3 hover:shadow-2xl rounded-lg hover:bg-orange-600"><Link to="/saved-recipes"> Saved Recipe</Link></li> */}
        {!cookies.access_token ? (
          <li className="px-4  text-white py-3 rounded-md hover:shadow-2xl hover:bg-orange-600"><Link to="/auth"> Login/Register</Link></li>
        ): (
          <button onClick={logout} className="bg-white text-black px-4 py-3 rounded-lg">Logout</button>
        )}
      </ul>
    </nav>
  )
};

export default Navbar;
