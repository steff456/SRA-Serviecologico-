import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {Empresas} from '../api/empresas.js';
import PropTypes from 'prop-types';


class FormEmpresa extends Component {
    constructor(props){
        super(props);
        this.state={
            NIT: '',
            nomEmpresa:'',
            telefono: '',
            direccion: '',
            nContacto: '',
            cContacto:''

        };

        // Aqui van los bind 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // EventHandlers
    handleChange(event) {
        //Se puede utilizar destructuración de objetos
        //const value = event.target.value;
        const { value, name } = event.target;
        this.setState({
          //[event.target.name]: value
            name: value,
        });
      }

    handleSubmit(event) {
        //sobra
        let id;  
        event.preventDefault();
        //Usar destructuración de objetos
        const { NIT, nomEmpresa, telefono, direccion, nContacto, cContacto } = this.state
        let empresa ={
            NIT,
            nomEmpresa,
            telefono,
            direccion,
            nContacto,
            cContacto,
        }

        Meteor.call('empresas.add', empresa);   
        
        this.setState({
            NIT: '',
            nomEmpresa:'',
            telefono: '',
            direccion: '',
            nContacto: '',
            cContacto:''
        });
      }


  render() {
    return (
        <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h1>Insertar empresa</h1>
                <div className="form-group">
                    <label>NIT</label>
                    <input className="form-control" type="text" name ="NIT" id="NIT"  value={this.state.NIT} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Nombre Empresa</label>
                    <input className="form-control" type="text" name ="nomEmpresa" id="nomEmpresa" value={this.state.nomEmpresa} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label>Telefono</label>
                    <input className="form-control" type="text" name ="telefono" id="telefono" value={this.state.telefono} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input className="form-control"  type="text" name ="direccion" id="direccion" value={this.state.direccion} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Nombre contacto</label>
                    <input className="form-control" type="text" name ="nContacto" id="nContacto" value={this.state.nContacto} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Cargo contacto</label>
                    <input className="form-control" type="text" name ="cContacto" id="cContacto" value={this.state.cContacto} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>      
            </form>                
           
                
        </div>
    )
  };
}

FormEmpresa.propTypes ={
    empresas: PropTypes.array.isRequired,
}

export default withTracker(()=>{
    Meteor.subscribe('empresas');
    return{
        empresas: Empresas.find({}).fetch(),
    };
})(FormEmpresa);

