import { Header } from "../components";
import { Provider } from "../utils/provider";

function App() {
  return (
    <>
      <Provider>
        <Header />
      </Provider>
    </>
  );
}

export default App;
