import React from 'react';
import Layout from './hoc/Layout/Layout'
import Sms from './containers/Sms/Sms'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        <Sms/>
      </Layout>
    </div>

  );
}

export default App;
