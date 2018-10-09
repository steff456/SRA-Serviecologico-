import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';


import {Runners} from '../api/runners.js';
import FormEmpresa from './FormEmpresa.js';
import FormRecolectores from './FormRecolectores.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FormularioActualizarPreciosMateriales from './FormularioActualizarPreciosMateriales.js';

import Navbar from './Navbar.js';

class App1 extends Component {
    constructor(props){
        super(props);
        this.state={
            playerName:null
        }
    }
    
    //No se esta llamando este método nunca
    renderRunners(){
        return this.props.runners.map((r,i)=>{
            return(<li key={i}
            style={{
                position: 'relative',
                left: `${r.pos}%`
            }}
            >{r.name}</li>)
        }

        );
    }

    addRunner() {
        // La constante sobra.
        // const me = this;
        Meteor.call('runners.add', name, function (err,player) {
          if(err) {alert(err); return; }
          this.setState({player})
        });
      }
    


    run(){
        Meteor.call('runners.run');
    }


  render() {
      
    return (
      <div>
        <Navbar/>
        <AccountsUIWrapper/>
        <FormEmpresa/>  
        <FormRecolectores/>
        <VerRecolectores/>
        {Meteor.user() ?
          this.state.player ?
            <button onClick={this.run.bind(this)}>Run Forest!</button>:
            <button onClick={this.addRunner.bind(this)}
            >Enter race!</button> :
          <div> Please log in to play </div>
        }
        <h2>Runners</h2>
        <ul>
          {this.props.runners.map( (r,i) => 
            <li
             key={i}
             style={{
              position: 'relative',
              left: `${r.pos}%`
             }}
             >{r.name}</li>
          )}
        </ul>
        
      </div>
    )
  }
}

App.propTypes = {
    runners: PropTypes.array.isRequired,
    user: PropTypes.object
  };
  
  export default withTracker(() => {
    Meteor.subscribe('runners');
  
    return {
      runners: Runners.find({}).fetch(),
      user: Meteor.user()
    };
  })(App);
