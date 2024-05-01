import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './components/Spinner/Spinner.css';
import './components/Ripple/Ripple.css';
import './components/TextInput/TextInput.css';
import './components/Buttons/TextButton.css';

import Div100vh from 'react-div-100vh';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/authContext';
import { UserInterfaceProvider } from './contexts/userInterfaceContext';

const AppLayout = (): JSX.Element => {
  return (
    <AuthProvider>
      <UserInterfaceProvider>
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
      </UserInterfaceProvider>
    </AuthProvider>
  );
};

export default AppLayout;
