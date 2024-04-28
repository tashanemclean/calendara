import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './components/Ripple/Ripple.css';
import './components/TextInput/TextInput.css';
import './components/Buttons/TextButton.css';

import Div100vh from 'react-div-100vh';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

const AppLayout = (): JSX.Element => {
  return (
    <AuthProvider>
      <Div100vh>
        <ToastContainer />
        <div className="app">
          <Div100vh>
            <section className="app-content">
              <Outlet />
            </section>
          </Div100vh>
        </div>
      </Div100vh>
    </AuthProvider>
  );
};

export default AppLayout;
