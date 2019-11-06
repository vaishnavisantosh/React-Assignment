import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect,withRouter } from 'react-router-dom';
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
    errorMessage: {
      email: "",
      password: ""
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
    if (!this.validate()) {
     
      this.props.onAuth(this.state.form.fullName, this.state.form.email, this.state.form.password, this.state.isSignUp).then(res=>{
        if(localStorage.getItem('userType')==='admin'){
          this.props.history.push("/app/dashboard");
        }
        else{
          this.props.history.push("/app/posts");
        }
      })

    }
    
  }

  validate = () => {
    const rules = {
      email: 'required|email',
      password: 'required|min:6|max:15',
      fullName: 'required|min:6|max:35'
    };

    let form = { ...this.state.form };

    if (!this.state.isSignup) {
      delete form.fullName;
      delete rules.fullName;
    }

    console.log(form, rules)

    let validation = new Validator(form, rules);
    let isError = validation.fails();
    this.setState({ errorMessage: validation.errors.errors });
    return isError;
  }

  getValidationMessages = () => {
    let validationMessages = [];
    if (this.state.errorMessage.email) {
      validationMessages.push(<Message key="1"
        size='mini'
        error
        content={this.state.errorMessage.email} />)
    }
    if (this.state.errorMessage.password) {
      validationMessages.push(<Message key="2"
        size='mini'
        error
        content={this.state.errorMessage.password} />)
    }
    if (this.state.errorMessage.fullName) {
      validationMessages.push(<Message key="3"
        size='mini'
        error
        content={this.state.errorMessage.fullName} />)
    }
    return validationMessages;
  }

  switchAuthModeHandler = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
    console.log(`inside switchAuthhandler `);
  }

  render() {


    console.log("Auth container get called");
    let validationMessages = this.getValidationMessages();

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.onSetAuthRedirectPath} />
      console.log("inside authredirect", authRedirect);
    }

    let { email, password, fullName } = this.state.form;
    const buttonTitle = this.state.isSignUp ? "Sign Up" : "Sign In";
    const switchButtonTitle = this.state.isSignUp ? "Sign IN" : "Sign Up";

    let LoginForm =
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        {/* {authRedirect} */}
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {/* <Image src='/logo.png' />  */}
            {/* Log-in to your account */}
          </Header>

          {validationMessages.length ? <Segment style={{ display: "block" }} stacked>
            {[...validationMessages]}
          </Segment> : null}
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
                    onChange={this.changeHandler}
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
      LoginForm = <Spinner />
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
    onAuth: (fullName, email, password, isSignUp) => dispatch(actions.auth(fullName, email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/app/posts'))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));