import React from 'react';
import { Typography, Avatar, message, Image, Button } from 'antd';

import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import './User.scss';
import tickAsset from '../../assets/tick.png';
export default function Phone() {
  const history = useHistory();
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header">
        <Typography.Text className="header-text">Điện thoại</Typography.Text>
      </div>
        <Image
          src={'/photo_2024-07-23_18-11-34.jpg  '}
          style={{padding:10}}
          preview={false}
        />
      <div
        style={{
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image src={tickAsset} preview={false} style={{ maxWidth: 100 }} />
        <Typography.Text
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#555',
            textAlign: 'center',
          }}
        >
          &reg; Bản quyền thuộc về công ty cổ phần Dịch vụ Tài chính
          <br /> VietCredit
        </Typography.Text>
      </div>
    </motion.div>
  );
};
