import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface FlyoutProps {
  onClose: VoidFunction;
}

const ANIMATION_TIME = .27; // seconds

const FlyoutBackdrop = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333333;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.show ? '0.8' : '0')};
`;

const FlyoutContent = styled.div<{ show: boolean }>`
  opacity: 1;
  background-color: #EFEFEF;
  color: #121212;
  position: fixed;
  width: 360px;
  top: 0;
  bottom: 0;
  transition: all ${ANIMATION_TIME}s linear;
  right: ${props => (props.show ? '0' : '-360px')};
`;

const Flyout: React.SFC<FlyoutProps> = props => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [shouldShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      setShow(true);
    }
  });

  const onClose = () => {
    setShow(false);
    setTimeout(props.onClose, ANIMATION_TIME * 1000);
  };

  return (
    <div>
      <FlyoutBackdrop onClick={onClose} show={shouldShow} />
      <FlyoutContent show={shouldShow}>{props.children}</FlyoutContent>
    </div>
  );
};

export default Flyout;
