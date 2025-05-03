import { useState } from "react";
import Card from "./components/Card.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Card
        name="Kaushal"
        description="A TA at IIT Madras"
        interests={["App Dev", "Web Dev", "DSA", "CP"]}
        linkedIn="https://www.linkedin.com/in/kaushal-vaid/"
        twitter="helloworld.dev"
      ></Card>
    </>
  );
}

export default App;
