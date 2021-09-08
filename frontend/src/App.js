import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'; // no {} as this is a default export
import Search from './components/Search';

const App = () => {
  const [word, setWord] = useState(''); 
    // useState returns a stateful value and 
    // a function to update the stateful value

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(word)
  }

  console.log(word);

  return (
    <div>
      <Header title="Images Gallery"/>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
