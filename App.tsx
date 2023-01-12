import AppRoot from './src/AppRoot'
import { store } from './src/store'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';

export default function App() {

  return (
    <Provider store={store} >
      <AppRoot />
      <Toast />
    </Provider>
  );
}


