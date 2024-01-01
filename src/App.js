import React from "react";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";
// Import other components as needed

function App() {
  return (
    <div>
      <h1>My Music App</h1>
      <SongList />
      <SongForm />
      {/* Render other components here */}
    </div>
  );
}

export default App;
