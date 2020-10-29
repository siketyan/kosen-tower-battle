import * as React from 'react';

import { Button } from '../../atoms';

type Props = {
  onDrop: () => void,
  onRotateLeft: () => void,
  onRotateRight: () => void,
};

export const Controls: React.FC<Props> = (props: Props) => {
  return (
    <nav id="controls">
      <Button
        text="↪"
        image="./rotate-left.svg"
        onClick={ props.onRotateLeft }
      />
      <Button
        text="↓"
        image="./drop.svg"
        onClick={ props.onDrop }
      />
      <Button
        text="↩"
        image="./rotate-right.svg"
        onClick={ props.onRotateRight }
      />
    </nav>
  );
};
