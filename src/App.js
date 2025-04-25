import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import News from './components/News';
import SearchNews from './components/SearchNews';

const App = () => {
  const pageSize = 15;
  const apikey = "f6867a088db2469293980223e8c72944";

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<News key="general" apikey={apikey} pageSize={pageSize} country="us" category="general" />} />
        <Route exact path="/business" element={<News key="business" apikey={apikey} pageSize={pageSize} country="us" category="business" />} />
        <Route exact path="/entertainment" element={<News key="entertainment" apikey={apikey} pageSize={pageSize} country="us" category="entertainment" />} />
        <Route exact path="/general" element={<News key="general" apikey={apikey} pageSize={pageSize} country="us" category="general" />} />
        <Route exact path="/health" element={<News key="health" apikey={apikey} pageSize={pageSize} country="us" category="health" />} />
        <Route exact path="/science" element={<News key="science" apikey={apikey} pageSize={pageSize} country="us" category="science" />} />
        <Route exact path="/sports" element={<News key="sports" apikey={apikey} pageSize={pageSize} country="us" category="sports" />} />
        <Route exact path="/technology" element={<News key="technology" apikey={apikey} pageSize={pageSize} country="us" category="technology" />} />
        <Route exact path="/search/:query" element={<SearchNews apikey={apikey} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
