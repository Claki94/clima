import React, {Fragment, useState, useEffect} from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar) {
        const appId = 'fc4e3f364f06ee7e9e12eef1527d0e2f';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        let respuesta = await fetch(url);
        let resultado = await respuesta.json();

        console.log(resultado);
      }
    }

    consultarAPI();

  }, [consultar]);

  return (
    <Fragment>
        <Header 
          titulo="Climaton"
        />

        <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario 
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                />
              </div>
              <div className="col m6 s12">
                2
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
