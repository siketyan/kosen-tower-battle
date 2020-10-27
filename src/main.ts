import { Bodies, Body, Engine, Events, Render, Runner, Vector, World } from '@siketyan/matter-js';
import * as decomp from 'poly-decomp';
import './styles/app.scss';

global['decomp'] = decomp;

const WIDTH = 1080;
const HEIGHT = 1920;
const EMBLEMS_JSON_FILE = './emblems.json';
const EMBLEMS_DIRECTORY = './emblems/';

type Emblem = {
  image: string,
  metadata: string,
};

const element = document.getElementById('app');
const engine = Engine.create();
const renderer = Render.create({
  element,
  engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    wireframes: false,
    background: '#a0d8ef',
  },
});

Render.run(renderer);

const runner = Runner.create();
Runner.run(runner, engine);

const ground = Bodies.rectangle(
  WIDTH / 2,
  HEIGHT * 4 / 5,
  WIDTH / 2,
  60,
  {
    isStatic: true,
  },
);

World.add(engine.world, ground);

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

const detectDropout = (body: Body, runner: Runner, y: number): void => {
  const callback = () => {
    if (body.position.y > y) {
      console.log('hi!');

      World.remove(engine.world, body);
      Events.off(runner, 'beforeUpdate', callback);

      alert('Game over!');
      location.reload();
    }
  };

  Events.on(runner, 'beforeUpdate', callback);
};

const spawn = async (): Promise<Body> => {
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
  World.add(engine.world, body);

  element.onclick = event => Body.setPosition(body, { x: event.offsetX * WIDTH / element.clientWidth, y: body.position.y });
  document.getElementById('control-anticlockwise').onclick = () => Body.setAngle(body, body.angle - Math.PI / 180);
  document.getElementById('control-clockwise').onclick = () => Body.setAngle(body, body.angle + Math.PI / 180);
  document.getElementById('control-drop').onclick = () => Body.setStatic(body, false);

  return body;
};

(async () => {
  while (true) {
    const body = await spawn();
    detectDropout(body, runner, renderer.options.height);

    await waitForStopping(body, 100, 0.1);
  }
})()
  .then()
  .catch(console.error)
;
