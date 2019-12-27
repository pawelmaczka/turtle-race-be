import uuid from 'uuid';

class WithUniqueId {
  private readonly id: string;

  public constructor() {
    this.id = uuid();
  }

  public getId() {
    return this.id;
  }
}

export default WithUniqueId;
