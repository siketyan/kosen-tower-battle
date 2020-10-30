import * as React from 'react';

import { Button, Overlay, Panel } from '../../atoms';

type Props = {
  onClosing: () => void,
};

export const Tutorial: React.FC<Props> = (props: Props) => {
  return (
    <Overlay>
      <Panel
        color="#ff7bac"
        title="ようこそ"
      >
        <>
          <section>
            <h4>高専タワーバトルへようこそ！</h4>
            <p>
              遊び方はとても簡単です．
              タップして位置を決め，↪️↩️ボタンで角度を決めて⬇️ボタンで落とすだけ！
              あなたはどこまで高く積むことができますか？
            </p>
            <Button
              text="はじめる"
              onClick={ () => props.onClosing() }
            />
          </section>
        </>
      </Panel>
    </Overlay>
  );
}
