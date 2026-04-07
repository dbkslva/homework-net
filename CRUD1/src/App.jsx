import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostNewPage from "./pages/PostNewPage";
import PostViewPage from "./pages/PostViewPage";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="page">
          <Routes>
            <Route path="/" element={<PostListPage />} />
            <Route path="/posts/new" element={<PostNewPage />} />
            <Route path="/posts/:id" element={<PostViewPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
