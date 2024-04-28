import { AuthProvider } from '../../contexts/authContext';
import { UserInterfaceProvider } from '../../contexts/userInterfaceContext';
import { Demo } from './Demo';

const Index = () => {
  return (
    <AuthProvider>
      <UserInterfaceProvider>
        <Demo />
      </UserInterfaceProvider>
    </AuthProvider>
  );
};

export default Index;
