import * as React from 'react';
import * as QRCode from 'qrcode';

import { Button, Overlay, Panel } from '../../atoms';

export class EndScreen extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  render() {
    return (
      <Overlay>
        <Panel
          color="red"
          title="GAME OVER"
        >
          <>
            <section>
              <h4>ゲームオーバー！</h4>
              <Button
                text="はじめから"
                onClick={ location.reload.bind(location) }
              />
            </section>
            <hr />
            <section>
              <h4>シェア</h4>
              <p>下の QR コードをスキャンするとソーシャルメディアに共有できます．</p>
              <p>
                <canvas
                  id="qrcode"
                  ref={ this.canvasRef }
                />
              </p>
            </section>
          </>
        </Panel>
      </Overlay>
    );
  }

  async componentDidMount(): Promise<void> {
    const e = encodeURIComponent;
    await QRCode.toCanvas(
      this.canvasRef.current,
      `https://s.pv6.jp/?text=${e('高専タワーバトルに挑戦したよ！')}&url=${e(location.href)}`,
    );
  }
}
