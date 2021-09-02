import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Currency from "./components/containers/Currency";

function App() {
  return (
    <div className="App">
      <main>
        <Provider store={store}>
          <Currency />
        </Provider>
      </main>
    </div>
  );
}

export default App;
