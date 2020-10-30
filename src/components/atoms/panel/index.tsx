import * as React from 'react';

type Props = {
  title?: string,
  children: React.ReactElement,
  color: React.CSSProperties['backgroundColor'],
};

export const Panel: React.FC<Props> = (props: Props) => {
  const style: React.CSSProperties = {
    backgroundColor: props.color,
  };

  return (
    <div
      className="panel"
      style={ style }
    >
      { props.title ? <header>{ props.title }</header> : <></> }
      <div className="panel-body">
        { props.children }
      </div>
    </div>
  );
};
