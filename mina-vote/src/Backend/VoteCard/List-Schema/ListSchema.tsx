import React, { useState } from 'react';
import { CandidateProps, candidates } from '../../../App';
import './ListVote.css';

export function ListVote() {
  const [vote, setVote] = useState<string>('');

  return (
    <div className="list-container">
      {candidates.map(candidate => (
        <div key={candidate.id} className="list-item">
          {candidate.image && <img src={candidate.image} alt={candidate.name} className="list-image" />}
          <div className="list-content">
            <h2 className="list-title">{candidate.name}</h2>
            <p className="list-description">{candidate.description}</p>
          </div>
          <label className="list-vote-label">
            <input type="radio" name="vote" value={candidate.id} onChange={e => setVote(e.target.value)} />
            Vote
          </label>
        </div>
      ))}
    </div>
  );
}

export default ListVote;
