import * as React from 'react';

type Props = {
  text: string,
  image: string,
  onClick: () => void,
};

export const Button: React.FC<Props> = (props: Props)=> {
  return (
    <img
      src={ props.image }
      alt={ props.text }
      onClick={ props.onClick }
    />
  );
};
