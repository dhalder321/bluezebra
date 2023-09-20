
import React from 'react';

import ZNavbar from './components/ZNavbar';
//import Main from './components/Main';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {

  //alert('No:: ' + Math.random(1000));

  return (
    <div>
        <ZNavbar></ZNavbar>
        <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
