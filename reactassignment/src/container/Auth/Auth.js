import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Validator from "validatorjs";


class Auth extends Component {
  state = {
    form: {
      email: "",
      password: "",
      fullName: ""
    },
    isSignUp: true
  }

  changeHandler = (e) => {
    let form = { ...this.state.form }
   //console.log(e.target.name);
    form[e.target.name] = e.target.value;
    //console.log(e.target.value);

    this.setState({ form });
  }

  submitHandler = (event) => {
    event.preventDefault();
    
    this.props.onAuth(this.state.form.fullName,this.state.form.email, this.state.form.password, this.state.isSignUp);
    
  }

  switchAuthModeHandler = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp };
    });
    console.log(`inside switchAuthhandler `);
  }

  render() {

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
      console.log("inside authredirect",authRedirect);
    }

    let { email, password, fullName } = this.state.form;
    const buttonTitle = this.state.isSignUp ? "Sign Up" : "Sign In";
        const switchButtonTitle = this.state.isSignUp ? "Sign IN" : "Sign Up";

    let LoginForm = 
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
         {authRedirect}
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' />  */}
            {/* Log-in to your account */}
          </Header>
          <Form size='large' onSubmit={this.submitHandler}>
            <Segment stacked> 
              
              {

              this.state.isSignUp ?
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='FULL NAME'
                    value={fullName}
                    name="fullName"
                    type="text"
                    onChange = {this.changeHandler}
                  /> : null
              }
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                value={email}
                name="email"
                onChange={this.changeHandler}
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                value={password}
                onChange={this.changeHandler}
              />
              <Button color='teal' fluid size='large'>
                                {buttonTitle}
                            </Button>

            </Segment>
          </Form>
          <Message>
        
          {this.state.isSignUp ? "" : "New to us?"} <a href='#' onClick={this.switchAuthModeHandler}>{switchButtonTitle}</a>:
          </Message>
        </Grid.Column>
      </Grid>
    

    if (this.props.loading) {
      LoginForm= <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }


    return (
      <div>
        
        {LoginForm}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (fullName,email, password, isSignUp) => dispatch(actions.auth(fullName,email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/posts'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);