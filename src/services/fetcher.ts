import { Vector } from '@siketyan/matter-js';

import { EmblemRef, ImageRef } from '../models';

const EMBLEMS_JSON_FILE = './emblems.json';
const EMBLEMS_DIRECTORY = './emblems/';

export class Fetcher {
  fetchEmblems(): Promise<EmblemRef[]> {
    return fetch(EMBLEMS_JSON_FILE).then(r => r.json());
  }

  fetchEmblemVertices(emblem: EmblemRef): Promise<Vector[]> {
    return fetch(EMBLEMS_DIRECTORY + emblem.metadata).then(r => r.json());
  }

  getEmblemImageRef(emblem: EmblemRef): ImageRef {
    return EMBLEMS_DIRECTORY + emblem.image;
  }
}
