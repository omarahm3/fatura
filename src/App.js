import React from "reactn";
import { hot } from "react-hot-loader";
import 'fontsource-roboto';
import { CssBaseline, makeStyles } from "@material-ui/core";
import MainMenu from "./components/MainMenu";
import Home from "./pages/Home";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AddInvoice from "./pages/AddInvoice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <MainMenu />
        <main className={classes.content}>
          <Switch>
            <Route path="/add" component={AddInvoice} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default hot(module)(App); 
