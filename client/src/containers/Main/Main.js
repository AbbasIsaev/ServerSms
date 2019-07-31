import React, {Component} from 'react'
import classes from "./Main.scss"
import Auth from "../Auth/Auth";

class Main extends Component {

  render() {
    return (
      <div className={classes.Main}>
        <h1>SmsApp</h1>

        <Auth
          provider={'google'}
        />
      </div>
    )
  }
}

export default Main
