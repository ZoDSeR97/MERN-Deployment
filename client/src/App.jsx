import './App.css';
import {Routes, Route} from 'react-router-dom'
import Stores from './components/Stores';
import AddStore from './components/AddStore';
import ModifyStore from './components/ModifyStore';
import Store from './components/Store';

function App() {
  return (
    <div>
      <h1>Store Finder</h1>
      <Routes>
        <Route path='/' element={<Stores />} />
        <Route path='/stores/add' element={<AddStore />} />
        <Route path='/stores/edit/:id' element={<ModifyStore />} />
        <Route path='/stores/:id' element={<Store />} />
      </Routes>
    </div>
  );
}

export default App;
