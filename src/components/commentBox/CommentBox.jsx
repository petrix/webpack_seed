import React, { Component } from 'react';
import Header from '../header/Header.jsx';
import { Ajax } from '../../utils/ajax';

import './commentBox.styl';

export class CommentBox extends Component {
  constructor() {
    super();
    this.test = 'Hello world';
    this.storage = [];
  }

  pushItemToList(item) {
    this.storage.push(item);
  }

  render() {// eslint-disable-line
    return (
      <div className="c_comment-box">
        <div className="c_comment-box_header">
          <Header onSubmit={this.pushItemToList.bind(this)}></Header>
        </div>
      </div>
    );
  }
}

export default CommentBox;
