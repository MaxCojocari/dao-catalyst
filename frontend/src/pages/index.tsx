import { Header } from "../components";
import { TEST_DAO_IMGAGE_URL, TEST_DAO_NAME } from "../constants";
import { Provider } from "../utils/provider";

function App() {
  return (
    <>
      <Provider>
        <Header
          isDaoMainPage={true}
          imageUri={TEST_DAO_IMGAGE_URL}
          daoName={TEST_DAO_NAME}
        />
      </Provider>
    </>
  );
}

export default App;
