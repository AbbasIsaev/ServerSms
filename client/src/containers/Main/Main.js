import React, {Component} from 'react'
import classes from "./Main.scss"
import Auth from "../Auth/Auth";

class Main extends Component {

  render() {
    return (
      <div className={classes.Main}>
        <div>
          <h1>Sms Pro</h1>

          <Auth
            provider={'google'}
          />
        </div>
      </div>
    )
  }
}

export default Main
