import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import './App.css'
import { Provider } from "./components/ui/provider"
import { Center, VStack } from '@chakra-ui/react';
import Register from './pages/Register';

function App () {
  return (
    <Provider>
      <Router>
        <VStack width={ '100%' } height={ '100vh' } gap={ '0px' }>
          <div className='header'>
            <span>Artist Management System</span>
          </div>
          <VStack width={ '100%' } flexGrow={ '1' } padding={'20px'} boxSizing={'border-box'}>
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='*' element={ <Center>404 - page not found</Center> } />
            </Routes> 
          </VStack>
        </VStack>
      </Router>
    </Provider>

  );
}

export default App;
