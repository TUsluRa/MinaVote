import React from 'react';
import './styles.css';

function HomePage() {
    return (
        <div className="container">
            <div className="header">
                <div className="avatar"></div>
                Mina Vote
                <button className="button">Connect button</button>
            </div>

            <div className="vote-section">
                <div className="vote-slider">
                    <div className="vote-card"></div>
                    <div className="vote-card"></div>
                    <div className="vote-card"></div>
                </div>

                <div className="current-votes">
                    Last Votes List item 1
                    Last Votes List item 2
                    Last Votes List item 3
                </div>

                <div className="top-votes">
                    Top Votes
                </div>
            </div>
        </div>
    );
}

export default HomePage;
