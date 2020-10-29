import * as React from 'react';

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
};

export class Canvas extends React.Component<Props> {
  readonly container: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        id="app"
        ref={ this.container }
        onClick={ this.props.onClick }
      />
    );
  }
}
