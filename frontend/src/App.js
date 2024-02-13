import "./App.css";
import Search from "./components/Search";
import Landing from "./components/Landing";
import { useState } from "react";
import Playlists from "./components/Playlists";

function App() {

  const [currentPage, setCurrentPage] = useState('landing')

  const allPageOptions = [
    'landing',
    'search',
    'playlists',
    'release the hounds',
    'news', 
  ]

  const NavigationButtonsHTML = (pageNames) => {
    const outputHTML = pageNames.map((page) => <div key={page} className="NavigationButton" onClick={() => onNavigationButtonClick(page)}>{page}</div>)
    return outputHTML
  }

  const onNavigationButtonClick = (pageClicked) => {
    setCurrentPage(pageClicked)
  }

  const renderedCurrentPage = (pageName) => {
    return pageName == 'landing' ? <Landing /> :
      pageName == 'search' ? <Search /> :
        pageName == 'playlists' ? <Playlists /> :
          pageName == 'news' ? <div>news</div> :
            <div>This is a big problem. The hackers hacked in boy are they hacking</div>
  }

  return (
    <div className="App">
      <div className="NavigationContainer">
        {NavigationButtonsHTML(allPageOptions)}
      </div>
      <div className="CurrentPageContainer">
        {renderedCurrentPage(currentPage)}
      </div>

    </div>
  );
}

export default App;
