import * as React from 'react';
import * as QRCode from 'qrcode';

import { Button, Overlay, Panel } from '../../atoms';

const TITLE = '高専タワーバトル';
const TEXT = '高専に関するものを積み上げよう！いったいどこまで高く積むことができるのか！？';
const URL = 'https://ktb.pv6.jp/';

const getSharezUrl = () => {
  const e = encodeURIComponent;
  return `https://s.pv6.jp/?text=${e(`${TITLE}: ${TEXT}`)}&url=${e(URL)}`;
};

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
              {
                !location.href.includes('/ktb.pv6.jp/')
                  ? (
                    <>
                      <p>下の QR コードをスキャンするとソーシャルメディアに共有できます．</p>
                      <p>
                        <canvas
                          id="qrcode"
                          ref={this.canvasRef}
                        />
                      </p>
                    </>
                  )
                  : (
                    <p>
                      <Button
                        text="共有"
                        onClick={ () => location.href = getSharezUrl() }
                      />
                    </p>
                  )
              }
            </section>
          </>
        </Panel>
      </Overlay>
    );
  }

  async componentDidMount(): Promise<void> {
    await QRCode.toCanvas(this.canvasRef.current, getSharezUrl());
  }

  private static
}
