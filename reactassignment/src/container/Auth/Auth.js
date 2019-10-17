import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Auth extends Component {
  state = {
    form: {
      email: "",
      password: "",
      fullName: ""
    },
    isSignUp: false
  }

  changeHandler = (e) => {
    let form = { ...this.state.form }
   console.log(e.target.name);
    form[e.target.name] = e.target.value;
    console.log(e.target.value);

    this.setState({ form });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.form.email, this.state.form.password, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp };
    });
    console.log(`inside switchAuthhandler `);
  }

  render() {

    let { email, password, fullName } = this.state.form;
    const buttonTitle = this.state.isSignup ? "Sign Up" : "Sign In";
        const switchButtonTitle = this.state.isSignup ? "Sign in" : "Sign up";

    let LoginForm = 
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' />  */}
            {/* Log-in to your account */}
          </Header>
          <Form size='large'>
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
        
          {this.state.isSignup ? "" : "New to us?"} <a href='#' onClick={this.switchAuthModeHandler}>{switchButtonTitle}</a>:
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

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
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
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.token !== null,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);