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

type SliderData = {
  Slider_ID: string;
  Slider_Items: string;
  Slider_Name: string;
  Slider_Image: string;
};
type CombinedData = VoteData | SliderData;

  const HomePage: React.FC = () => {
    const [votesData, setVotesData] = useState<VoteData[]>([]);
    const [sliderData, setSliderData] = useState<SliderData[]>([]);
    const [selectedVote, setSelectedVote] = useState<CombinedData | null>(null);

  

    const ShowVoteCard = (vote: VoteData | SliderData) => {
      console.log("ShowVoteCard called with:", vote);
      setSelectedVote(vote); 
    };
  
    const closeVoteCard = () => {
      setSelectedVote(null);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await Request("GetVoteList",{ HomeData: "Get" } ); 
            const response2 = await Request("GetSliderList",{ HomeData: "Get" } ); 
            setSliderData(response2.data);
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
                <h1>Mina Vote</h1>
                <button className="connect-button" onClick={connectWallet}>Connect Wallet</button>
            </div>

            <div className='MainContent'>
                <div className="votes-section-slider">
                    <div className="slider">
                      {sliderData.map((data) => (
                        <div className="vote-slider-card" key={data.Slider_ID} style={{ backgroundImage: `url(${data.Slider_Image})` }} >
                          <div className="vote-slider-card-title">{data.Slider_Name}</div>
                          <div className="vote-slider-card-description">{data.Slider_Items}</div>
                          <div className='vote-slider-card-bottom'>
                          <button onClick={() => ShowVoteCard(data)} className="slider-vote-label">Vote</button>
                          </div>
                        </div>
                      ))}
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
