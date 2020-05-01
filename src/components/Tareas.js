import React from 'react'

const Tareas = props => {
    const { id, title, description, done } = props.tarea
    return (
        <div className="mensaje animated fadeIn">
            <div className="mensaje-id">{id}</div>
            <div className="contanedor-mensaje">
                <div className="mensaje-title">{title}</div>
                <div className="mensaje-description">{description}</div>
                <div onClick={()=> props.cambiarEstado(id)} className={ "mensaje-done " + (done ? 'completa':'incompleta' )}>{done ? 'Completa':'Incompleta'}</div>
            </div>
            <button className="boton-editar" onClick={() => props.abrirEditor(id, title, description, done)}>Editar</button>
            <button className="boton-borrar" onClick={() => props.eliminar(id)}>X</button>
        </div>
    )
}

export default Tareas