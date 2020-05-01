import React from 'react'

export default class extends React.Component {
    state = {
        publicaciones: null
    }

    async componentDidMount(){
        let res = await fetch('https://jsonplaceholder.typicode.com/posts')
        res = await res.json()
        //console.log(res)
        this.setState({publicaciones:res})
    }

    render(){
        return(
            <div>
                <p>Publicaciones</p>
                {
                    this.state.publicaciones &&
                        this.state.publicaciones.map( publicacion => {
                            return (
                                <div key={publicacion.id}>
                                    <hr/>
                                    <p>{publicacion.title}</p>
                                    <p>{publicacion.body}</p>
                                </div>
                            )
                        })
                }
            </div>
        )
    }
}