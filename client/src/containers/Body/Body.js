import React, {Component} from 'react'
import classes from "./Body.scss"

class Body extends Component {

  render() {
    return (
      <div className={classes.Body}>
        <h2>Добро пожаловать в SmsApp!<br/><br/>
          SmsApp - приложение для автоматической рассылки sms сообщений, работает в связке с мобильным
          приложением.</h2>
      </div>
    )
  }
}

export default Body
