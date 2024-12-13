import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import './App.css'
import { Provider } from "./components/ui/provider"
import { Center, VStack } from '@chakra-ui/react';
import Register from './pages/Register';
import { Toaster } from './components/ui/toaster';
import Dashboard from './pages/dashboard';
import { Provider as ReduxProvider } from 'react-redux'
import store from './state/store';
import Header from './components/custom/header';

function App () {
  return (
    <Provider>
      <ReduxProvider store={ store }>
        <Router>
          <VStack width={ '100%' } height={ '100vh' } gap={ '0px' }>
           <Header />
            <VStack width={ '100%' } flexGrow={ '1' } padding={ '20px' } pb={ '100px' } boxSizing={ 'border-box' }>
              <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path="/dashboard" element={ <Dashboard /> }>

                </Route>
                <Route path='*' element={ <Center>404 - page not found</Center> } />
              </Routes>
            </VStack>
          </VStack>
          <Toaster />
        </Router>
      </ReduxProvider >
    </Provider>

  );
}

export default App;
