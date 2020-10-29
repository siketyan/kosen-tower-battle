import * as React from 'react';

import { Controls } from './components/molecules/controls';
import { Canvas } from './components/atoms/canvas';
import { Game } from './services';
import { Fetcher } from './services/fetcher';

type Props = {
};

export class App extends React.Component<Props> {
  readonly canvas: React.RefObject<Canvas> = React.createRef();
  private _game: Game;

  get game() {
    return this._game;
  }

  constructor(
    props: Props,
  ) {
    super(props);
  }

  render() {
    const getItem = () => this.game.session?.item;

    return (
      <main>
        <Canvas
          ref={ this.canvas }
          onClick={ this.onCanvasClicked.bind(this) }
        />
        <Controls
          onDrop={ () => getItem().drop() }
          onRotateLeft={ () => getItem().rotate(-45) }
          onRotateRight={ () => getItem().rotate(45) }
        />
      </main>
    );
  }

  componentDidMount() {
    const fetcher = new Fetcher();
    this._game = new Game(this.canvas.current, fetcher);
    this._game.start().then();
  }

  private onCanvasClicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const item = this.game.session?.item;
    const stage = this.game.stage;

    if (!item || !stage) {
      return;
    }

    item.position = {
      ...item.position,
      x: event.nativeEvent.offsetX * stage.width / stage.element.clientWidth,
    };
  }
}
