import { Card, Image, Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../utils/contextAuth";
import { useContext } from "react";
import DeleteButton from "./DeleteButton.js";
import LikeButton from '../components/LikeButton'

const PostCard = ({ post }) => {
  const {user} = useContext(AuthContext)
  const { username, createdAt, body, likeCount, commentCount, likes, id } =
    post;
  
   
  function likePost(){
      console.log('like post')
  }
  function commmentOnPost(){
    console.log('comment post')
}
  return (
    <Card fluid style={{ margin: "15px" }}>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description as={Link} to={`/post/${id}`} floated="right">
          {moment(createdAt).fromNow(true)}
        </Card.Description>
      </Card.Content>
      <Card.Content>
         <LikeButton post={post}/>
        <Button as="div" labelPosition="right" as={Link} to={`/post/${id}`} >
          <Button basic color="blue" >
            <Icon name="comments outline" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {
          user && user.username === username && (
            
           <DeleteButton postId={id}/>
            
           
          )
        }
      </Card.Content>
    </Card>
  );
};

export default PostCard;
