import React, {Component} from 'react'
import Button from "../../components/UI/Button/Button";
import axios from "../../axios/axios-sms";
import {toast} from "react-toastify";
import {Enam} from "../../utils/Enam";
import classes from "./Main.scss"

class Main extends Component {
  loginHandler = () => {
    axios.get("/auth/google")
      .then(response => {
        debugger
      })
      .catch(error => {
        toast.error(Enam.Error(error));
      })
  };

  render() {
    return (
      <div className={classes.Main}>
        <div>
          <h1>Sms Pro</h1>
          <Button
            onClick={this.loginHandler}
          >
            Войти G+
          </Button>
        </div>
      </div>
    )
  }
}

export default Main
