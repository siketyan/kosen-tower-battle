import * as React from 'react';

type Props = {
  text: string,
  onClick: () => void,
};

export const Button: React.FC<Props> = (props: Props)=> {
  return (
    <button
      onClick={ props.onClick }
    >{ props.text }</button>
  );
};
