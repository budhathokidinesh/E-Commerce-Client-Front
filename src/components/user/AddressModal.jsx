// components/user/AddressModal.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addAddressAction,
  editAddressAction,
} from "../../features/user/userAction";

const AddressModal = ({ open, setOpen, existingAddress }) => {
  const dispatch = useDispatch();
  const isEdit = !!existingAddress;

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {
    if (existingAddress) setFormData(existingAddress);
    else
      setFormData({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      });
  }, [existingAddress]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (isEdit) {
      dispatch(
        editAddressAction({ ...formData, addressId: existingAddress._id })
      );
    } else {
      dispatch(addAddressAction(formData));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          {["street", "city", "state", "country", "postalCode"].map((field) => (
            <Input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field] || ""}
              onChange={handleChange}
              required
            />
          ))}
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Add Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
