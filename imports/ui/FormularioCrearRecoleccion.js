import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';


import {Recolecciones} from '../api/recolecciones.js';
import PropTypes from 'prop-types';
import { Empresas } from '../api/empresas.js';

class FormularioCrearRecoleccion extends Component {
    constructor(props){
        super(props);
        this.state={
            empresa: null,
            recolector: null,
            fecha: '',
            hora:'',
            estado:'PENDIENTE'
        };

        // Aqui van los bind 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderEmpresas = this.renderEmpresas.bind(this);
    }

    // EventHandlers
    handleChange(event) {
        //Usar destructuración de objetos, ej en la forma de empresas
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
        }

    handleSubmit(event) {
        //Usar destructuración de objetos, ej en la forma de empresas
        let recoleccion ={
            empresa: this.state.empresa,
            recolector:this.state.recolector,
            fecha: this.state.fecha,
            hora: this.state.hora,
            estado: this.state.estado
        }
        
        Meteor.call('recolecciones.add', recoleccion);

        this.setState({
            fecha: '',
            hora:'',
        });
      
        
    }

    renderEmpresas(){
        return this.props.empresas.map((r,i)=>{
            return(
                <option key={i} value ={r.nomEmpresa}> {r.nomEmpresa} </option>
            );
        })
    }




  render() {
    return (
        <div className="container">
        <form onSubmit={this.handleSubmit}>
            <h1>Insertar Recolección</h1>
            <div className="form-group">
                <label>Empresas</label>
                <select className='form-control'name='empresa' value={this.state.empresa} onChange={this.handleChange}>
                    {this.renderEmpresas()}
                </select>
            </div>
            <div className="form-group">
                <label>Fecha</label>
                <input  className="form-control" type="date" id="fecha" name="fecha" min="2018-01-01"value={this.state.nombre} onChange={this.handleChange}/>  
            </div>
            <div className="form-group">
                <label>Hora</label>
                <input className="form-control" id="hora" type="time" name="hora" value={this.state.telefono} onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>      
        </form>                    
    </div>
    )
  }
}

FormularioCrearRecoleccion.propTypes = {
    empresas: PropTypes.array.isRequired
  };
  
  export default withTracker(() => {
    Meteor.subscribe('empresas');

    return{
        empresas: Empresas.find({}).fetch(),
        user: Meteor.user(),
    };
    
  })(FormularioCrearRecoleccion);
