import Header from "./Header";
import Speakers from "./Speakers";
import { AuthProvider } from "../context/AuthContext";

import Layout from "./Layout";

function App() {
  return (
    <AuthProvider initialLoggedInUser="Ronald">
      <Layout startingTheme="light">
        <div>
          <Header />
          <Speakers />
        </div>
      </Layout>
    </AuthProvider>
  );
}

export default App;
