import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import store from './state/store';
import Header from './components/custom/header';
import './App.css'
import { Provider } from "./components/ui/provider"
import { Toaster } from './components/ui/toaster';
import {  VStack } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';


function App () {
  return (
    <Provider>
      <ReduxProvider store={ store }>
        <Router>
          <VStack width={ '100%' } height={ '100vh' } gap={ '0px' }>
           <Header />
            <VStack width={ '100%' } flexGrow={ '1' } padding={ '20px' } pb={ '100px' } boxSizing={ 'border-box' }>
              <AppRoutes />
            </VStack>
          </VStack>
          <Toaster />
        </Router>
      </ReduxProvider >
    </Provider>

  );
}

export default App;
