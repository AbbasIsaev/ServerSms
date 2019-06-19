import React, {Component} from 'react'
import PropTypes from 'prop-types'
import socket from "../../socket/socket";
import Button from "../../components/UI/Button/Button";
import {setLoadingButton, setUserAndToken, TOKEN_KEY} from "../../store/actions/auth";
import {connect} from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./Auth.scss"

class Auth extends Component {

  componentDidMount() {
    const {provider} = this.props;

    socket.getAuth(provider, (err, data) => {
      const {user, token} = data;
      localStorage.setItem(TOKEN_KEY, token);
      this.props.setUserAndToken(user, token);
      if (this.popup) {
        this.popup.close()
      }
    })
  }

  componentWillUnmount() {
    socket.offAll();
  }

  openPopup() {
    const {provider} = this.props;
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const socketId = socket.getSocketId();
    const url = `${process.env.API_URL}/auth/${provider}?socketId=${socketId}`;

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  checkPopup() {
    const check = setInterval(() => {
      const {popup} = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.props.setLoadingButton(this.props.provider, false)
      }
    }, 1000)
  }

  startAuth = () => {
    if (!this.props.loadingButton) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.props.setLoadingButton(this.props.provider, true)
    }
  };

  render() {
    const displayName = this.props.user ? this.props.user.displayName : null;
    const {provider} = this.props;

    return (
      <div className={classes.Auth}>
        {displayName
          ?
          <h4>{`${displayName}`}</h4>
          :
          <React.Fragment>
            {this.props.loadingButton
              ? <Loader/>
              :
              <Button
                onClick={this.startAuth}
              >
                Войти через {provider}
              </Button>
            }
          </React.Fragment>
        }
      </div>
    )
  }
}

Auth.propTypes = {
  provider: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    loadingButton: state.auth.loadingButton,
    user: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLoadingButton: (strategy, flag) => dispatch(setLoadingButton(strategy, flag)),
    setUserAndToken: (user, token) => dispatch(setUserAndToken(user, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
