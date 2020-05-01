import React from 'react'

export default class extends React.Component {
    render(){
        return (
            <div className="modal">
                <button className="close-modal" onClick={this.props.cerrar}>X</button>
                { 
                    this.props.children
                }
            </div>
        )
    }
}