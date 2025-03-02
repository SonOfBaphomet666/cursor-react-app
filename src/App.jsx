import CustomCursor from "./Cursor";

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <button>Button</button>
      <video width="320" height="240" controls>
        <source src="/video.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео тег.
      </video>
      <audio controls>
        <source src="/audio.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
