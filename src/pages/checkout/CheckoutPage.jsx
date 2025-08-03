import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getOrCreateGuestId } from "../../utils/guestId";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "../../components/common-Input/FormControl";
import {
  initialShippingFormData,
  ShippingFormControls,
} from "../../config/formCongif";
import useForm from "../../hooks/useForm";
import {
  fetchCartFromStorage,
  updatePricingOnPromoChange,
} from "../../features/cart/cartAction";
import CheckOutSummary from "./CheckOutSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { formData, handleOnChange, setFormData } = useForm(
    initialShippingFormData
  ); //useform from custom hook

  useEffect(() => {
    dispatch(fetchCartFromStorage());
  }, [dispatch]);

  // Initialize form data with user info if available
  useEffect(() => {
    if (user?._id) {
      // If user has address data, use it
      if (user?.address) {
        setFormData({
          ...formData,
          email: user.email || "",
          firstName: user.fName,
          lastName: user.lName,
          street: user.address.street || "",
          city: user.address.city || "",
          state: user.address.state || "",
          postalCode: user.address.postalCode || "",
          country: user.address.country || "",
          phoneNumber: user.address.phone || "",
        });
      } else {
        // Just fill basic user info
        setFormData({
          ...formData,
          email: user.email || "",
          firstName: user.fName || "",
          lastName: user.lName || "",
        });
      }
    } else {
      // For guest users, always set guestId in formData
      const guestId = getOrCreateGuestId();
      const storedAddress = localStorage.getItem(`guestAddress_${guestId}`);
      if (storedAddress) {
        const guestAddress = JSON.parse(storedAddress);
        setFormData({
          ...formData,
          ...guestAddress,
          guestId,
        });
      }
    }
  }, [user]);

  // Recalculate pricing when component mounts
  useEffect(() => {
    dispatch(updatePricingOnPromoChange());
  }, [dispatch]);

  // Helper function to group  form fields for layout | form layout
  const getFormLayout = () => {
    const layout = [];

    // Tracks which fields user has  already processed
    const processedFields = new Set();

    ShippingFormControls.forEach((field) => {
      // Skip if user have  already processed this field
      if (processedFields.has(field.name)) return;

      if (field.layout === "grid") {
        // Find all fields that belong to the same grid group
        const groupFields = ShippingFormControls.filter(
          (f) => f.gridGroup === field.gridGroup
        );
        // Add this group to layout
        layout.push({
          type: "grid",
          fields: groupFields,
        });
        // then Mark all fields in this group as processed
        groupFields.forEach((f) => processedFields.add(f.name));
      } else {
        layout.push({
          type: "single",
          field: field,
        });
        processedFields.add(field.name);
      }
    });

    return layout;
  };

  const validateForm = () => {
    const requiredFields = Object.keys(initialShippingFormData);
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in all fields.`);
        return false;
      }
    }
    return true;
  };

  const handleContinueOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Save form data to localStorage
    if (user && user._id) {
      // Logged-in user: save with user ID and isGuest: false
      const formDataWithUserId = {
        ...formData,
        userId: user._id,
        isGuest: false,
      };
      localStorage.setItem(
        `checkoutAddress_${user._id}`,
        JSON.stringify(formDataWithUserId)
      );
    } else {
      // Guest: save with guest ID and isGuest: true
      const guestId = getOrCreateGuestId();
      const formDataWithGuestId = { ...formData, guestId, isGuest: true };
      localStorage.setItem(
        `guestAddress_${guestId}`,
        JSON.stringify(formDataWithGuestId)
      );
    }

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery Options */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              Delivery Options
            </h2>

            <form className="space-y-4">
              {getFormLayout().map((item, index) => (
                <div key={index}>
                  {/* show if layout is grid 2 col side by side */}
                  {item.type === "grid" ? (
                    <div className="grid grid-cols-2 gap-4">
                      {item.fields.map((field, fieldIndex) => (
                        <FormControl
                          key={fieldIndex}
                          handleOnChange={handleOnChange}
                          inputAttributes={{
                            type: field.type,
                            name: field.name,
                            value: formData[field.name],
                            placeholder: field.placeholder,
                            autoComplete: field.autoComplete,
                            required: true,
                            id: field.name,
                          }}
                          className="w-full px-6 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      ))}
                    </div>
                  ) : (
                    // show if layout is single
                    <FormControl
                      handleOnChange={handleOnChange}
                      inputAttributes={{
                        type: item.field.type,
                        name: item.field.name,
                        value: formData[item.field.name],
                        placeholder: item.field.placeholder,
                        autoComplete: item.field.autoComplete,
                        required: true,
                        id: item.field.name,
                      }}
                      className={`w-full px-6 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                        item.field.className || ""
                      }`}
                    />
                  )}
                </div>
              ))}

              {/* Save & Continue Button */}
              <div className="pt-6 flex justify-center items-center">
                <button
                  className=" bg-black hover:bg-gray-800 text-white py-4 px-8  rounded-full text-base font-medium"
                  onClick={handleContinueOrder}
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - In Your Bag */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">In Your Bag</h2>
              <Button
                asChild
                variant="link"
                className="text-gray-600 underline text-sm hover:text-gray-800 "
              >
                <Link to="/cart">Edit</Link>
              </Button>
            </div>
            <CheckOutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
