import { useState } from "react"; 
import axios from "axios"; 

function App() { 
  const [file, setFile] = useState(null); 
  const [prediction, setPrediction] = useState(null); 

  const handleFileChange = (event) => { 
    setFile(event.target.files[0]); 
  };

  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    const formData = new FormData(); 
    formData.append("file", file); 

    try {
      const response = await axios.post( 
        "https://web-production-a5783.up.railway.app/predict", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      setPrediction(response.data); 
    } catch (error) {
      console.error("Error uploading file:", error); 
    }
  };

  return ( 
    <div className="container"> 
      <h1 className="mt-5">Upload Gambar dan Dapatkan Prediksi</h1> 
      <form onSubmit={handleSubmit}> 
        <div className="form-group"> 
          <label htmlFor="fileInput">Pilih Gambar</label> 
          <input
            type="file" 
            className="form-control" 
            id="file" 
            onChange={handleFileChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3"> 
          Unggah
        </button>
      </form>
      {prediction && ( 
        <div className="mt-5"> 
          <h3>Hasil Prediksi</h3> 
          <pre>{JSON.stringify(prediction, null, 2)}</pre> 
        </div>
      )}
    </div>
  );
}

export default App; 
