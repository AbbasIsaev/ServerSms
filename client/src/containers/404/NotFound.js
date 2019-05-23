import React, {Component} from 'react'
import classes from './NotFound.scss'

class NotFound extends Component {
  render() {
    return (
      <div className={classes.NotFound}>
        <h1>404 страница не найдена</h1>
      </div>
    )
  }
}

export default NotFound
