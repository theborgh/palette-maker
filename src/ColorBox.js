import React, {Component} from 'react';
import './ColorBox.css';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500);
    });
  }

  render() {
    const {name, background, paletteId, id, showLink} = this.props;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.7;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{background: background}} className='ColorBox'>
          <div
            style={{background}}
            className={`copy-overlay ${this.state.copied ? 'show' : ''}`}
          />
          <div className={`copy-msg ${this.state.copied ? 'show' : ''}`}>
            <h1>Copied!</h1>
            <p className={isLightColor && 'dark-text'}>
              {this.props.background}
            </p>
          </div>
          <div className='copy-container'>
            <div className='box-content'>
              <span className={isDarkColor && 'light-text'}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor && 'dark-text'}`}>
              Copy
            </button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={evt => evt.stopPropagation()}
            >
              <span className={`see-more ${isLightColor && 'dark-text'}`}>
                More
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
