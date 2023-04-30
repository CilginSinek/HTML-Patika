import {CountryProvider} from './contexts/Countrycontex.js'
import Container from './components/Container.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <CountryProvider>
        <Container/>
      </CountryProvider>
    </div>
  );
}

export default App;
