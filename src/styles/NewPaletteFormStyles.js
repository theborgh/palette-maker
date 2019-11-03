import {DRAWER_WIDTH} from '../constants';
import sizes from './sizes';

const styles = theme => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    height: '100vh',

    [sizes.down('xxs')]: {
      width: '100%',
    },
  },

  drawerPaper: {
    width: DRAWER_WIDTH,
    display: 'flex',
    alignItems: 'center',

    [sizes.down('xxs')]: {
      width: '100%',
    },
  },

  drawerHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },

  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,

    [sizes.down('xxs')]: {
      marginLeft: '-100%',
    },
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    width: '100%',
  },

  button: {
    width: '50%',
  },
});

export default styles;
