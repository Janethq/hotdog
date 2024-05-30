import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";

const log = debug("mern:components:SignUpForm");

export default class SignUpForm extends Component {
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
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>SignUp</legend>

          <label>
            Name:
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Dog Name:
            <input
              name="dogName"
              value={this.state.dogName}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Breed:
            <input
              name="breed"
              value={this.state.breed}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Weight:
            <input
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Username:
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Password:
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Confirm:
            <input
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <button>Sign Up</button>
          <p>{this.state.error} </p>
        </fieldset>
      </form>
    );
  }
}
