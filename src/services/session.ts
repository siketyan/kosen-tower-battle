import { Vector } from '@siketyan/matter-js';

import { Item, Stage } from '.';

export class Session {
  constructor(
    readonly stage: Stage,
    readonly item: Item,
    readonly spawnAt: Vector = Vector.create(stage.width / 2, 200),
  ) {
    stage.add(item, spawnAt);
  }
}
