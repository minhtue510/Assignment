import React from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import { Link } from 'react-router-dom';



class Contact extends Component {
    render() {
        constructor(props) {
            super(props);
    
            this.state = {
                firstname: '',
                lastname: '',
                telnum: '',
                email: '',
                agree: false,
                contactType: 'Tel.',
                message: ''
            };
    
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
        }
    
        handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
        
            this.setState({
              [name]: value
            });
        }
    
        handleSubmit(event) {
            console.log('Current State is: ' + JSON.stringify(this.state));
            alert('Current State is: ' + JSON.stringify(this.state));
            event.preventDefault();
        }
    
    }    

export default Contact;
