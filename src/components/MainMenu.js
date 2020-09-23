import React, { Fragment } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { 
  Drawer,
  List,
  ListItem,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    backgroundColor: '#000',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10) + 1,
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  listItem: {
    margin: '1rem 0'
  },
  listIcon: {
    color: '#fff',
  },
  icon: {
    fontSize: '2.5rem'
  }
}));

function MainMenu() {
  const classes = useStyles();
  
  return (
    <Fragment>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <List className={classes.list}>

          <ListItem className={classes.listItem} button>
            <Link to="/">
              <ListItemIcon className={classes.listIcon}>
                <HomeIcon className={classes.icon} />
              </ListItemIcon>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem} button>
            <Link to="/add">
              <ListItemIcon className={classes.listIcon}>
                <AddIcon className={classes.icon} />
              </ListItemIcon>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem} button>
            <Link to="/settings">
              <ListItemIcon className={classes.listIcon}>
                <SettingsIcon className={classes.icon} />
              </ListItemIcon>
            </Link>
          </ListItem>

        </List>
      </Drawer>
    </Fragment>
  )
}

export default MainMenu
