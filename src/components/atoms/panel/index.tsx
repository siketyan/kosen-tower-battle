import * as React from 'react';

type Props = {
  title?: string,
  children: React.ReactElement,
};

export const Panel: React.FC<Props> = (props: Props) => {
  return (
    <div className="panel">
      { props.title ? <header>{ props.title }</header> : <></> }
      { props.children }
    </div>
  );
};
