import React from "react";
import Tabs from "../../containers/Tab";
import CreateUserForm from "./CreateUserForm";
import LoginForm from "./LoginForm";
class LoginPage extends React.Component {
  render() {
    return (
      <Tabs>
        <div title="Login">
          <LoginForm />
        </div>
        <div title="Create User">
          <CreateUserForm />
        </div>
      </Tabs>
    );
  }
}

export default LoginPage;
