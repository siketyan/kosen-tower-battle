import { Bodies, Engine, Render, Runner, World } from '@siketyan/matter-js';
import * as decomp from 'poly-decomp';

global['decomp'] = decomp;

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

const box = Bodies.rectangle(400, 200, 80, 80);

World.add(engine.world, [ground, box]);
