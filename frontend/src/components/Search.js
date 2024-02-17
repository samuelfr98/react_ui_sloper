import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import GraphMetricsCanvas from "./Visualization/GraphMetricsCanvas";
import GraphMetricsD3 from "./Visualization/GraphMetricsD3";

const Search = () => {
  const [lookup, setLookup] = useState("");
  const [results, setResults] = useState();
  const [showingPlaylistSaveForm, setShowingPlaylistSaveForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [resultsType, setResultType] = useState()
  

  const handleLookupChange = (event) => {
    setLookup(event.target.value);
  };

  const gatherStockData = async (stockSymbol) => {

    if (
      stockSymbol === undefined ||
      stockSymbol === null ||
      stockSymbol === ""
    ) {
      alert("Blank stocks ain't cool!");
      return;
    }
    setIsLoading(true)
    const response = await axios
      .get("/gatherStockData/", {
        params: {
          stockSymbol: stockSymbol,
        },

      })
      .catch((error) => {
        console.log("Error occurred: " + error.toJSON());
        setIsLoading(false)
        alert("Fake stocks ain't cool!")
      });

    if (response) {
      setResults(response.data);
      setLookup("")
      setIsLoading(false)
      return response;
    }
  };
  
  const getChartResponse = async (stockSymbol) => {

    if (
      stockSymbol === undefined ||
      stockSymbol === null ||
      stockSymbol === ""
    ) {
      alert("Blank stocks ain't cool!");
      return;
    }
    setIsLoading(true)
    const response = await axios
      .get("/getChartResponse/", {
        params: {
          ticker: stockSymbol,
          period: "1d",
          interval: "1m"
        },

      })
      .catch((error) => {
        console.log("Error occurred: " + error.toJSON());
        setIsLoading(false)
        alert("Fake stocks ain't cool!")
      });

    if (response) {
      setResults(response.data);
      setLookup("")
      setIsLoading(false)

      console.log(response)
      console.log(response.data.chartResponse.meta)
      return response;
    }
  };

  const containerClass = isLoading ? "searchDivLoadingResults" : "searchDiv"

  return !results && !showingPlaylistSaveForm ? (
    <div className={containerClass}>
      <div className="searchTitleAndForm">
        <div className="searchTitle">find a stock:</div>
        <form className="searchForm" onSubmit={(e) => { e.preventDefault(); gatherStockData(lookup) }}>
          <input
            className="searchFormInput"
            placeholder="SYMBOL"
            type="text"
            value={lookup}
            onChange={handleLookupChange}
          />
        </form>
      </div>
      <div className="searchButtonsContainer">
        <div
          className="SearchButton"
          onClick={() => {
            console.log(
              "Attempting to submit stock symbol " +
              lookup +
              " to django backend for data fetching."
            );
            setResultType('canvasjs')
            // gatherStockData(lookup);
            getChartResponse(lookup);
          }}
        >Search CanvasJS</div>
        <div
          className="SearchButton"
          onClick={() => {
            console.log(
              "Attempting to submit stock symbol " +
              lookup +
              " to django backend for data fetching."
            );
            setResultType('d3')
            gatherStockData(lookup);
          }}
        >Search d3</div>
        <div
          className="SearchButton"
          onClick={() => {
            setLookup("")
          }}
        >Cancel</div>
      </div>
    </div>
  ) : results ? (
    <div className="results">
      {resultsType == 'canvasjs' ? <GraphMetricsCanvas stockMetrics={results} /> 
        : resultsType == 'd3' ? <GraphMetricsD3 stockMetrics={results} /> : 'major poo poo alert!'}
      <div className="searchButtonsContainer">
        <div
          className="SearchButton"
          onClick={() => {
            setShowingPlaylistSaveForm(true);
          }}
        >Save to Playlist</div>
        <div
          className="SearchButton"
          onClick={() => {
            setResults();
          }}
        >Back</div>
      </div>

      {results && showingPlaylistSaveForm ? (
        <div className="playlistSaveForm">
          Let's give em a form to save this stock.
          <form>
            <div
              className="SearchButton"
              onClick={() => {
                console.log("Add to existing playlist")
              }}
            >Add to existing Playlist</div>
            <div
              className="SearchButton"
              onClick={() => {
                console.log("Create New Playlist")
              }}
            >Create New Playlist</div>
            <div
              className="SearchButton"
              onClick={() => {
                console.log("Cancel this buffoonery");
                setResults();
                setShowingPlaylistSaveForm(false);

              }}
            >Cancel this buffoonery</div>
          </form>

        </div>
      ) : ''}

    </div>
  ) : (
    <div>
      Somehow results is null and we are trying to show the playlist save form. WTF?
    </div>
  )

};

export default Search;
