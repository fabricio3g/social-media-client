import { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../utils/contextAuth";

const Register = (props) => {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  
  const {onChange, onSubmit, values} = useForm( registerUser, {
    username: "",
    password: "",
    email: "",
    comfirmPassword: "",
  })
  
  const [addUser, {loading}] = useMutation(REGISTER_USER,{
    update(_, {data: {login: userData}}){
        context.login(userData)
        props.history.push('/')
    },
    onError(err){
      console.log(err)
      if(err.graphQLErrors[0].extensions.errors) setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
})

 function registerUser(){
     addUser()
 } 

  return (
    <div className="form-container ">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''} noValidate>
        <h1>Register</h1>
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
          label="Email"
          placeholeder="Email"
          name="email"
          type="email"
          error={errors.email? true : false}
          value={values.email}
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

        <Form.Input
            type="password"
            error={errors.comfirmPassword? true : false}
          label="Comfrim password"
          placeholeder="Comfirm password"
          name="comfirmPassword"
          value={values.comfirmPassword}
          onChange={onChange}
        />

        <Button color="olive" type="submit">
          Register
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


const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $comfirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                comfirmPassword: $comfirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;









function authReducer(state, action) {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}