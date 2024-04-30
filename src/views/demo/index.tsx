import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../../contexts/authContext';
import { UserInterfaceProvider } from '../../contexts/userInterfaceContext';
import { Demo } from './Demo';
import { EditOptionsProvider } from '../../contexts/editOptionsContext';
import { StoredDropdownProvider } from '../../contexts/dropdownItemsContext';
import { ApiResponseProvider } from '../../contexts/apiContext';

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
