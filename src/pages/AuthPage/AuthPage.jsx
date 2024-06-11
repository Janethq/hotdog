import LoginForm from "../../components/LoginForm/LoginForm";
import DogOwnerSignUpForm from "../../components/SignUpForm/DogOwnerSignUpForm";
import VendorSignUpForm from "../../components/SignUpForm/VendorSignUpForm";
import { useState } from "react";
import bgImage from "../../assets/bg1.png";

export default function AuthPage({ setUser }) {
  const [loginType, setLoginType] = useState(null);

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };

  return (
    <div
      className={`h-screen w-screen bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-screen flex">
        <div className="flex flex-col items-center space-y-4 ml-10 mt-20">
          <div className="bg-opacity-0 p-4 rounded-md shadow-md w-80">
            <LoginForm setUser={setUser} />
          </div>
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
        <div className="absolute top-20 right-10">
          <div className="bg-opacity-0 p-4 rounded-md shadow-md w-85 h-96 overflow-y-auto">
            {/* Render signup forms based on loginType */}
            {loginType === "dogOwner" && (
              <DogOwnerSignUpForm setUser={setUser} />
            )}
            {loginType === "vendor" && <VendorSignUpForm setUser={setUser} />}
          </div>
        </div>
      </div>
    </div>
  );
}
