export class Block {
  private _id: string = "";
  public get id(): string {
    return this._id;
  }
  public set id(v: string) {
    this._id = v;
  }

  private _timestamp: string = "";
  public get timestamp(): string {
    return this._timestamp;
  }
  public set timestamp(v: string) {
    this._timestamp = v;
  }

  private _actionCount: number = 0;
  public get actionCount(): number {
    return this._actionCount;
  }
  public set actionCount(v: number) {
    this._actionCount = v;
  }
}
