 import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import NewPost from './NewPost';
import Post from './Post';

class PostFeed extends React.Component {
  state = {
    posts:[],
    text:"",
    image:""
  };

  handleChange=()=>{};

  render() {

     const { classes,auth }=this.props;
     const { text, image }=this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4" component="h1" align="center"
        color="primary" clas></Typography>
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
