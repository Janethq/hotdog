import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

const log = debug("mern:components:SignUpForm");

export default class DogOwnerSignUpForm extends Component {
  state = {
    name: "",
    dogName: "",
    breed: "",
    weight: "",
    username: "",
    password: "",
    confirm: "",
    error: "",
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
            Dog Name:
            <input
              name="dogName"
              value={this.state.dogName}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Breed:
            <input
              name="breed"
              value={this.state.breed}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

          <label className="block mb-2">
            Weight:
            <input
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
          </label>

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
