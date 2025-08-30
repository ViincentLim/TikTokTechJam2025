import "./App.css";
import "@lynx-js/web-core/index.css";
import "@lynx-js/web-elements/index.css";
import "@lynx-js/web-core";
import "@lynx-js/web-elements/all";

const App = () => {
  return (
    <div className="app-container">
      <div className="video-wrapper">
        <lynx-view
          class="lynx-view"
          url="/main.web.bundle"
        ></lynx-view>
      </div>
    </div>
  );
};

export default App;
