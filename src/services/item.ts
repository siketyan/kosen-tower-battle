import { Bodies, Body, Vector } from '@siketyan/matter-js';

import { Emblem } from '../models';

export class Item {
  readonly body: Body;

  get position(): Vector {
    return this.body.position;
  }

  set position(value: Vector) {
    Body.setPosition(this.body, value);
  }

  constructor(
    private emblem: Emblem,
    private scale: number = 0.5,
  ) {
    this.body = Bodies.fromVertices(
      0,
      0,
      [emblem.vertices.map(v => (<Vector>{ x: v.x * scale, y: v.y * scale }))],
      {
        render: {
          sprite: {
            xScale: scale,
            yScale: scale,
            texture: emblem.imageRef,
            single: true,
          },
        },
      },
    );

    Body.setStatic(this.body, true);
  }

  drop(): void {
    Body.setStatic(this.body, false);
  }

  rotate(degree: number): void {
    Body.rotate(this.body, Math.PI * degree / 180);
  }
}