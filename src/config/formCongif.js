//This is for login
export const LogInFormControls = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autComplete: "current-password",
  },
];

//Initial forgot password form
export const initialForgotPasswordFormData = {
  email: "",
};

//This is for forgot password
export const ForgotPasswordFormControls = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
];
//This is for reset password
export const ResetPasswordFormControls = [
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your new password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your new password",
    autoComplete: "new-password",
  },
];
//Initial reset password form data
export const initialresetPasswordFormData = {
  newPassword: "",
  confirmPassword: "",
};
//initial login form
export const initialLoginFormData = {
  email: "",
  password: "",
};

export const SignupFormControls = [
  {
    name: "fName",
    label: "First Name",
    type: "text",
    placeholder: "Enter  your First Name",
    autoComplete: "given-name",
  },
  {
    name: "lName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter  your Last Name",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter  your email address",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter  your phone number",
    autoComplete: "tel",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter  your password",
    autComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "ConfirmPassword",
    type: "password",
    placeholder: "Confirm  your password",
    autComplete: "new-password",
  },
];

//initial login form
export const initialSignupFormData = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

//initial shipping form
export const initialShippingFormData = {
  email: "",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phoneNumber: "",
};

//shipping formcontrol
export const ShippingFormControls = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Email*",
    autoComplete: "email",
    layout: "single",
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First Name*",
    autoComplete: "given-name",
    layout: "grid",
    gridGroup: "name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name*",
    autoComplete: "family-name",
    layout: "grid",
    gridGroup: "name",
  },
  {
    name: "street",
    label: "Street",
    type: "text",
    placeholder: "Street Address*",
    autoComplete: "address",
    layout: "grid",
    gridGroup: "address1",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "City*",
    autoComplete: "address-level2",
    layout: "grid",
    gridGroup: "address1",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "State*",
    autoComplete: "address-level1",
    layout: "grid",
    gridGroup: "address2",
  },
  {
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    placeholder: "Postal Code*",
    autoComplete: "postal-code",
    layout: "grid",
    gridGroup: "address2",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Country*",
    autoComplete: "country",
    layout: "single",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Phone Number*",
    autoComplete: "tel",
    layout: "single",
    className: "max-w-sm",
  },
];
