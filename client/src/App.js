import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import Sms from './containers/Sms/Sms'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Route, Switch} from "react-router-dom";
import NotFound from "./containers/404/NotFound";
import Log from "./containers/Log/Log";
import Main from "./containers/Main/Main";
import {connect} from "react-redux";
import Logout from "./components/UI/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route component={NotFound}/>
      </Switch>
    );
    if (this.props.isAutenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/sms" component={Sms}/>
          <Route path="/log" component={Log}/>
          <Route path="/logout" component={Logout}/>
          {/*<Redirect from="/sms2" to="/sms"/>*/}
          <Route component={NotFound}/>
        </Switch>
      );
    }

    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover
        />
        <Layout>
          {routes}
        </Layout>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    isAutenticated: !!state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
