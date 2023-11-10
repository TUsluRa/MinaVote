import React from 'react';
import './VoteCard.css';

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
  type VoteCardProps = {
    vote: VoteData | SliderData;
    closeVoteCard: () => void;
  };

const VoteCard: React.FC<VoteCardProps> = ({ vote, closeVoteCard }) => {

  const isVoteData = (vote: VoteData | SliderData): vote is VoteData => {
    return (vote as VoteData).Vote_Name !== undefined;
};
    return (
        <div className="Vote-Card">
            <div className="Vote-Card-content">
                <div className="Vote-Card-content-header">
                    <h2>{isVoteData(vote) ? vote.Vote_Name : vote.Slider_Name}</h2>
                </div>
                <div className="Vote-Card-content-description">
                    <p>{isVoteData(vote) ? vote.Vote_Content : vote.Slider_Items}</p>
                </div>
                <div className="Vote-Card-content-vote-buttons">
                    <button className="vote-button-yes">Yes</button>
                    <button className="vote-button-close"onClick={closeVoteCard}>Close</button>
                    <button className="vote-button-no">No</button>
                </div>
            </div>
        </div>
    );
};

export default VoteCard;
