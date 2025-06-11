import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
function App() {
  return (
    <>
      <h1>Welcome to My Website</h1>
      <div className="one">
        <div className="card " style={{width: '18rem'}}> 
          <img src="vite.svg" className="card-img-top" style={{ width: '100px', height: '200px' }} alt="Song"/> 
          <div className="card-body">
            <h5 className="card-title">Card title</h5> 
            <p className="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">Go somewhere</a> 
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
