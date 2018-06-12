import React, { Component } from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /// FROM AUTH VIDEO
  signup(res, type) {
    let postData;
    if (type === "facebook" && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.providerpic
      };
    }

    if (type === "google" && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.EL,
        token: res.zi.access_Token,
        provider_pic: res.w3.paa
      };
    }

    loginUser("login", this.state).then(result => {
      let responseJson = result;
      if (responseJson.userData) {
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({ errors: true });
      }
    });
  }

  ///// End youtube login vid stuff

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  /// This is calling the action "loginUser" from authActions.js
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // FROM AUTH YOUTUBE VID
    const responseFacebook = response => {
      console.log(response);
    };

    const responseGoogle = response => {
      console.log(response);
    };
    /// Not from vid keep all this stuff
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Munition account
              </p>
              <GoogleLogin
                clientId="818858352397-q85q3mmq23n706hq690b9trlp70j0iai.apps.googleusercontent.com"
                buttonText="Login w/ google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />

              <FacebookLogin
                appId="1827008524270998"
                autoLoad={true}
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
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
