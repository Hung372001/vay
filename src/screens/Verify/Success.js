import React from 'react';
import { Image, Progress, Typography } from 'antd';
import { motion } from 'framer-motion';
import _img from '../../assets/success.jpg';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Success() {
  const { currentContract } = useSelector((state) => state._auth);
  const history = useHistory();
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: '100%',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Image src={_img} preview={false} />
      <Progress type="circle" percent={100} size="small" />
      <Typography.Text style={{ fontSize: 17, textAlign: 'center' }}>
        Chúc mừng
      </Typography.Text>
      <Typography.Text style={{ fontSize: 17, textAlign: 'center' }}>
        Hoàn thành xác minh danh tính. Vui lòng tiếp tục
      </Typography.Text>
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
        onClick={
          currentContract?.amount
            ? () => history.replace('/contracts')
            : () => history.replace('/vay')
        }
      >
        <Typography.Text
          style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}
        >
          Tiếp tục
        </Typography.Text>
      </motion.div>
    </motion.div>
  );
}
