import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Menu from './components/Navigation';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Projets from './pages/Projets';
import Services from './pages/Services';
import Apropos from './pages/Apropos';
import NotFoundPage from './pages/NotFoundPage';
import Contact from './pages/Contact';
import './App.css';

function App() {

  return (
    <Router>
      <div className='App'>
        <Menu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/a-propos">
            <Apropos />
          </Route>      
          <Route path="/services">
          <Services />
          </Route>
          <Route path="/projets" >
            <Projets />
          </Route>
          <Route path="/project-detail" >
            <ProjectDetailPage />
          </Route>
          <Route path="/contact">
           <Contact />
          </Route>
          <NotFoundPage />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;