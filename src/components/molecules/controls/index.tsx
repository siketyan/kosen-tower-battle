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
      <Button text="↪" onClick={ props.onRotateLeft } />
      <Button text="↓" onClick={ props.onDrop } />
      <Button text="↩" onClick={ props.onRotateRight } />
    </nav>
  );
};
