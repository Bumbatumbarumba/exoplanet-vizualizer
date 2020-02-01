import React from 'react';
import { BuildApiQuery, GetListOfSystems } from '../helpers/nasaApiHelper'
import { MainRouter } from './MainRouter' 
import '../css/App.css';

const App = () => {
  return (
    <MainRouter></MainRouter>
  );
}

export default App;
