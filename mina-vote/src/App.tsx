// src/App.tsx

import React, { useState } from 'react';
import './App.css';

interface CandidateProps {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

const candidates: CandidateProps[] = [
  {
    id: 'candidate1',
    name: 'Candidate 1',
    description: 'Description for Candidate 1',
    image: 'URL_FOR_IMAGE1'
  },
  {
    id: 'candidate2',
    name: 'Candidate 2',
    description: 'Description for Candidate 2',
    image: 'URL_FOR_IMAGE2'
  },
  {
    id: 'candidate3',
    name: 'Question/Decision 3',
    description: 'Description for Question/Decision 3',
  }
];

function App() {
  const [vote, setVote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Mina Blockchain to record the vote
    console.log(`Vote: ${vote}`);
  };

  const connectWallet = () => {
    console.log("Connecting to Wallet...");
    // TODO: Wallet Connection...
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mina Blockchain Voting System</h1>
        <button onClick={connectWallet} className="wallet-btn">Connect Wallet</button>
        <form onSubmit={handleSubmit}>
          {candidates.map(candidate => (
            <div key={candidate.id} className="candidate-card">
              <img src={candidate.image} alt={candidate.name} className="candidate-image" />
              <h2>{candidate.name}</h2>
              <p>{candidate.description}</p>
              <label>
                <input type="radio" name="vote" value={candidate.id} onChange={e => setVote(e.target.value)} />
                Vote for {candidate.name}
              </label>
            </div>
          ))}
          <button type="submit">Submit Vote</button>
        </form>
      </header>
    </div>
  );
}

export default App;
