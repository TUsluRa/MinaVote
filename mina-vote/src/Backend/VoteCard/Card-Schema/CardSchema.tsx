import React, { useState } from 'react';
import { CandidateProps, candidates } from '../../../App';
import './CardStyleVote.css'; 

export function CardStyleVote() {
  const [vote, setVote] = useState<string>('');

  return (
    <div className="card-container">
      {candidates.map(candidate => (
        <div key={candidate.id} className="card">
          {candidate.image && <img src={candidate.image} alt={candidate.name} className="card-image" />}
          <h2 className="card-title">{candidate.name}</h2>
          <p className="card-description">{candidate.description}</p>
          <label className="card-vote-label">
            <input type="radio" name="vote" value={candidate.id} onChange={e => setVote(e.target.value)} />
            Vote for {candidate.name}
          </label>
        </div>
      ))}
    </div>
  );
}
