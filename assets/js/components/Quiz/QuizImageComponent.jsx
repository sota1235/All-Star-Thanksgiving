/**
 * QuizImageComponent.jsx
 *
 * Description:
 *   React Component for image on quiz page
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React             from 'react';
import { EventEmitter2 } from 'eventemitter2';
import { getImage }      from '../../lib/ajax.jsx';

/* React components */
export default class QuizImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgPath: '' };
    this.style = {
      position        : 'relative',
      width           : '80%',
      margin          : '20px auto',
      backgroundColor : '#E4FFE6',
      border          : 'solid #03C100',
      borderWidth     : '2px',
      borderRadius    : '20px',
      textAlign       : 'center'
    };
    this.imgStyle = {
      height: '500px'
    }
  }
  componentWillMount() {
    getImage(this.props.id)
      .then( result => {
        this.setState({ imgPath: result.fileName });
      });
  }
  render() {
    return (
      <div className="container" style={this.style}>
        <img src={`/uploads/${this.state.imgPath}`} style={this.imgStyle} />
      </div>
    );
  }
}