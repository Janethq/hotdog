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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <LoginForm setUser={setUser} />
        <select
          name="loginType"
          onChange={handleLoginTypeChange}
          className="w-48 p-2 text-sm text-gray-700 border border-gray-300 rounded-md"
        >
          <option value="">Sign up</option>
          <option value="dogOwner">Dog Owner</option>
          <option value="vendor">Vendor</option>
        </select>
      </div>
      {/* Render signup forms based on loginType */}
      {loginType === "dogOwner" && <DogOwnerSignUpForm setUser={setUser} />}
      {loginType === "vendor" && <VendorSignUpForm setUser={setUser} />}
    </div>
  );
}
