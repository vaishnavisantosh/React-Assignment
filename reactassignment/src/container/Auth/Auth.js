import React,{Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class Auth extends Component{
    state={
        form:{
            email:"",
            password:"",
            fullName:"",
            isSignUp:true
        }
       

    }

    changeHandler=(event,name)=>{
        let form = { ...this.state.form }
        console.log(name);
        form[name] = event.target.value;
        this.setState({ form });
    }

    render(){

        let {email,password,fullName}=this.state.form;

        let LoginForm = () => (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                  {/* <Image src='/logo.png' />  */}
                  {/* Log-in to your account */}
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input 
                        fluid 
                        icon='user' 
                        iconPosition='left' 
                        placeholder='E-mail address'
                        value={email}
                        name="email"
                        onChange={this.changeHandler(event,this.name)}
                         />
                    
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name="password"
                        value={password}
                        onChange={this.changeHandler(event,this.name)}
                    />
          
                    <Button color='teal' fluid size='large'>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href='#'>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          )
          
        return(
            <div>
                <form>
                    {LoginForm}
                    <Button>SUBMIT</Button>
                </form>

            </div>
        );
    }
}

export default Auth;