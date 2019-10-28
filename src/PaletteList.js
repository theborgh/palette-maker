import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {List} from '@material-ui/core';
import {ListItem} from '@material-ui/core';
import {ListItemAvatar} from '@material-ui/core';
import {ListItemText} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {Avatar} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';
import {red} from '@material-ui/core/colors';

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deletePaletteDialogIsOpen: false,
      deletingId: '',
    };

    this.browseToPalette = this.browseToPalette.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openDialog(id) {
    this.setState({deletePaletteDialogIsOpen: true, deletingId: id});
  }

  closeDialog() {
    this.setState({deletePaletteDialogIsOpen: false, deletingId: ''});
  }

  browseToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  render() {
    const {palettes, classes} = this.props;
    const {deletePaletteDialogIsOpen} = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.title}>Palette Maker</h1>
            <Link to='/palette/new'>Create a new palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  {...palette}
                  handleClick={() => this.browseToPalette(palette.id)}
                  // handleDelete={deletePalette}
                  openDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={deletePaletteDialogIsOpen}
          aria-labelledby='delete-palette-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-palette-dialog-title'>
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>

            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
