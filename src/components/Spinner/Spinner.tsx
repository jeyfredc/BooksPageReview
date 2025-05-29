

import { useAppStore } from '../../stores/UseAppStore';
import './Spinner.css';

const Spinner = () => {
  const { loading } = useAppStore()  
  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="loading-container">

            <div className="spinner"></div>
          </div>
          <div className="loading-text">
          ...Cargando

          </div>
        </div>
      )}
    </>
  );
};

export default Spinner;
