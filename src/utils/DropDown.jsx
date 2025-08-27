import { Button } from "@/components/ui/button";
import { IoMdLogOut } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DropDown = ({ logout }) => {
  const { user } = useSelector((state) => state.user);
  const firstLetter = user?.fName ? user.fName.charAt(0).toUpperCase() : "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full w-6 h-6 flex items-center justify-center bg-blue-600 text-white font-bold p-0 overflow-hidden"
          variant="ghost"
        >
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user?.fName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{firstLetter}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mr-4" align="start">
        <DropdownMenuLabel className="font-bold">
          {user?.fName}'s Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profileSettings">
              <IoIosSettings className="text-blue-700" /> Profile Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/orderHistory">
              <FaListAlt className="text-blue-700" /> My Orders
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/support">
            <BiSupport className="text-green-700" /> Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <IoMdLogOut className="text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
