import { useEffect, useState } from 'react'

import { Header, ListadoGastos, Modal, Filtros, Gasto } from './components'

import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

export const App = () => {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    Object.keys(gastoEditar).length > 0 && handleNuevoGasto();
  }, [ gastoEditar ])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])
  
  useEffect(() => {
    if (filtro) {
      //Filtrar gastos por categoria
      const GastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );

      setGastosFiltrados(GastosFiltrados);
    }
  }, [filtro])
  

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if ( presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])
  

  const handleNuevoGasto = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto =>{
        if (gasto.id) {
          //Actualizar
          const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState )
          setGastos(gastosActualizados);
        } else {
          gasto.id = generarId();
          gasto.fecha = Date.now();
          setGastos([ ...gastos, gasto ]);
        }
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500); 
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
    setGastos( gastosActualizados );
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={ presupuesto } 
        setPresupuesto={ setPresupuesto }
        isValidPresupuesto = { isValidPresupuesto }
        setIsValidPresupuesto = { setIsValidPresupuesto }
        gastos = { gastos }
        setGastos = { setGastos }
      />

      {
        (isValidPresupuesto)
        &&
        (
          <>
            <main>
              <Filtros 
                filtro = { filtro }
                setFiltro = { setFiltro }
              />
              <ListadoGastos 
                gastos={ gastos } 
                setGastoEditar = { setGastoEditar } 
                eliminarGasto = { eliminarGasto }
                filtro = { filtro }
                gastosFiltrados = { gastosFiltrados }
              />
            </main>
            <div className='nuevo-gasto'>
              <img 
                src={ IconoNuevoGasto }
                alt='icono nuevo gasto'
                onClick={ handleNuevoGasto }
              />
            </div>
          </>
        )
      }

      {
        (modal) && 
        (<Modal 
            setModal = { setModal }
            animarModal = { animarModal }
            setAnimarModal = { setAnimarModal }
            guardarGasto = { guardarGasto }
            gastoEditar = { gastoEditar }
            setGastoEditar = { setGastoEditar } 
        />)

      }
    </div>
  )
}
