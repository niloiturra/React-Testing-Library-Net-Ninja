import './App.css';
import Banner from './components/Banner/Banner';
import { Switch, Route } from 'react-router-dom';
import InitialPage from './pages/InitialPage/InitialPage';

function App() {
  return (
    <div className="App">
      <Banner />
      <Switch>
        <Route strict exact path="/" component={InitialPage} />
      </Switch>
    </div>
  );
}

export default App;
