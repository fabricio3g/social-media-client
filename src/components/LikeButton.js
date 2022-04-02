import { useMutation, gql } from "@apollo/client";
import Ract, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Label, Icon } from "semantic-ui-react";
import { AuthContext } from "../utils/contextAuth";

const LikeButton = ({ post}) => {

   const {id, likeCount, likes } =  post
  const { user } = useContext(AuthContext);
  const [likePost] = useMutation(LIKE_POST_MUTATION,{
      variables:{ postId: id}
  })
  const [ liked, setLiked] = useState(false);
 
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
        setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, liked, likes]
  );
  const likeButton = user ? (
    liked ? (
      <Button negative  color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic color="red">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button basic as={Link} to="/Login" color="red">
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button onClick={likePost} as="div" labelPosition="right">
        {likeButton}
      <Label as="a" basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: String!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`;

export default LikeButton;
