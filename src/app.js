/* global document*/
import * as React from 'react';// eslint-disable-line
import ReactDOM from 'react-dom';
import { CommentBox } from './components/commentBox/CommentBox.jsx';
import './app.styl';

ReactDOM.render(<CommentBox></CommentBox>, document.getElementById('root'));
