import * as React from 'react';

import { EmblemRef } from '../../../models';

export type Props = {
  getEmblemRef: () => EmblemRef;
};

export class Tooltip extends React.Component<Props> {
  constructor(
    props: Props,
  ) {
    super(props);
  }

  render() {
    const emblemRef = this.props.getEmblemRef();

    if (!emblemRef) {
      return <></>;
    }

    return (
      <div className="tooltip">
        <header>{ emblemRef?.title }</header>
        <p>{ emblemRef?.description }</p>
      </div>
    );
  }

  update() {
    this.forceUpdate();
  }
}
