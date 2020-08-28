import React, {Fragment, useState, useEffect} from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {

  // States de la busqueda, si se hace la consulta y el resultado de la misma
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});

  // Destructuring de la busqueda para facilitar su lectura
  const {ciudad, pais} = busqueda;

  // Funcion asíncrona que hace la petición GET a la API para obtener el resultado
  const consultarAPI = async () => {
    const appId = 'fc4e3f364f06ee7e9e12eef1527d0e2f';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    let respuesta = await fetch(url);
    let resultado = await respuesta.json();

    guardarResultado(resultado);
    guardarConsultar(false);
  }

  // Hook que se ejecuta cada vez que se modifica el state de consultar (si este es true)
  useEffect(() => {

    if(consultar) {
      consultarAPI();
    }

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
                <Clima 
                  resultado={resultado}
                />
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
