import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useSelector } from "react-redux";
import { capitalize } from "../../utility/buldCapital";
import { useState } from "react";
const Navbar = () => {
  const { categories } = useSelector((state) => state.categoriesInfo);
  const navigate = useNavigate();
  const [menuKey, setMenuKey] = useState(0);

  //this is for handling on click
  const handleOnCategoryClick = (categoryPath) => {
    const path = categoryPath.slice(1); // remove leading slash
    const queryParams = new URLSearchParams({ productPath: path });
    navigate(`/allproducts?${queryParams.toString()}`);

    //this is for dissapearing the category list after clicking
    setMenuKey((prev) => prev + 1);
  };

  // Recursive function to render subcategories
  const renderSubCategories = (parentId, level = 0) => {
    const subCategories = categories.filter((cat) => cat.parent === parentId);
    if (subCategories.length === 0) return null;

    return (
      <div className={`ml-${level * 4}`}>
        {subCategories.map((subCat) => (
          <div key={subCat._id} className="mb-2">
            <div
              className={`cursor-pointer hover:underline text-sm pl-${level * 2}`}
              onClick={() => handleOnCategoryClick(subCat.path)}
            >
              {capitalize(subCat.name)}
            </div>
            {renderSubCategories(subCat._id, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  const topLevelCategories = categories.filter((cat) => cat.parent === null);

  return (
    <nav className="flex gap-4 items-center text-xl flex-wrap font-medium text-white justify-center">
      <NavigationMenu viewport={false} key={menuKey}>
        <NavigationMenuList>
          {topLevelCategories.map((category) => (
            <NavigationMenuItem key={category._id}>
              <NavigationMenuTrigger
                className="bg-slate-900 text-xl"
                onClick={() => handleOnCategoryClick(category.path)}
              >
                {capitalize(category.name)}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white text-black shadow-md p-4 rounded z-50">
                <div className="w-[250px] max-h-[400px] overflow-y-auto">
                  {renderSubCategories(category._id)}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
