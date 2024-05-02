import { ToastContainer } from 'react-toastify';

import { ApiResponseProvider } from '../../contexts/apiContext';
import { AuthProvider } from '../../contexts/authContext';
import { StoredDropdownProvider } from '../../contexts/dropdownItemsContext';
import { EditOptionsProvider } from '../../contexts/editOptionsContext';
import { UserInterfaceProvider } from '../../contexts/userInterfaceContext';
import { Demo } from './Demo';

const Index = () => {
  return (
    <AuthProvider>
      <UserInterfaceProvider>
        <StoredDropdownProvider>
          <EditOptionsProvider>
            <ApiResponseProvider>
              <ToastContainer />
              <Demo />
            </ApiResponseProvider>
          </EditOptionsProvider>
        </StoredDropdownProvider>
      </UserInterfaceProvider>
    </AuthProvider>
  );
};

export default Index;
