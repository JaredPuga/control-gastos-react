import { useState, useEffect } from 'react';
import cerrarBtn from '../img/cerrar.svg';
import { Mensaje } from './Mensaje';

export const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState(gastoEditar.id);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])
    

    const cerrarModal = () => {  
        setAnimarModal(false);
        
        setTimeout(() => {
            setModal(false);
            setGastoEditar({})
        }, 500);
    }

    const handleSubmit = evt => {
        evt.preventDefault();

        if ( [ nombre, cantidad, categoria ].includes('') ) {
            setMensaje('Todos los campos son obligatorios');
            
            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return;
        }
        setGastoEditar({})
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={ cerrarBtn }
                alt='Boton para cerrar modal'
                onClick={ cerrarModal }
            />
        </div>

        <form className={ `formulario ${ animarModal ? 'animar' : 'cerrar' }` } onSubmit = { handleSubmit }>
            <legend>{ gastoEditar.nombre ? 'Editar gasto' : 'Nuevo Gasto' }</legend>
            {
                mensaje && <Mensaje tipo='error'> { mensaje } </Mensaje>
            }
            <div className='campo'>
                <label htmlFor='nombre'>Nombre gasto</label>
                <input
                    id='nombre'
                    type='text'
                    placeholder='Añade el nombre del gasto'
                    value={ nombre }
                    onChange={ ({target}) => setNombre(target.value) }
                    autoComplete = 'off'
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input
                    id='cantidad'
                    type='number'
                    placeholder='Añade la cantidad del gasto: ej. 300' 
                    value={ cantidad }
                    onChange={ ({target}) => setCantidad(Number(target.value)) }
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantegoria'>Categoria</label>
                <select 
                    id='categoria'
                    value={ categoria }
                    onChange={ ({target}) => setCategoria(target.value) }
                >
                    <option value=''>-- seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos Varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>

            <input 
                type='submit'
                value={ gastoEditar.nombre ? 'Guardar cambios' : 'Añadir Gasto' }
            />

        </form>
    </div>
  )
}
