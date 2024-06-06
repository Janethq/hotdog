import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

const log = debug("mern:components:SignUpForm");

export default class VendorSignUpForm extends Component {
  state = {
    name: "",
    companyName: "",
    service: "",
    address: "",
    username: "",
    password: "",
    confirm: "",
    error: "",
    type: "vendor",
    openingHoursStart: "",
    openingHoursEnd: "",
    serviceDuration: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { ...this.state };
    delete formData.error;
    delete formData.confirm;

    try {
      const user = await signUp(formData);
      log("user: %o", user);
      this.props.setUser(user);
    } catch (error) {
      this.setState({ error: "Sign Up Failed" });
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <fieldset className="mb-4">
          <legend className="text-lg font-bold mb-2">Sign Up</legend>

          <label className="block mb-2">
            Name:
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Company Name:
            <input
              name="companyName"
              value={this.state.companyName}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Service:
            <input
              name="service"
              value={this.state.service}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Address:
            <input
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="openingHoursStart"
            >
              Opening Hour:
            </label>
            <input
              type="time"
              name="openingHoursStart"
              id="openingHoursStart"
              value={this.state.openingHoursStart}
              onChange={this.handleChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="openingHoursEnd"
            >
              Closing Hour:
            </label>
            <input
              type="time"
              name="openingHoursEnd"
              id="openingHoursEnd"
              value={this.state.openingHoursEnd}
              onChange={this.handleChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="serviceDuration"
            >
              Service Duration (hours):
            </label>
            <input
              type="number"
              name="serviceDuration"
              id="serviceDuration"
              value={this.state.serviceDuration}
              onChange={this.handleChange}
              className="w-full p-2 border border-gray-400 rounded-md"
            />
          </div>

          <label className="block mb-2">
            Username:
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Password:
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Confirm:
            <input
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>

          <p className="text-red-500">{this.state.error}</p>
        </fieldset>
      </form>
    );
  }
}
