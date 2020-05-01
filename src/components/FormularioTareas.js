import React from 'react'


export default class extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            title: '',
            description: '',
            done: ''
        }
    }

    componentDidMount(){
        this.props.parametrosPorDefecto &&
            this.setState( this.props.parametrosPorDefecto )
    }

    componentWillUnmount(){
        this.cleanFields()
    }

    handleOnSubmit = e => {
        e.preventDefault();
        this.state.title !== '' && this.state.description !== '' &&
            this.props.ponerTarea(this.state.id, this.state.title, this.state.description, this.state.done, this);
    }

    capturarTexto = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, ()=> {console.log(this.state)})
        
    }

    cleanFields = () =>{
        this.setState({
            ...this.state,
            id: '',
            title: '',
            description: '',
            done: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleOnSubmit} className={ "form " + (this.props.parametrosPorDefecto && "modal-tarjeta")}>
                <input 
                    className="formTarea-title"
                    type="text"
                    name="title"
                    placeholder="Escribe una tarea" 
                    onChange={this.capturarTexto}
                    value={this.state.title} />
                <textarea 
                    className="formTarea-description"
                    name="description"
                    placeholder="Descripción de la tarea" 
                    onChange={this.capturarTexto}
                    value={this.state.description}>
                </textarea>
                <button className="formTarea-boton" type="submit">{ this.props.parametrosPorDefecto ? "Modificar":"Crear"}</button>
            </form>
        )
    }
}