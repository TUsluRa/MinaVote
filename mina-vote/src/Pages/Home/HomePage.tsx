import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { requestAccounts } from '../../Frontend/WalletFunction/Walletfunction';
import { Request } from '../../Backend/Api/SendRequest';
import VoteCard from '../../Frontend/VoteCard/VoteCard';
  
type VoteData = {
  id: string;
  Vote_Name: string;
  Vote_Content: string;
  Vote_EndDate: string;
  Vote_Image?: string;
};
  const HomePage: React.FC = () => {
    const [votesData, setVotesData] = useState<VoteData[]>([]);
    const [selectedVote, setSelectedVote] = useState<VoteData | null>(null);
  

    const ShowVoteCard = (vote: VoteData) => {
      setSelectedVote(vote); 
    };
  
    const closeVoteCard = () => {
      setSelectedVote(null);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Request("GetVoteList",{ HomeData: "Get" } ); 
            setVotesData(response.data);
          } catch (error) {
            console.error("Error fetching votes data:", error);
          }
        };
        fetchData();
      }, []); 

    const connectWallet = async () => {
        if (window.mina) {
          try {
            const accounts = await requestAccounts();
            const account = accounts[0];
            console.log(`Connected with account: ${account}`);
          } catch (error) {
            console.error('There was an error connecting to the wallet', error);
          }
        } else {
          console.log('Please install the Mina wallet extension.');
        }
      };
    return (
        <div className="container">
          {selectedVote && (
        <VoteCard
          vote={selectedVote}
          closeVoteCard={closeVoteCard}
        />
      )}
            <div className="header">
                <div className="avatar-header"></div>
                <h1>Mina Vote</h1>
                <button className="connect-button" onClick={connectWallet}>Connect Wallet</button>
            </div>

            <div className='MainContent'>
                <div className="votes-section-slider">
                    <div className="slider">
                        <div className="vote-slider-card">
                            <div className="vote-slider-card-title">Vote Title 1</div>
                            <div className="vote-slider-card-description">Description of the vote.</div>
                        </div>
                        <div className="vote-slider-card">
                        <div className="vote-slider-card-title">Vote Title 2</div>
                            <div className="vote-slider-card-description">Description of the vote.</div>
                        </div>
                        <div className="vote-slider-card">
                        <div className="vote-slider-card-title">Vote Title 3</div>
                            <div className="vote-slider-card-description">Description of the vote.</div>
                        </div>
                        <div className="vote-slider-card">
                        <div className="vote-slider-card-title">Vote Title 4</div>
                            <div className="vote-slider-card-description">Description of the vote.</div>
                        </div>
                        <div className="vote-slider-card">
                        <div className="vote-slider-card-title">Vote Title 5</div>
                            <div className="vote-slider-card-description">Description of the vote.</div>
                        </div>
                        <div className="vote-slider-card">
                        <div className="vote-slider-card-title">Vote Title 6</div>
                            <div className="vote-slider-card-description">Description of the vote.</div>
                        </div>
                        
                    </div>
                </div>
                <div className='Vot-Modul-1'>
                    <div className="votes-section-list">
                        <div className="votes-list">
                        {votesData && votesData.map((vote) => (
                                <div key={vote.id} className="votes-list-item">
                                    {vote.Vote_Image && (
                                        <img src={vote.Vote_Image} alt={vote.Vote_Name} className="list-image" />
                                    )}
                                    <div className="list-content">
                                        <h2 className="list-title">{vote.Vote_Name}</h2>
                                        <p className="list-description">{vote.Vote_Content}</p>
                                        <p className="list-date">End Date: {vote.Vote_EndDate}</p>
                                    </div>
                                    <div className="list-right">
                                    <button onClick={() => ShowVoteCard(vote)} className="list-vote-label">
                                      Vote
                                    </button>
                                    </div>
                            </div>
                                ))}
                        </div>
                    </div>
                    <div className="votes-section-top">
                        <div className="top-votes">                            
                            <div className="top-votes-item">
                                <div className="top-votes-profile"></div>
                                <div className="top-votes-content"><p>Test-1</p></div>
                                <div className="top-votes-status"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };    
export default HomePage;
