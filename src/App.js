import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);

    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

    this.state = {
      palettes: savedPalettes || seedColors,
    };

    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id);
  }

  savePalette(newPalette) {
    this.setState(
      {palettes: [...this.state.palettes, newPalette]},
      this.syncLocalStorage
    );
  }

  deletePalette(paletteId) {
    this.setState(
      st => ({
        palettes: st.palettes.filter(palette => palette.id !== paletteId),
      }),
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    const {palettes} = this.state;

    return (
      <div>
        <Switch>
          <Route
            path='/palette/new'
            exact
            render={routeProps => (
              <NewPaletteForm
                palettes={this.state.palettes}
                savePalette={this.savePalette}
                {...routeProps}
              />
            )}
          />
          <Route
            path='/'
            exact
            render={routeProps => (
              <PaletteList
                palettes={palettes}
                deletePalette={this.deletePalette}
                {...routeProps}
              />
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
            render={routeProps => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
          <Route render={() => <h1>404 - Page not found!</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
