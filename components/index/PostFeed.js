 import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import NewPost from './NewPost';
import Post from './Post';
import { addPost,deletePost,getPostFeed } from '../../lib/api';

class PostFeed extends React.Component {
  state = {
    posts:[],
    text:"",
    image:"",
    isAddingPost:false,
    isDeletingPost:false
  };
  componentDidMount(){
    this.postData=new FormData();
    this.getPosts()
  }
  getPosts=()=>{
    const { auth }=this.props;

    getPostFeed(auth.user._id).then(posts=>this.setState({ posts }))
  }

  handleChange = event => {
    let inputValue;

    if (event.target.name === "image") {
      inputValue = event.target.files[0];
    
    } else {
      inputValue = event.target.value;
    }
    this.postData.set(event.target.name, inputValue);
    this.setState({ [event.target.name]: inputValue });
  };


  handleAddPost=()=>{
    const { auth }=this.props;
       this.setState({ isAddingPost:true })
    addPost(auth.user._id,this.postData)
    .then(postData=>{
      const updatedPosts=[postData,...this.state.posts]
      this.setState({
        posts:updatedPosts,
        isAddingPost:false,
        text:"",
        image:""
      })
      this.postData.delete('image')
    })
    .catch(err=>{
      console.error(err);
      this.setState({ isAddingPost:false })
    })
    }

    handleDeletePost=deletedPost=>{
      this.setState({ isDeletingPost:true })

      deletePost(deletedPost._id)
       .then(postData=>{
         const postIndex=this.state.posts.findIndex(post=>post._id==postData._id)
         const updatePosts=[
          ...this.state.posts.slice(0,postIndex),
          ...this.state.posts.splice(postIndex + 1)
         ]
         this.setState({
           posts:updatePosts,
           isDeletingPost:false
         })
       }).catch(err=>{
         console.error(err);
         this.setState({ isDeletingPost:false })
       })

    };

  render() {

     const { classes,auth }=this.props;
     const { posts,text, image,isAddingPost,isDeletingPost }=this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" component="h1" align="center"
        color="primary" className={classes.title}>
          Post Feed
        </Typography>
        <NewPost
          auth={auth}
          text={text}
          image={image}
          isAddingPost={isAddingPost}
          handleChange={this.handleChange}
          handleAddPost={this.handleAddPost}
        />
        {/*post list*/}

        {posts.map(post=>(
          <Post
            key={post._id}
            auth={auth}
            post={post}
            isDeletingPost={isDeletingPost}
            handleDeletePost={this.handleDeletePost}
          />
        ))}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    padding: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(PostFeed);
