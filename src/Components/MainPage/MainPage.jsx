import React, { useState } from "react";
import axios from "axios";
import './MainPage.css'
import backdrop from "../../Assets/background.mp4"


export default function MainPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:3000/";

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPrompt = `Recommend me music from: ${prompt} and also suggest some similar music`;

    axios
      .post(`${HTTP}`, { prompt: formattedPrompt })
      .then((res) => {
        setResponse(res.data.message);
        console.log(prompt);
      })
      .catch((error) => {
        console.log(error);
      });

    setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container container-sm p-1">
      <video src={backdrop} autoPlay loop muted />
      {" "}
      <h1 className="title text-center text-darkGreen">MusicGPT</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">What would you like to listen to today?</label>
          <input
            className="shadow-sm custom-input"
            type="text"
            placeholder="'Recommend me something like...'"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>{" "}
      </form>
      <div className="bg-darkGreen  mt-2 p-1 border-5">
        <p className="text-light" style={{ whiteSpace: 'pre-line' }}>
          {response ? response : "Tell me anything... \n"}
        </p>
      </div>
    </div>
  );
}