import React from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POST_QUERY } from "../utils/graphql";
import { useForm } from "../utils/hooks";
const PostForm = ()=> {
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    })
    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(proxy, result){
            
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            })
            proxy.writeQuery({
                query: FETCH_POST_QUERY,
                data: {getPosts: [result.data.createPost, ...data.getPosts]}
            })
            values.body = ''
        },
        onError(err){
            return err
        }
    })

    function createPostCallback(){
        createPost()
    }
    
    return(
        <Form onSubmit={onSubmit}>
            <h2>New post</h2>
            <Form.Field>
                <Form.Input placeholder='What are you thinking?'
                name='body'
                error={error ? true : false}
                onChange={onChange}
                value={values.body} />
            {error && (
                <div className="ui error " style={{background: '#fff6f6', padding:1, marginBottom: 5, borderRadius: '5px'}}>
                    <ul>
                        <li style={{color:'gray'}}>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>)
            }
            <Button floated="right" type="submit" color="olive">Submit</Button>
            </Form.Field>
            
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes{
                id username createdAt
            }
            likeCount
            commentCount
            comments{
                id
                body
                username
                createdAt
            }

        }
    }
`

export default PostForm