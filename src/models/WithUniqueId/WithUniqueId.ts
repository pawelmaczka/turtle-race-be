import uuid from 'uuid';

class WithUniqueId {
  private id: string;

  public constructor() {
    this.id = uuid();
  }

  public getId() {
    return this.id;
  }
}

export default WithUniqueId;
