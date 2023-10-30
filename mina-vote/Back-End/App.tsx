// src/App.tsx

import React, { useState } from 'react';
import './App.css';

function App() {
  const [vote, setVote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Mina Blockchain to record the vote
    console.log(`Vote: ${vote}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mina Blockchain Voting System</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Select Your Vote:
            <select value={vote} onChange={e => setVote(e.target.value)}>
              <option value="candidate1">Candidate 1</option>
              <option value="candidate2">Candidate 2</option>
              <option value="candidate3">Candidate 3</option>
            </select>
          </label>
          <button type="submit">Vote</button>
        </form>
      </header>
    </div>
  );
}

export default App;
