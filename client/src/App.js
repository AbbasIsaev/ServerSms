import React from 'react';
import Layout from './hoc/Layout/Layout'
import Sms from './containers/Sms/Sms'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import NotFound from "./containers/404/NotFound";

function App() {
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
        <Switch>
          <Route path="/" exact component={Sms}/>
          <Route path="/sms" component={Sms}/>
          <Route path="/auth" component={Auth}/>
          {/*<Redirect from="/sms2" to="/sms"/>*/}
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
