import React, { useState } from "react";
import {
  initialSignupFormData,
  SignupFormControls,
} from "../../config/formCongif";
import { Label } from "@radix-ui/react-label";
import FormControl from "../common-Input/FormControl";
import useForm from "../../hooks/useForm";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";
import { Link } from "react-router";

const SignupForm = () => {
  const { formData, handleOnChange, setFormData } = useForm(
    initialSignupFormData
  );
  const { isLoading, startLoading, stopLoading } = useLoading();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      //api call
      toast.success("Registration Sucessfully");
      setFormData(initialSignupFormData);
    } catch (error) {
      console.error("Registartion failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      stopLoading();
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col justify-center px-10 md:px-20 ">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">User Registration Form </h3>
        <hr />
      </div>
      <div className="border ">
        <form onSubmit={handleOnSubmit} className="space-y-4" autoComplete="on">
          {SignupFormControls.map((field, index) => (
            <div key={index}>
              {field.name === "password" ||
              field.name === "confirm-password" ? (
                <div>
                  <Label
                    htmlFor={field.name}
                    className="block text-sm   font-bold text-gray-900 dark:text-white "
                  >
                    {field.label}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      placeholder={field.placeholder}
                      required
                      id={field.name}
                      className="pr-10"
                      autoComplete="current-password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <FormControl
                  label={field.label}
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
                />
              )}
            </div>
          ))}
          {/*Signup button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900"
              //   disabled={isLoading}
            >
              Signup
            </Button>
          </div>
        </form>
        <div>
            <p >Already have account? <Link to="/login" className="cursor:pointer text-gray-500 hover:text-gray-700">Sign In</Link> </p>
        </div>
      </div>
      {/* button */}
    </div>
  );
};

export default SignupForm;
