import { Body, Engine, Events, Runner, World } from '@siketyan/matter-js';

import { pick } from '../utilities';
import { Canvas } from '../components/atoms';
import { Emblem } from '../models';
import { Fetcher, Item, Session, Stage } from '.';

export class Game {
  readonly stage: Stage;
  private _session: Session;

  get session() {
    return this._session;
  }

  constructor(
    private canvas: Canvas,
    private fetcher: Fetcher,
    private readonly engine: Engine = Engine.create(),
    private readonly runner: Runner = Runner.create(),
  ) {
    this.stage = new Stage(
      this.engine,
      canvas.container.current,
    );
  }

  async start() {
    const emblems = await this.fetcher.fetchEmblems();
    this.stage.run();

    Runner.run(this.runner, this.engine);

    while (true) {
      const emblemRef = pick(emblems);
      const imageRef = this.fetcher.getEmblemImageRef(emblemRef);
      const vertices = await this.fetcher.fetchEmblemVertices(emblemRef);
      const emblem: Emblem = { ref: emblemRef, imageRef, vertices };
      const object = new Item(emblem);

      this._session = new Session(this.stage, object);
      this.detectDropout(this._session.item.body, this.stage.height);
      await this.waitForStopping(this._session.item.body, 50, 0.05);
      this.stage.adjustBounds();
    }
  }

  private waitForStopping(body: Body, count: number, threshold: number): Promise<void> {
    return new Promise<void>(resolve => {
      let counter = 0;
      let previous = null;

      const ok = (a: number, b: number): boolean => Math.abs(a - b) < threshold;
      const callback = () => {
        if (body.isStatic) {
          return;
        }

        const conditions = [
          ok(previous?.x, body.position.x),
          ok(previous?.y, body.position.y),
          ok(previous?.angle, body.angle),
        ];

        if ((counter = conditions.every(c => c) ? counter + 1 : 0) >= count) {
          Events.off(this.runner, 'beforeUpdate', callback);
          resolve();
        }

        previous = {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
        };
      };

      Events.on(this.runner, 'beforeUpdate', callback);
    });
  }

  private detectDropout(body: Body, y: number): void {
    const callback = () => {
      if (body.position.y > y) {
        World.remove(this.engine.world, body);
        Events.off(this.runner, 'beforeUpdate', callback);

        alert('Game over!');
        location.reload();
      }
    };

    Events.on(this.runner, 'beforeUpdate', callback);
  };
}
