import { Bodies, Engine, Render, Runner, Vector, World } from '@siketyan/matter-js';
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

  World.add(engine.world, [ground, body]);
})()
  .then()
  .catch(console.error)
;
