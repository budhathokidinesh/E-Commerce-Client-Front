import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import Navbar from "../navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import MobileNavbar from "../navbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetctCategoriesAction } from "../../features/categories/categoriesAction";
import { fetchProductAction } from "../../features/product/productAction";
import { logoutUserAction } from "../../features/user/userAction";
import DropDown from "../../utils/dropDown";

const Header = () => {
  const ref = useRef(true);

  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();

  // Get cart item count (sum of quantities)
  const cartItemsCount = useSelector((state) =>
    state.cartInfo?.cartItems?.reduce((sum, item) => sum + item.quantity, 0)
  );

  const { user, wishlistProducts } = useSelector((state) => state.user);
  console.log(user, wishlistProducts);

  const wishlistItemsCount = wishlistProducts?.length || 0;
  console.log("Number of wishlist items : ", wishlistItemsCount);

  useEffect(() => {
    ref.current &&
      dispatch(fetctCategoriesAction()) &&
      dispatch(fetchProductAction());
    ref.current = false;
  }, [dispatch]);

  //this is for logout
  const handleLogout = async () => {
    if (!user?.email) return;
    await dispatch(logoutUserAction(user.email));
    navigate("/");
  };

  return (
    <header className="text-gray-600 body-font flex justify-center  bg-slate-900">
      <div className="container  h-20 flex-wrap p-2  flex justify-between items-center md:p-6 lg:justify-between gap-10  ">
        {/* brand */}
        <Link to="/" className="text-2xl font-bold text-slate-100">
          Group Store
        </Link>
        {/* navbar */}
        <div className="lg:flex hidden">
          <Navbar />
        </div>
        {/* icons */}
        <ul className="text-base  font-medium text-white dark:text-white flex flex-row items-center justify-center gap-6 md:gap-4 flex-1 lg:flex-initial ">
          <li className="relative flex items-center">
            {searchOpen ? (
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className=" absolute right-0  sm:w-64 md:w-40 px-3 py-1 rounded-md text-black bg-white outline-none shadow-md transition-all duration-300"
                onBlur={() => setSearchOpen(false)} // closes when clicking outside
              />
            ) : (
              <button onClick={() => setSearchOpen(true)}>
                <BsSearch size={18} className="text-white" />
              </button>
            )}
          </li>

          <li className="relative">
            <Link to="/wishlist">
              <FaRegHeart className="cursor-pointer" />
              {wishlistItemsCount > 0 ? (
                <span className="absolute -top-3.5 -right-3.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              ) : (
                ""
              )}
            </Link>
          </li>
          <li className="relative">
            <Link to="/cart">
              <IoBag />
              {cartItemsCount > 0 && (
                <span className="absolute -top-3.5 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </li>

          {/* {user && user._id ? */}
          {!user?._id ? (
            <li>
              <Link to="/login">
                <button className="text-sm text-black bg-green-400 px-1 py-1 rounded hover:bg-amber-50">
                  Login
                </button>
              </Link>
            </li>
          ) : (
            <DropDown logout={handleLogout} />
          )}
        </ul>
        {/* mobile navbar */}
        <div className="flex lg:hidden">
          <MobileNavbar></MobileNavbar>
        </div>
      </div>
    </header>
  );
};

export default Header;
