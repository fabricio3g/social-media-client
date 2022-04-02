import {BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import "./App.css";
import Main from './components/Main';
import { AuthProvider } from './utils/contextAuth';
import AuthRoute from './utils/AuthRoute';
import { Route } from 'react-router-dom';
import SinglePost from './pages/SinglePost'
function App() {
  return (
    <AuthProvider>
    <div>
    <Router>
      <Main>
      <Route exact path='/post/:postId' component={SinglePost}/>
      <Route exact path='/' component={Home}/>
      <AuthRoute exact path='/login' component={Login}/>
      <AuthRoute exact path='/register' component={Register}/>
      </Main>
    </Router>
 
  </div>
  </AuthProvider>
  );
}

export default App;
