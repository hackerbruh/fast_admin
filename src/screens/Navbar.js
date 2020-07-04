import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import {
    BrowserRouter as Router,
    Switch, Route, Link,Redirect
  } from "react-router-dom";
import {Container} from "@material-ui/core";
import fire from'../config/fire';
import {grey} from '@material-ui/core/colors'
import Orders from './Orders';
import Vendors from './Vendors'
import NewVendor from './NewVendor';
import EditVendor from'./EditVendor';
import AddCarousel from'./AddCarousel'


const Logout=()=> {
  fire.auth().signOut();
}  

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor:theme.palette.warning.light,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title:{
    flexGrow:1,
    color: grey[900],
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: grey[900],
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  icon:{
    color: grey[900],
  }
}));

export default function MiniDrawer() {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title} noWrap>
            Fast Admin
          </Typography>
          <IconButton className={classes.icon} onClick={Logout}><ExitToAppIcon/></IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
         </Link>
         <Link to="/orders" className={classes.link}>
         <ListItem>
              <ListItemIcon><LocalDiningIcon/></ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
         </Link> 
        <Link to="/vendors" className={classes.link}>   
            <ListItem>
              <ListItemIcon><StorefrontIcon/></ListItemIcon>
              <ListItemText primary={"Vendors"} />
            </ListItem>
        </Link>
        <Link to="/addcarousel" className={classes.link}>   
            <ListItem>
              <ListItemIcon><ViewCarouselIcon/></ListItemIcon>
              <ListItemText primary={"AddCarousels"} />
            </ListItem>
        </Link>
        </List>
       
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
        <Route exact path="/">
            <Container>
              <Typography variant="h3" gutterBottom>
                Home
              </Typography>
              <Typography variant="body1" gutterBottom>
                I AM GOD.
              </Typography>
            </Container>
          </Route>
          <Route exact path="/orders">
            <Container>
            <table className="table table-borderless ">
            <thead className="thead-dark">
                <tr>
            <th><Typography variant="h4">
                Orders
              </Typography></th>
                </tr>
            </thead>
        </table>
              <Typography variant="body1" gutterBottom>
                <Orders/>
              </Typography>
            </Container>
          </Route>
          <Route exact path="/vendors">
            <Container>
              <Typography variant="body1" gutterBottom>
               <Vendors/>
              </Typography>
              </Container>
          </Route>
          <Route exact path="/newvendor">
            <Container>
              <NewVendor/>
            </Container>
          </Route>
      <Route exact path="/editvendor/:id" 
      render={(props) => <EditVendor {...props} />}
      />
      <Route exact path="/addcarousel">
            <Container>
              <AddCarousel/>
            </Container>
          </Route>
        </Switch>
      </main>
    </div>
    </Router>
  );
}