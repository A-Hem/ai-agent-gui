
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const ApiConfig = () => {
  const [apiKeys, setApiKeys] = useState({
    OPENAI_API_KEY: '',
    DEEPSEEK_API_KEY: '',
    QWEN_API_KEY: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApiKeys(prev => ({ ...prev, [name]: value }));
  };

  const generateEnvFile = () => {
    const envContent = Object.entries(apiKeys)
      .filter(([_, value]) => value.trim() !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const blob = new Blob([envContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, '.env.local');
  };

  return (
    <div className="config-container">
      <h2>AI API Configuration</h2>
      <div className="input-group">
        <label>OpenAI API Key:</label>
        <input
          type="password"
          name="OPENAI_API_KEY"
          value={apiKeys.OPENAI_API_KEY}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label>DeepSeek API Key:</label>
        <input
          type="password"
          name="DEEPSEEK_API_KEY"
          value={apiKeys.DEEPSEEK_API_KEY}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label>Qwen API Key:</label>
        <input
          type="password"
          name="QWEN_API_KEY"
          value={apiKeys.QWEN_API_KEY}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={generateEnvFile} className="generate-btn">
        Generate .env.local
      </button>
      
      <div className="instructions">
        <h3>Usage Instructions:</h3>
        <ol>
          <li>Fill in the API keys you want to use</li>
          <li>Click "Generate .env.local"</li>
          <li>Save the file in your project root</li>
          <li>Restart your development server</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiConfig;

import React from 'react';
   import ApiConfig from './components/ApiConfig';
   import './App.css';

   function App() {
     return (
       <div className="App">
         <ApiConfig />
         {/* Your existing components */}
       </div>
     );
   }

   export default App;