import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import AllProductList from "../../components/Products/AllProductList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import FilterSidebar from "../../components/sidebar/FilterSideBar";
import { useSelector } from "react-redux";
import { Collapse } from "../../components/collapsible/Collapse";

const AllProductsPage = () => {
  const [showFilter, setShowFilter] = useState(true);
  const { products, FilterProduct } = useSelector((state) => state.productInfo);
  const [productLists, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    mainCategory: [],
    maxPrice: "",
    minPrice: "",
    colors: [],
    sale: "",
    brand: [],
  });
  const hasActiveFilters = (f) => {
    return (
      f.mainCategory.length > 0 ||
      f.minPrice !== "" ||
      f.maxPrice !== "" ||
      f.colors.length > 0 ||
      f.sale !== "" ||
      f.brand.length > 0
    );
  };
  const handleOnSortOption = (option) => {
    if (option === "Price:Low-High") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      console.log(sortedProducts);
      setProductList(sortedProducts);
    }
    if (option === "Price:High-Low") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProductList(sortedProducts);
    }
    if (option === "Newest") {
      const sortedProducts = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProductList(sortedProducts);
    }
  };
  const maxPrice = Math.max(...products.map((product) => product.price));
  const handleOnChecked = (name, value) => {
    setFilters((prev) => {
      let filters = { ...prev };
      console.log(prev);
      if (name === "mainCategory") {
        const prevMainCategories = Array.isArray(prev?.mainCategory)
          ? prev.mainCategory
          : [];
        const alreadySelected = prevMainCategories.includes(value);
        const nextCategories = alreadySelected
          ? prevMainCategories.filter((item) => item !== value)
          : [...prevMainCategories, value];
        filters.mainCategory = nextCategories;
      }
      if (name === "brand") {
        const prevBrand = Array.isArray(prev?.brand) ? prev.brand : [];
        const alreadySelectedBrand = prev.brand.includes(value);
        const nextBrand = alreadySelectedBrand
          ? prevBrand.filter((brand) => brand != value)
          : [...prevBrand, value];
        filters.brand = nextBrand;
      }
      if (name === "sales") {
        filters.sale = value;
      }

      return filters;
    });
  };
  const handleOnClick = (name, value) => {
    console.log(name, value);
    setFilters((prev) => {
      let filters = { ...prev };
      if (name === "price") {
        (filters.minPrice = value[0]), (filters.maxPrice = value[1]);
      }
      if (name === "colors") {
        const prevColors = Array.isArray(prev?.colors) ? prev.colors : [];
        const alreadyClicked = prevColors.includes(value);
        const nextColors = alreadyClicked
          ? prevColors.filter((color) => color != value)
          : [...prevColors, value];
        filters.colors = nextColors;
      }
      return filters;
    });
  };

  return (
    <div className="mx-auto px-4">
      {/* Breadcrumb only at the top */}
      <div className="bg-gray-100 p-4 mb-6">
        <Breadcrumb className="flex flex-wrap items-center space-x-1 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-foreground hover:text-primary"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="mx-2">{">"}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/allproducts" className="text-foreground">
              All Products
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Main layout: sidebar + product grid */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        {showFilter && (
          <aside className="w-full md:w-64 space-y-4 shrink-0">
            <FilterSidebar
              handleOnChecked={handleOnChecked}
              maxPrice={maxPrice}
              handleOnClick={handleOnClick}
              filters={filters}
            />
          </aside>
        )}

        {/* Right Product Grid */}
        <main
          className={`${showFilter ? "flex-grow" : "w-full"} transition-all duration-300`}
        >
          {/* Top row with heading and toggle */}
          <div className="flex items-center justify-between ">
            <h3 className="text-2xl font-bold text-gray-800">All Products</h3>

            {FilterProduct.length > 0 && hasActiveFilters(filters) && (
              <h4 className="text-2xl font-bold text-gray-800">
                Found {FilterProduct.length} out of {products.length}
              </h4>
            )}

            <button
              className="text-sm text-blue-600 flex items-center gap-1"
              onClick={() => setShowFilter(!showFilter)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>

            <Collapse
              feature="Featured"
              Newest="Newest"
              phl="Price: High-Low"
              plh="Price: Low-High"
              title="Sort By"
              handleOnSortOption={handleOnSortOption}
            />
          </div>

          {/* AllProductList Component */}
          <AllProductList
            productlist={productLists}
            filters={filters}
            hasActiveFilter={hasActiveFilters}
          />
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
