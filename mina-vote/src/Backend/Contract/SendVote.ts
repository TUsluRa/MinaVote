import { VoteContract } from './VoteContract.ts';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, UInt32, UInt64 } from 'o1js';

let proofsEnabled = false;

describe('Voting Contract', () => {
  let deployer: PrivateKey
  let voterOne: PrivateKey
  let voterTwo: PrivateKey
  let zkapp: PrivateKey
  let voting: VoteContract
  let verificationKey: {
    data: string
    hash: Field
  }

  beforeAll(async () => {
    const res = await VoteContract.compile();
    verificationKey = res.verificationKey

    const Local = Mina.LocalBlockchain({ proofsEnabled })
    Mina.setActiveInstance(Local)

    deployer = Local.testAccounts[0].privateKey
    voterOne = Local.testAccounts[1].privateKey
    voterTwo = Local.testAccounts[2].privateKey
    zkapp = PrivateKey.random()
    voting = new VoteContract(zkapp.toPublicKey())
  });

  it('Can deploy the Voting contract!', async () => {
    const txn = await Mina.transaction(deployer.toPublicKey(), () => {
      AccountUpdate.fundNewAccount(deployer.toPublicKey());
      voting.deploy({ verificationKey, zkappKey: zkapp });
    });

    await txn.prove();

    await txn.sign([deployer, zkapp]).send();

    expect(voting.totalVoteCount.get()).toEqual(UInt32.zero)
  });

  it('Can vote!', async () => {
    const vote = true;
    const tx = await Mina.transaction(voterOne.toPublicKey(), () => {
      AccountUpdate.fundNewAccount(deployer.toPublicKey());
      voting.vote(vote)
    })

    await tx.prove()

    await tx.sign([voterOne]).send()

    expect(voting.totalVoteCount.get()).toEqual(UInt32.from(1))
  });

});