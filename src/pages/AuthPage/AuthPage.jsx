import LoginForm from "../../components/LoginForm/LoginForm";
import DogOwnerSignUpForm from "../../components/SignUpForm/DogOwnerSignUpForm";
import VendorSignUpForm from "../../components/SignUpForm/VendorSignUpForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [loginType, setLoginType] = useState(null);

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };

  return (
    <>
      <LoginForm setUser={setUser} />
      <select
        name="loginType"
        onChange={handleLoginTypeChange}
        className="w-48 mx-auto p-2 pl-10 text-sm text-gray-700"
      >
        <option value="">Select Registration type</option>
        <option value="dogOwner">Dog Owner</option>
        <option value="vendor">Vendor</option>
      </select>
      {/* if select dog owner, the dog owner signup form will render */}
      {loginType === "dogOwner" && <DogOwnerSignUpForm setUser={setUser} />}
      {loginType === "vendor" && <VendorSignUpForm setUser={setUser} />}
    </>
  );
}
