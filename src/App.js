import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';


import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Timer from './pages/Timer'

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRouter'

import SinglePost from './pages/SinglePost'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/dolp-blog' component={Home} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/timer' component={Timer} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path="/posts/:postID" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
