import DataComponent from "./components/DataComponent";
import ErrorComponent from "./components/ErrorComponent";
import LoadingComponent from "./components/LoadingComponent";
import "./App.css";

export default function App() {
  return (
    <div className="use-json-fetch-demo">
      <h3>Демо useJsonFetch</h3>
      <div className="demo-grid">
        <DataComponent />
        <ErrorComponent />
        <LoadingComponent />
      </div>
    </div>
  );
}
