import { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../utils/contextAuth";

const Login = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  
  const {onChange, onSubmit, values} = useForm( loginUserCallback, {
    username: "",
    password: "",
  })
  
  const [loginUser, {loading}] = useMutation(LOGIN_USER,{
    update(_,{data: {login: userData}}){
        
        context.login(userData)
        props.history.push('/')
    },
    onError(err){
        setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
})

 function loginUserCallback(){
    loginUser()
 } 

  return (
    <div className="form-container ">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''} noValidate>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholeder="Username"
          name="username"
          type="text"
          error={errors.username? true : false}
          value={values.username}
          onChange={onChange}
        />

        <Form.Input
        type="password"
          label="Password"
          placeholeder="Password"
          name="password"
          error={errors.password? true : false}
          value={values.password}
          onChange={onChange}
        />

        <Button color="olive" type="submit">
          Login
        </Button>
      </Form>
      
        {Object.keys(errors).length > 0 && 
        (
            <div className="ui error message">
            <ul className="list">
            {Object.values(errors).map((error) =>(
                <li key={error}>{error}</li>
            ))}
            </ul>
        </div>

        )}
    </div>
  );
};


const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
              username: $username
            password: $password
        ){
            id email username createdAt token
        }
    }
`

export default Login;
