import Invoice from './Pages/Invoice/Invoice';
import Product from './Pages/Product/Product';
import Report from './Pages/Report/Report';
import './App.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='tabBar'>
          <button onClick={() => {window.location.href = '/invoice'}}>Invoice</button>
          <button onClick={() => {window.location.href = '/product'}}>Product</button>
          <button onClick={() => {window.location.href = '/report'}}>Report</button>
        </div>
          <Routes>
            <Route path='/invoice' element = {<Invoice />} />
            <Route path='/product' element = {<Product />} />
            <Route path='/report' element = {<Report />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
