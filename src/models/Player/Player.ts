import WithUniqueId from 'models/WithUniqueId';

class Player extends WithUniqueId {
  private name: string;

  public constructor(name: string) {
    super();

    this.name = name;
  }

  public getName() {
    return this.name;
  }
}

export default Player;
