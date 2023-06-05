import Router from "./Router";
import "./css/app.css";
// import Nav from "./pages/nav";
import { Helmet } from 'react-helmet';
import logo from './images/minilogo.png';

const App = () => {
  return <>
    <Helmet>
      <title>SHAREPIC</title>
      <link rel="icon" type="image/png" href={logo} sizes="16x16" />
    </Helmet>
    {/* <Nav /> */}
    <Router />
  </>
};

export default App;
