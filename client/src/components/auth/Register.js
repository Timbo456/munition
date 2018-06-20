import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    // The inputs need to have "bind", so instead of
    // putting .bind() on each, you can do this in the
    // constructor

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.signup = this.signup.bind(this);
  }

  // From AUTH video fb/google

  signup(res, type) {
    // let postData;

    if (type === "facebook" && res.email) {
      const newUser1 = {
        name: res.name,
        email: res.email,
        password: res.accessToken,
        password2: res.accessToken
      };
      console.log("YELLOOOOOW");
      console.log(newUser1.name);
      console.log(newUser1.password);
      console.log("DOOOoG");
      this.props.registerUser(newUser1, this.props.newUser1);
      this.props.history.push("/dashboard");
    }

    if (type === "google" && res.w3.U3) {
      const newUser = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.EL,
        token: res.zi.access_Token,
        provider_pic: res.w3.paa
      };
      console.log("GOOGLESHIT");
      registerUser(newUser, newUser.history);
    }

    // registerUser("login", postData).then(result => {
    //   let responseJson = result;
    //   if (responseJson.userData) {
    //     sessionStorage.setItem("userData", JSON.stringify(responseJson));
    //     this.setState({ errors: true });
    //   }
    // });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // This is a "Lifecycle Method"? Look this up
  // Said that this runs when you component recieves new properties
  // This is seting the Redux state possibly?
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // The 'e' is an event parameter
  // For inputs in sign up page
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //could use props here instead of state
    const { errors } = this.state;

    // FROM AUTH YOUTUBE VID
    const responseFacebook = response => {
      console.log(response);
      this.signup(response, "facebook");
    };

    const responseGoogle = response => {
      console.log(response);
      this.signup(response, "google");
    };

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>

              <p className="lead text-center">
                Create your Munition account to check out posts
              </p>

              <GoogleLogin
                clientId="818858352397-q85q3mmq23n706hq690b9trlp70j0iai.apps.googleusercontent.com"
                className="btn btn-info btn-block mt-4"
                //buttonText="Login w/ google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
              <p>Hello PP </p>

              <FacebookLogin
                appId="1827008524270998"
                autoLoad={false}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={responseFacebook}
                render={renderProps => (
                  <button onClick={renderProps.onClick}>
                    Login with Facebook
                  </button>
                )}
              />

              <p />

              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//added the "connect()" for exporting with connect, the bridge from react to redux
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
