import { Vector } from '@siketyan/matter-js';

import { EmblemRef } from './emblem-ref';
import { ImageRef } from './image-ref';

export type Emblem = {
  ref: EmblemRef;
  imageRef: ImageRef;
  vertices: Vector[],
};
