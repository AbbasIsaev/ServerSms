import React, {Component} from 'react'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from 'react-router-dom'
import classes from './Drawer.scss'

class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [];

    if (this.props.isAutenticated) {
      links.push({to: '/sms', label: 'Создать СМС', exact: false});
      links.push({to: '/log', label: 'Логи', exact: false});
      links.push({to: '/logout', label: 'Выход', exact: false});
    } else {
      links.push({to: '/', label: 'Главная', exact: true});
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </React.Fragment>
    )
  }

}

export default Drawer
