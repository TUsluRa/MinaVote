import React, { useState } from 'react';
import './App.css';
import  MinimalistVote  from './Backend/VoteCard/Minimal-Schema/MinimalSchema';
import  ListVote  from './Backend/VoteCard/List-Schema/ListSchema';
import  CardStyleVote  from './Backend/VoteCard/Card-Schema/CardSchema';

export interface CandidateProps {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export enum VoteSchemaType {
  MINIMALIST,
  LIST,
  CARD
}

export const candidates: CandidateProps[] = [
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
  const [voteSchema, setVoteSchema] = useState<VoteSchemaType>(VoteSchemaType.LIST);

  const connectWallet = () => {
    console.log("Connecting to Wallet...");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mina Protocol Voting System</h1>
        <div className="header-menu">
          <div className="wallet-container">
            <button onClick={connectWallet} className="wallet-btn">Connect Wallet</button>
          </div>
        </div>
      </header>
      <div className="App-Content">
        {voteSchema === VoteSchemaType.MINIMALIST && <MinimalistVote />}
        {voteSchema === VoteSchemaType.LIST && <ListVote />}
        {voteSchema === VoteSchemaType.CARD && <CardStyleVote />}
      </div>
    </div>
  );
}

export default App;