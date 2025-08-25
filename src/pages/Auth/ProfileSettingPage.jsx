import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "../../components/helper/LoadingSpinner";

import {
  deleteUserAction,
  getUserAction,
  updateUserAction,
} from "../../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordModal from "../../components/settings/changePasswordModal";
import AddressList from "../../components/user/AddressList";
import { uploadMedia } from "../../axios/uploadAxios";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

const menuItems = [
  { key: "account", label: "Account Details" },
  { key: "address", label: "Delivery Addresses" },
  { key: "profile-picture", label: "Profile Picture" },
];

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileUploadProgress, setProfileUploadProgress] = useState(0);
  // const [originalData] = useState({ ...formData });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    profilePicture: "",
  });

  //Fetch user on page load
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  //Fill form when the user data is available
  useEffect(() => {
    if (user) {
      console.log("User data updated:", user);
      console.log("User profile picture:", user.profilePicture);
      setFormData({
        fullName: user.fName + " " + user.lName || "",
        email: user.email || "",
        password: user.password || "",
        phone: user.phone || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  // handleReset function
  // const handleReset = () => {
  //   setFormData({ ...originalData });
  //   setProfileUploadProgress(0);
  // };

  // const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }
      console.log("Selected file :", file);
      setProfilePicture(file);
      handleProfilePictureUpload(file);
    }
  };

  // Function to handle profile picture upload
  const handleProfilePictureUpload = async (file) => {
    try {
      setProfileUploadProgress(1); //Start Progress immediately
      const uploadFormData = new FormData();
      uploadFormData.append("images", file);
      console.log("Uploading file:", file.name, file.size);

      //api call to upload profile picture in cloudinary and get url
      const response = await uploadMedia(uploadFormData, (progress) => {
        console.log("Upload Progress:", progress);
        setProfileUploadProgress(progress);
      });
      console.log("Upload response:", response);

      if (response.success === true) {
        console.log("Response data array:", response.data);

        // The URL might be in response.data[0].url or response.data[0].secure_url (for Cloudinary)
        const uploadUrl = response.data[0]?.url;

        console.log("Upload URL:", uploadUrl);

        if (uploadUrl) {
          // Update form data with profile picture URL
          setFormData((prev) => ({ ...prev, profilePicture: uploadUrl }));

          // Also update the user in Redux store
          // const updateData = { ...formData, profilePicture: uploadUrl };
          const updateResponse = await dispatch(
            updateUserAction({ profilePicture: uploadUrl })
          );

          console.log("Update user response:", updateResponse);
          if (updateResponse?.status === "success") {
            //Refresh the user data from the server to update Redux state
            dispatch(getUserAction());
            toast.success("Profile picture updated successfully!");
          }
        } else {
          console.error("No URL found in response data");
          toast.error("Failed to get image URL from upload response");
        }
      } else {
        console.error("Upload failed:", response);
        toast.error(response.message || "Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error(
        `Failed to upload profile picture: ${error.message || "Unknown error"}`
      );
    } finally {
      setProfileUploadProgress(0);
      setProfilePicture(null); //Clear selected file
    }
  };

  //Handle input change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnDelete = () => {
    if (confirm("Are you sure, you want to permanantly delete your account?")) {
      try {
        const response = dispatch(deleteUserAction());
        if (response?.status === "success") {
          //Redirect to logic page
          window.location.href = "/login";
          toast.success("Account deleted.! Sorry to see you go");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while deleting your account");
      }
    } else {
      alert("Profile details not updated!");
    }
  };

  //Handle on submit to save the new details
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (confirm("Do you want to update your profile details?")) {
      try {
        const response = dispatch(updateUserAction(formData));
        if (response?.status === "success") {
          toast.success("Account deatils updated..!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong, while updating profile");
      }
    } else {
      alert("Profile details not updated!");
    }
  };
  return (
    <>
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
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
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
                      onChange={handleOnChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="example@mail.com"
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
                      onChange={handleOnChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      placeholder="0499496139"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        setPasswordModalOpen(true);
                      }}
                    >
                      {" "}
                      Change Password{" "}
                    </Button>
                    <ChangePasswordModal
                      open={isPasswordModalOpen}
                      onClose={() => setPasswordModalOpen(false)}
                    />
                  </div>

                  <Separator className="mb-4" />

                  <div className="flex justify-start">
                    <Button type="submit" onClick={handleOnSubmit}>
                      Update
                    </Button>{" "}
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex justify-between ">
                    {" "}
                    Delete Account :{" "}
                    <Button variant="destructive" onClick={handleOnDelete}>
                      Delete
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "address" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Delivery Addresses
                </h2>
                <Separator className="mb-4" />
                <p className="text-sm text-gray-600">
                  Manage your saved addresses.
                </p>
                {/* <Button className="mt-4">Add New Address</Button> */}
                <AddressList />
              </div>
            )}
            {activeTab === "profile-picture" && (
              // <div className="flex  items-center gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-blue-600" />
                    Profile Picture
                  </CardTitle>
                  <CardDescription>
                    Update your profile picture to personalize your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="relative">
                      <Avatar className="h-24 w-24 mb-2">
                        <AvatarImage
                          src={formData.profilePicture || "/placeholder.svg"}
                          alt="Profile"
                        />
                        <AvatarFallback className="text-lg">
                          {user?.fName?.charAt(0)?.toUpperCase() +
                            user?.lName?.charAt(0)?.toUpperCase() || "NA"}
                        </AvatarFallback>
                      </Avatar>
                      {/* Upload Progress Overlay */}
                      {profileUploadProgress > 0 &&
                        profileUploadProgress < 100 && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white">
                            <span className="text-xs font-medium">
                              {Math.round(profileUploadProgress)}%
                              <LoadingSpinner />
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="file-upload"
                      className={`inline-flex items-center px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-100 ${
                        profileUploadProgress > 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Camera className="mr-2  h-4 w-4" />
                      {profileUploadProgress > 0
                        ? "Uploading..."
                        : "Change Picture"}
                    </label>

                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                      disabled={profileUploadProgress > 0}
                    />

                    <p className="text-sm text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </CardContent>
              </Card>
              // </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
