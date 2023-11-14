import { SmartContract, state, State, method, PublicKey, UInt32, DeployArgs, Permissions } from 'o1js';

export class VoteContract extends SmartContract {
  events = {
    'voted': PublicKey,
  }

  @state(UInt32) totalVoteCount = State<UInt32>()

  deploy(args: DeployArgs) {
    super.deploy(args)

    const permissionToEdit = Permissions.proof()

    this.account.permissions.set({
      ...Permissions.default(),
      editState: permissionToEdit,
      setTokenSymbol: permissionToEdit,
      send: permissionToEdit,
      receive: permissionToEdit,
    })
  }

  init() {
    super.init()
    this.totalVoteCount.set(UInt32.zero)
  }

  @method vote(vote: boolean) {
    const totalVoteCount = this.totalVoteCount.getAndAssertEquals()

    this.totalVoteCount.set(totalVoteCount.add(UInt32.one))

    this.emitEvent('voted', this.sender)
  }
}
