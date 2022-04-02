import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Loader,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../utils/contextAuth";
import DeleteButton from "../components/DeleteButton.js";
const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [comment, setComment] = useState('')
  const [submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION,{
    update(){
      setComment('')
    },
    variables: {
      postId,
      body: comment
    }
  })

  function deletePostCallback(){
    props.history.push('/')
  }


  let postMarkup;
  if (!data) {
    console.log(" is loading");
    postMarkup = <Loader active inline="centered" />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likesCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={user} post={data.getPost} />
              <Button
                basic
                as="div"
                labelPosition="right"
                onClick={() => console.log("Comment on post")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={postId} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {
            
            user && <Card fluid>
            
              <Card.Content>
            <p>Post a comment</p>
                <Form >
                  
                  <Input fluid type="text" placeholder='Comment...' name='comment' value={comment}
                    onChange={e => setComment(e.target.value)}
                  /><br/>
                  <Button disabled={comment.trim() === ''} onClick={submitComment} color="olive">Submit</Button>
                  
                </Form>
                </Card.Content>
              
            </Card>
          }
          <h2>Comments</h2>
          {
            comments.map((c, index) =>(
              <Card fluid key={index}>
                <CardContent>
                 
                <Card.Header>{c.username}</Card.Header>
                <Card.Meta>{moment(c.createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                  {c.body}
                </Card.Description>
                </CardContent> 
                {user && user.username === c.username && (<DeleteButton postId={id} commentId={c.id}/>)}
              </Card>
              
            ))
          }
        </Grid.Row>
      </Grid>
    );
  }

  return <Container>{postMarkup}</Container>;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: String!, $body: String!) {
  createComments(postId: $postId, body: $body) {
    id
    body
    createdAt
    username
    comments {
      username
      body
      createdAt
      id
    }
    commentCount
  }
}
`

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        body
        username
        createdAt
        id
      }
      commentCount
      likeCount
      likes {
        username
        createdAt
        id
      }
    }
  }
`;

export default SinglePost;
