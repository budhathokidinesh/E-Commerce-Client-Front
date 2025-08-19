const AccountDetails = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Account Details</h2>
      <Separator className="mb-4" />
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="example@mail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="*******"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone number</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="0499496139"
          />
        </div>
        <div>Location :</div>
        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Suburb</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Suburb"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Postcode</label>
          <input
            type="number"
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
          <Button type="submit">Save</Button>{" "}
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
