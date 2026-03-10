import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostNewPage from "./pages/PostNewPage";
import PostViewPage from "./pages/PostViewPage";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="page">
          <Switch>
            <Route path="/" exact component={PostListPage} />
            <Route path="/posts/new" component={PostNewPage} />
            <Route path="/posts/:id" component={PostViewPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
