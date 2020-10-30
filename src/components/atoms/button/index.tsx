import * as React from 'react';

type Props = {
  text: string,
  image?: string,
  onClick: () => void,
};

export const Button: React.FC<Props> = (props: Props)=> {
  return (
    props.image
      ? (
        <img
          src={ props.image }
          alt={ props.text }
          onClick={ props.onClick }
        />
      )
      : (
        <button
          onClick={ props.onClick }
        >{ props.text }</button>
      )
  );
};
