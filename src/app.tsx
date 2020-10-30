import * as React from 'react';

import { Controls, EndScreen, Tooltip, Tutorial } from './components/molecules';
import { Canvas } from './components/atoms/canvas';
import { Fetcher, Game } from './services';

type Props = {
};

type State = {
  isTutorialClosed: boolean,
  isEnd: boolean,
};

export class App extends React.Component<Props, State> {
  readonly canvas: React.RefObject<Canvas> = React.createRef();
  readonly tooltip: React.RefObject<Tooltip> = React.createRef();
  private _game: Game;

  get game() {
    return this._game;
  }

  constructor(
    props: Props,
  ) {
    super(props);

    this.state = {
      isTutorialClosed: false,
      isEnd: false,
    };
  }

  render() {
    const getItem = () => this.game?.session?.item;

    return (
      <main>
        <Canvas
          ref={ this.canvas }
          onClick={ this.onCanvasClicked.bind(this) }
        />
        <Tooltip
          ref={ this.tooltip }
          getEmblemRef={ () => getItem()?.emblem.ref }
        />
        <Controls
          onDrop={ () => getItem().drop() }
          onRotateLeft={ () => getItem().rotate(-45) }
          onRotateRight={ () => getItem().rotate(45) }
        />
        { this.state.isEnd ? <EndScreen /> : <></> }
        { !this.state.isTutorialClosed ? <Tutorial onClosing={ this.onTutorialClosing.bind(this) } /> : <></> }
      </main>
    );
  }

  async componentDidMount(): Promise<void> {
    const fetcher = new Fetcher();
    this._game = new Game(this.canvas.current, fetcher);
    await this._game.start(
      () => this.tooltip.current.update(),
      () => this.onGameOver(),
    );
  }

  onGameOver(): void {
    console.log('GAME OVER');
    this.setState({
      isEnd: true,
    });
  }

  private onTutorialClosing(): void {
    this.setState({
      isTutorialClosed: true,
    });
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
