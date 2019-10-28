import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.browseToPalette = this.browseToPalette.bind(this);
  }

  browseToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }

  render() {
    const {palettes, classes, deletePalette} = this.props;
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
                  handleDelete={deletePalette}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
