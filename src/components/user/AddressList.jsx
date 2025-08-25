// components/user/AddressList.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { deleteAddressAction } from "../../features/user/userAction";
import AddressModal from "../../components/user/AddressModal";

const AddressList = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddressAction(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        {/* <h2 className="text-xl font-semibold">Delivery Addresses</h2> */}
        <Button
          className="mt-3"
          onClick={() => {
            setSelectedAddress(null); // null = add new
            setModalOpen(true);
          }}
        >
          Add New Address
        </Button>
      </div>

      <ul className="space-y-3">
        {user?.address?.map((addr) => (
          <li
            key={addr._id}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p>
                {addr.street}, {addr.city}, {addr.state}
              </p>
              <p>
                {addr.country} - {addr.postalCode}
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleEdit(addr)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(addr._id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <AddressModal
        open={modalOpen}
        setOpen={setModalOpen}
        existingAddress={selectedAddress}
      />
    </div>
  );
};

export default AddressList;
