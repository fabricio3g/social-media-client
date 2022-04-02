import { useQuery } from "@apollo/client";
import PostCard from "../components/PostCard";
import PostFrom from "../components/PostForm";
import { Grid, Loader } from "semantic-ui-react";
import { AuthContext } from "../utils/contextAuth";
import { useContext } from "react";
import { FETCH_POST_QUERY } from "../utils/graphql";
import { Transition } from "semantic-ui-react";



const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POST_QUERY);
  console.log(error)
  console.log(data);
  return (
    <Grid columns={3}>
      {user && (
        <Grid.Column style={{ margin: "50px auto" }}>
          <PostFrom className="centered" style={{ margin: "0 auto" }} />
        </Grid.Column>
      )}
      <Grid.Row>
        <h2 style={{ margin: "15px" }}>Recent posts</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post, index) => (
                <Grid.Column key={index}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
