import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../../contexts/authContext';
import { UserInterfaceProvider } from '../../contexts/userInterfaceContext';
import { Demo } from './Demo';
import { EditOptionsProvider } from '../../contexts/editOptionsContext';
import { StoredDropdownProvider } from '../../contexts/dropdownItemsContext';

const Index = () => {
  return (
    <AuthProvider>
      <UserInterfaceProvider>
        <StoredDropdownProvider>
          <EditOptionsProvider>
            <ToastContainer />
            <Demo />
          </EditOptionsProvider>
        </StoredDropdownProvider>
      </UserInterfaceProvider>
    </AuthProvider>
  );
};

export default Index;
