import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux'
import store from './state/store';
import Header from './components/custom/header';
import './App.css'
import { Provider } from "./components/ui/provider"
import { Toaster } from './components/ui/toaster';
import {   HStack, VStack } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';


function App () {
  return (
    <Provider>
      <ReduxProvider store={ store }>
        <Router>
          <VStack width={ '100%' } height={ '100vh' } gap={ '0px' }>
           <Header />
            <VStack width={ '100%' } flexGrow={ '1' } padding={ '20px' } boxSizing={ 'border-box' } justifyContent={ 'space-between' }>
              <VStack width={ '100%' } alignItems={'flex-start'}>
                <AppRoutes />
              </VStack>
              <HStack fontSize={'0.8em'} width={'100%'} pt={'0.5em'}  borderTop={'1px solid #bbb;'} justifyContent={'space-between'}>
                <p >Cloco Nepal Placement Task, by <a target='_blank' rel='noreferrer' style={ { color: "blueviolet" } } href="mailto:arjunq21@gmail.com">Arjun Adhikari</a>. </p>
                <a target='_blank' rel='noreferrer' style={ { color: "blueviolet" } } href='https://github.com/arjunQ21/artist-mgmt-cloconp/commits/main/'>View Dev Logs</a>
              </HStack>
            </VStack>
          </VStack>
          <Toaster />
        </Router>
      </ReduxProvider >
    </Provider>

  );
}

export default App;
