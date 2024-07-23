import React from 'react';
import _gif from '../../assets/giphy.gif';
import _portraits from '../../assets/portraits.png';

import { Image, Typography, Button } from 'antd';
import { motion } from 'framer-motion';
export default function Overview({ onOk }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
      }}
    >
      <Typography.Text strong>
        Bước 1 : Chụp ảnh trước và sau của CMND / CCCD
      </Typography.Text>
      <Image src={_gif} width="70%" preview={false} />
      <Typography.Text strong>Bước 2 : Chụp ảnh chân dung</Typography.Text>
      <Image src={_portraits} preview={false} width="70%" />
      <motion.div
        whileTap={{ opacity: 0.4, scale: 0.97 }}
        style={{
          background: '#002dbf',
          width: '70%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          borderRadius: 10,
          padding: 5,
        }}
        onClick={onOk}
      >
        <Typography.Text
          style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}
        >
          Đã hiểu !
        </Typography.Text>
      </motion.div>
    </div>
  );
}
