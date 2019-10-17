import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);

    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return seedColors.find(palette => palette.id === id);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path='/'
            exact
            render={routeProps => (
              <PaletteList palettes={seedColors} {...routeProps} />
            )}
          />
          <Route
            path='/palette/:id'
            exact
            render={routeProps => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            path='/palette/:paletteId/:colorId'
            render={() => <h1>Single color page</h1>}
          />
          <Route render={() => <h1>404 - Page not found!</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
