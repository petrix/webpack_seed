import * as React from 'react';// eslint-disable-line
import { render } from 'react-dom';
import { DomainStore } from './stores/domain.store';
import { AppRouter } from './Router';
import './app.styl';

const store = new DomainStore();

render(<AppRouter/>, document.getElementById('root'));