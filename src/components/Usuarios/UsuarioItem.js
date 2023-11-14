import React from 'react';

const UsuarioItem = ({usuario}) => {
    //console.log(usuario);
    return (
        <div className='col-md-4'>
            <div className='card card-body'>
            <h3 className='card-title'>{usuario.nombre_completo} </h3>
            </div>
        </div>
    )
}
    

export default UsuarioItem;