#!/usr/bin/env python3

import json
import os
import shutil
import cv2


SOURCE_DIRECTORY = os.path.join('..', 'emblems')
DESTINATION_DIRECTORY = os.path.join('..', 'dist', 'emblems')


def compile(source: str, destination: str) -> None:
    mat = cv2.imread(source, cv2.IMREAD_UNCHANGED)
    ret, mask = cv2.threshold(mat[:, :, 3], 0, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    maxContour = max(contours, key = cv2.contourArea)

    points = []

    for x, y in [p[0] for p in maxContour]:
        points.append({
            'x': int(x),
            'y': int(y)
        })

    with open(destination, 'w+') as file:
        file.write(json.dumps(points))

    shutil.copy(source, os.path.join(os.path.dirname(destination), os.path.basename(source)))


def main() -> None:
    emblems = []

    if not os.path.exists(DESTINATION_DIRECTORY):
        os.makedirs(DESTINATION_DIRECTORY)

    for filename in [f for f in os.listdir(SOURCE_DIRECTORY) if f.endswith('.png')]:
        source = os.path.join(SOURCE_DIRECTORY, filename)
        destination = os.path.join(DESTINATION_DIRECTORY, '%s.json' % filename)

        print('Compiling: %s -> %s' % (source, destination))
        compile(source, destination)

        emblems.append({
            'image': os.path.basename(source),
            'metadata': os.path.basename(destination),
        })

    with open(os.path.join(DESTINATION_DIRECTORY, '..', 'emblems.json'), 'w+') as file:
        file.write(json.dumps(emblems))


if __name__ == '__main__':
    main()
