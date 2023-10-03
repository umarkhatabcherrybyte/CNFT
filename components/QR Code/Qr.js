import React from "react";
import QRCode from "react-qr-code";

const QrCode = () => {
  return (
    <>
      <QRCode size={60} value="value" fgColor="#fff" bgColor="transparent" />
    </>
  );
};

export default QrCode;
