// walletStore.js
import { useState, useRef } from 'react';

export const useWalletState = () => {
  const [walletState, setWalletState] = useState(false);
  return [walletState, setWalletState];
};

export const useWalletAction = () => {
  const walletAction = useRef({
    enable: false,
    callback: null,
    message: null,
  });
  return walletAction.current;
};
