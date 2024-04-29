import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../../contexts/authContext';
import { UserInterfaceProvider } from '../../contexts/userInterfaceContext';
import { Demo } from './Demo';

const Index = () => {
  return (
    <AuthProvider>
      <UserInterfaceProvider>
        <ToastContainer />
        <Demo />
      </UserInterfaceProvider>
    </AuthProvider>
  );
};

export default Index;
