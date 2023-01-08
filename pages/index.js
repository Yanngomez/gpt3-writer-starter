import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | Yann GOMEZ</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate interesting and current topics with their issues</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input the domain below, we'll generate the rest.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="Computer security, law, agriculture, networks..." 
            className="prompt-box" 
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a 
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}          
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://mobile.twitter.com/yann80841260"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Build by Yann Gomez</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
