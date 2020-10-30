import * as React from 'react';

import { Panel } from '../../atoms';
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
      <Panel
        color="#3CB371"
        title={ emblemRef?.title }
      >
        <section>
          <p>{ emblemRef?.description }</p>
        </section>
      </Panel>
    );
  }

  update() {
    this.forceUpdate();
  }
}
