import { Bodies, Body, Engine, Events, Render, Runner, Vector, World } from '@siketyan/matter-js';
import * as decomp from 'poly-decomp';

global['decomp'] = decomp;

const EMBLEMS_JSON_FILE = './emblems.json';
const EMBLEMS_DIRECTORY = './emblems/';

type Emblem = {
  image: string,
  metadata: string,
};

const engine = Engine.create();
const renderer = Render.create({
  element: document.getElementById('app'),
  engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: 'white',
  },
});

Render.run(renderer);

const runner = Runner.create();
Runner.run(runner, engine);

const ground = Bodies.rectangle(
  renderer.options.width / 2,
  renderer.options.height + 10,
  renderer.options.width + 10,
  60,
  {
    isStatic: true,
  },
);

const waitForStopping = (body: Body, count: number, threshold: number): Promise<void> => {
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
        Events.off(runner, 'beforeUpdate', callback);
        resolve();
      }

      previous = {
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
      };
    };

    Events.on(runner, 'beforeUpdate', callback);
  });
};

(async () => {
  const scale = 0.5;
  const emblems: Emblem[] = await fetch(EMBLEMS_JSON_FILE).then(r => r.json());
  const emblem = emblems[Math.floor(Math.random() * emblems.length)];
  const vertices: Vector[] = await fetch(EMBLEMS_DIRECTORY + emblem.metadata).then(r => r.json());
  const body = Bodies.fromVertices(
    renderer.options.width / 2,
    200,
    [vertices.map(v => (<Vector>{ x: v.x * scale, y: v.y * scale }))],
    {
      render: {
        sprite: {
          xScale: scale,
          yScale: scale,
          texture: EMBLEMS_DIRECTORY + emblem.image,
          single: true,
        },
      },
    },
  );

  Body.setStatic(body, true);
  World.add(engine.world, [ground, body]);

  document.getElementById('control-left').onclick = () => Body.setPosition(body, { x: body.position.x - 1, y: body.position.y });
  document.getElementById('control-right').onclick = () => Body.setPosition(body, { x: body.position.x + 1, y: body.position.y });
  document.getElementById('control-anticlockwise').onclick = () => Body.setAngle(body, body.angle - Math.PI / 180);
  document.getElementById('control-clockwise').onclick = () => Body.setAngle(body, body.angle + Math.PI / 180);
  document.getElementById('control-drop').onclick = () => Body.setStatic(body, false);
})()
  .then()
  .catch(console.error)
;
