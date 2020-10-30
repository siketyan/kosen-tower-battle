import { Item, Stage } from '.';

export class Session {
  constructor(
    readonly stage: Stage,
    readonly item: Item,
  ) {
    stage.add(item);
  }
}
