import React ,{ useState }from 'react';
import { GetServerSideProps } from 'next';
import { getVotesList } from '../../Backend/Server/Database/DatabaseProcess.cjs';
import styles from '../styles/ListVote.module.css';

interface VotesPageProps {
  votes: Vote[];
}
type Vote = {
  id: string;
  Vote_Content: string;
  Vote_Name: string;
  Vote_Question: string;
  Vote_Crypto: string;
  Vote_DeployAccounts: string;
  Vote_EndDate: string;
  Vote_Image: string;
  Vote_Logs: string;
  Vote_No: string;
  Vote_StartDate: string;
  Vote_Status: string;
  Vote_Yes: string;
};

interface VotesPageProps {
  votes: Vote[];
}

const VotesPage: React.FC<VotesPageProps> = ({ votes }) => {
  const [selectedVoteId, setSelectedVoteId] = useState<string>('');

  return (
    <div className={styles.listContainer}>
      {votes.map((vote) => (
        <div key={vote.id} className={styles.listItem}>
          {vote.Vote_Image && (
            <img src={vote.Vote_Image} alt={vote.Vote_Name} className={styles.listImage} />
          )}
          <div className={styles.listContent}>
            <h2 className={styles.listTitle}>{vote.Vote_Name}</h2>
            <p className={styles.listDescription}>{vote.Vote_Content}</p>
            <p className={styles.listDate}>End Date: {vote.Vote_EndDate}</p>
          </div>
          <label className={styles.listVoteLabel}>
            <input
              type="radio"
              name="vote"
              value={vote.id}
              checked={selectedVoteId === vote.id}
              onChange={(e) => setSelectedVoteId(e.target.value)}
            />
            Vote
          </label>
        </div>
      ))}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps<VotesPageProps> = async () => {
  try {
    const votes = await getVotesList();
    return { props: { votes } };
  } catch (error) {
    console.error('Error fetching votes:', error);
    return { props: { votes: [] } };
  }
};

export default VotesPage;