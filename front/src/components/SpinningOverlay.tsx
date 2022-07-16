import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

export default function SpinningOverlay({
  isSpinning,
  children
}: PropsWithChildren<{
  isSpinning: boolean;
}>) {
  return (
    <div className="position-relative">
      {children}
      {isSpinning && (
        <Overlay>
          <div className="spinner-border position-absolute text-primary" />
        </Overlay>
      )}
    </div>
  );
}

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
`;
