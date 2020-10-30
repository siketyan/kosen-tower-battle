import { Bodies, Engine, Render, Vector, World } from '@siketyan/matter-js';

import { Item } from '.';

export class Stage {
  private readonly world: World;
  private readonly render: Render;

  constructor(
    private engine: Engine,
    public readonly element: HTMLElement,
    public readonly width: number = 1080,
    public readonly height: number = 1920,
  ) {
    this.world = engine.world;
    this.render = Render.create({
      element,
      engine,
      options: {
        width: width,
        height: height,
        hasBounds: true,
        wireframes: false,
        background: '#a0d8ef',
      },
    });
  }

  run() {
    Render.run(this.render);
    World.add(
      this.world,
      Bodies.rectangle(
        this.width / 2,
        this.height * 4 / 5,
        this.width * 7 / 10,
        60,
        {
          isStatic: true,
          friction: 1.2,
          frictionStatic: 1,
          restitution: 0,
        },
      ),
    );
  }

  add(item: Item) {
    item.position = {
      x: this.width / 2,
      y: (this.render.bounds.max.y - this.render.bounds.min.y) / 2 - 256,
    };
    World.add(this.world, item.body);
  }

  adjustBounds(): void {
    const highest = Math.min(...this.world.bodies.map(b => b.position.y));
    const center = (this.render.bounds.max.y - this.render.bounds.min.y) / 2;
    const delta = center - highest;

    if (delta > 0) {
      this.render.bounds.max.y = highest + center;
      this.render.bounds.min.y = highest - center;
    }
  };
}
