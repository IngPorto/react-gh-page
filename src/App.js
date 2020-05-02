import React from 'react';
import './App.css';
import tareas from './sample/tareas.json'
import Tareas from './components/Tareas'
import Formulariotarea from './components/FormularioTareas'
import Modal from './components/Modal'
import Publicaciones from './components/Publicaciones'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      app_route: '/react-gh-page',
      is_mensaje: true,
      tareas: tareas,
      is_editorTarea: false,
      tareaEnModificacion: null // type Object
    }
  }

  cambiarVisibilidad = () =>{
    this.setState({
      ...this.state,
      is_mensaje: !this.state.is_mensaje
    })
  }

  eliminarTarea = idTarea => {
    const newArr = this.state.tareas.filter(tarea => tarea.id !== idTarea)
    this.setState({
      ...this.state,
      tareas: newArr
    })
  }

  ponerTarea = (id, title, description, done, form) =>{
    id = id || [Math.floor(Math.random()*100)]
    done = done || false
    const newArr = this.state.tareas
    newArr.push({
      id,
      title,
      description,
      done
    })

    this.setState({
      ...this.state,
      tareas: newArr
    }, () => {
      form.cleanFields()
    })
  }

  modificarTarea = (id, title, description, done, form) =>{
    console.log("modificando tarea")
    const newArr = this.state.tareas.map( tarea =>{
      if( tarea.id === this.state.tareaEnModificacion.id ){
        tarea.title = title
        tarea.description = description
        tarea.done = done
      }
      return tarea
    })
    this.setState({
      ...this.state,
      is_editorTarea: false,
      tareas: newArr
    }, ()=>{
      //form.cleanFields()
      this.setState({
        ...this.state,
        tareaEnModificacion: null
      })
    })
  }

  abrirEditorTarea = (id, title, description, done) => {
    this.setState({
      ...this.state,
      is_editorTarea: false
    }, () =>{
      this.setState({
        ...this.state,
        is_editorTarea: true,
        tareaEnModificacion: {id, title, description, done}
      })
    })
  }

  cerrarModal = () => {
    this.setState({
      ...this.state,
      is_editorTarea: false
    })
  }

  cambiarEstado = idTarea =>{
    const newArr = this.state.tareas.map(tarea => {
      if( tarea.id === idTarea) tarea.done = !tarea.done
      return tarea
    })
    this.setState({
      ...this.state,
      tareas: newArr
    })
  }
  
  /**
   * Convertir texto unicode de fomato \u... a un código entendible por html
   * aunque también se puede hacer embebiendo el HTML Entity (decimal), ej.: <span>&#9995;</span> 
   * @param {string} text 
   * @return {string} devuelve una cadena creada mediante el uso de una secuencia de valores Unicode especificada
   */
  convertUnicode = text => {
    return text.replace(/\\u(\w\w\w\w)/g,function(a,b) {
      var charcode = parseInt(b,16);
      return String.fromCharCode(charcode);
    });
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Link to={this.state.app_route + '/'}>Home</Link>
          <Link to={this.state.app_route +'/publicaciones'}>Publicaciones</Link>
          <Route 
            exact
            path={this.state.app_route + '/'}
            render={()=>{
              return (
                <div>
                  <Formulariotarea ponerTarea={this.ponerTarea}/>
                  <button onClick={ this.cambiarVisibilidad }>{ this.state.is_mensaje ? this.convertUnicode("\u274C"): '👀'}</button>
                  { 
                    this.state.is_mensaje &&
                      this.state.tareas.map( tarea =>  <Tareas key={tarea.id} tarea={tarea} eliminar={this.eliminarTarea} cambiarEstado={this.cambiarEstado} abrirEditor={this.abrirEditorTarea}/> )
                  }
                  {
                    this.state.is_editorTarea &&
                      <Modal cerrar={this.cerrarModal}>
                        <Formulariotarea ponerTarea={this.modificarTarea} parametrosPorDefecto={this.state.tareaEnModificacion}/>
                      </Modal>
                  }
                </div>
              )
            }}>
          </Route>
          <Route 
            path={this.state.app_route +'/publicaciones'}
            component={Publicaciones} />
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
