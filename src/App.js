
import React from 'react';
import TrafficDetails from './components/TrafficDetails';
import Note from './components/Note';

import ZNavbar from './components/ZNavbar';
//import Main from './components/Main';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {

  //alert('No:: ' + Math.random(1000));

  return (
    <div>
        <ZNavbar></ZNavbar>
        <Note text="This site is still under development. If you do not find any materials, please drop a note in the suggestion box by clicking on Suggestion/Comments link from top right corner. We shall get back to you as soon as possible with the materials."></Note>
        <Main></Main>
      <Footer></Footer>
      <TrafficDetails></TrafficDetails>
    </div>
  );
}

export default App;
