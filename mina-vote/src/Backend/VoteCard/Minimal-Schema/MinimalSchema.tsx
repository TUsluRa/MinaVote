import React, { useState } from 'react';
import { CandidateProps, candidates } from '../../../App';
import './MinimalistVote.css';

export function MinimalistVote() {
  const [vote, setVote] = useState<string>('');

  return (
    <div className="eliptik-container">
      {candidates.slice(0, 9).map(candidate => (  // Sadece ilk 9 adayı gösterelim.
        <div key={candidate.id} className="eliptik-item">
          <label className="eliptik-label">
            <input type="radio" name="vote" value={candidate.id} onChange={e => setVote(e.target.value)} />
            {candidate.name}
          </label>
        </div>
      ))}
    </div>
  );
}