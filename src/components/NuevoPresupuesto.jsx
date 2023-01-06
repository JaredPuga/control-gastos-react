import { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = ( evt ) => {
        evt.preventDefault();

        if (!presupuesto || presupuesto < 0 ) { 
            setMensaje('No es un presupuesto válido');
            return
        } 

        setMensaje('');
        setIsValidPresupuesto(true);
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={ handlePresupuesto }>
            <div className='campo'>
                <label>Definir presupuesto</label>
                <input
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Añade tu presupuesto'
                    value={presupuesto}
                    onChange={ ({target}) => setPresupuesto(Number(target.value)) }
                />
            </div>

            <input 
                type='submit'
                value='Añadir'
            />

            { mensaje && <Mensaje tipo='error'>{ mensaje }</Mensaje> }
        </form>
    </div>
  )
}
