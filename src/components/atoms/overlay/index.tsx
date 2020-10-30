import * as React from 'react';

type Props = {
  children: React.ReactElement,
};

export const Overlay: React.FC = (props: Props) => {
  return (
    <div className="overlay">
      { props.children }
    </div>
  );
};
