import React, { useState } from "react";
import "./App.css";

function Card({ img, children }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      {img && <img src={img} className="card-img-top" alt="Card image" />}
      <div className="card-body">{children}</div>
    </div>
  );
}

function App() {
  const [showImage, setShowImage] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card img={showImage ? "src/assets/happybirthday.jpg" : null}>
        <h5 className="card-title">
          {showImage ? "Hello!" : "Happy Birthday!"}
        </h5>
        <p className="card-text">
          {showImage
            ? "Happy birthday to you!"
            : "Today is a special day, and I wish you endless joy, love, and happiness. May all your dreams come true!"}
        </p>
        <button className="btn btn-primary" onClick={() => setShowImage(false)}>
          {showImage ? "Congratulations!" : "Thank you!"}
        </button>
      </Card>
    </div>
  );
}

export default App;
