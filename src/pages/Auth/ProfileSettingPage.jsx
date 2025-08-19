import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserAction } from "../../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const menuItems = [
  { key: "account", label: "Account Details" },
  { key: "payment", label: "Payment Methods" },
  { key: "address", label: "Delivery Addresses" },
];

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    state: "",
    suburb: "",
    postCode: "",
  });

  //Fetch user on page load
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  //Fill form when the user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fName + " " + user.lName || "",
        email: user.email || "",
        password: user.password || "",
        phone: user.phone || "",
        country: user?.address?.country || "",
        state: user?.address?.state || "",
        city: user?.address?.city || "",
        postCode: user?.address?.postCode || "",
      });
    }
  }, [user]);

  //Handle input change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Handle on submit to save the new details
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await 
    } catch (error) {
      toast.error;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {/* Sidebar */}
      <Card className="col-span-1 shadow-md rounded-2xl">
        <CardContent className="p-4 flex flex-col space-y-2">
          <h1 className="mb-5 text-center text-lg">Settings</h1>
          {menuItems.map((item) => (
            <Button
              key={item.key}
              variant={activeTab === item.key ? "default" : "ghost"}
              className="justify-start text-left w-full"
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Main content */}
      <Card className="col-span-1 md:col-span-3 shadow-md rounded-2xl">
        <CardContent className="p-6">
          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Edit Account Details
              </h2>
              <Separator className="mb-4" />
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleOnChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="*******"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Phone number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="0499496139"
                  />
                </div>
                <div>Location :</div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Suburb</label>
                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Suburb"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Postcode</label>
                  <input
                    type="number"
                    name="postCode"
                    value={formData.postCode}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="Postcode"
                  />
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between align-baseline">
                  {" "}
                  Delete Account <Button variant="outline">Delete</Button>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-end ">
                  <Button type="submit" onClick={handleOnSubmit}>Save</Button>{" "}
                </div>
              </form>
            </div>
          )}

          {activeTab === "payment" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
              <Separator className="mb-4" />
              <p className="text-sm text-gray-600">
                Add or manage your payment methods.
              </p>
              <Button className="mt-4">Add New Card</Button>
            </div>
          )}

          {activeTab === "address" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Delivery Addresses</h2>
              <Separator className="mb-4" />
              <p className="text-sm text-gray-600">
                Manage your saved addresses.
              </p>
              <Button className="mt-4">Add New Address</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
