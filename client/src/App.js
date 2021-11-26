import './App.css'
import { useState } from 'react'
import axios from "axios";

function App() {
  const [mode, setMode] = useState('upload');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    let res = await uploadFile(file);
    console.log(res.data);
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("file", file);

    console.log('This is csv file', file);

    return await axios.post("http://localhost:5000/upload", formData);
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const showResults = () => {
    axios.get("http://localhost:5000/products/").then(res => {
      console.log('data', res.data);
      setProducts(res.data);
      setMode('view');
    }).catch(e=> console.log(e))
  }
  const validate = (data) => {
    if(!data.id || !data.name || !data.picture.url){
      setError('Error');
      return false;
    }
    return true
  };
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{flexGrow: 1}}></div>
        <button>Validate</button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
        <button onClick={() => setMode('upload')}>Products</button>
        <button onClick={() => showResults()}>Results</button>
      </div>
      {mode === 'upload' && <div>
      <form onSubmit={handleSubmit}>
        <h1>Products File Upload</h1>
        <input type="file" onChange={handleOnChange} />
        <button type="submit">Upload File</button>
      </form>
      </div>}
      {mode === 'view' && <div>
        {products.map(product => {
          if (validate(product)) return (
              <div key={product.id} style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <span style={{color: 'green'}}>OK</span>
                <span>{product.id}</span>
                <span>{product.name}</span>
                <img src={product.picture.url} />
              </div>
            );
          else return (
            <div key={product.id} style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
              <span style={{color: 'red'}}>ERROR</span>
              <span>{error}</span>
            </div>
          );
        })}
      </div>}
    </div>
  )
}

export default App;
