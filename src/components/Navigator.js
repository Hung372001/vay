import { useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  CreditCardOutlined,
  DollarOutlined,
  WhatsAppOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';

export default function Navigator() {
  const history = useHistory();
  const [current, setCurrent] = useState('home');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 60,
        padding: '0px 30px',
        borderTop: '1px solid #eee',
        paddingBottom: 10,
        background: '#fff',
      }}
    >
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        style={{
          minHeight: 60,
          borderRadius: 25,
          minWidth: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onClick={() => {
          setCurrent('home');
          history.push('/');
        }}
      >
        <DollarOutlined
          style={{
            fontSize: 20,
            color: current == 'home' ? '#ff0021' : '#666',
          }}
        />
        <Typography.Text
          style={{
            fontSize: 12,
            color: current == 'home' ? '#ff0021' : '#666',
          }}
        >
          Số tiền vay
        </Typography.Text>
      </motion.div>
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        style={{
          minHeight: 60,
          borderRadius: 25,
          minWidth: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onClick={() => {
          setCurrent('wallet');
          history.push('/wallet');
        }}
      >
        <CreditCardOutlined
          style={{
            fontSize: 20,
            color: current == 'wallet' ? '#ff0021' : '#666',
          }}
        />
        <Typography.Text
          style={{
            fontSize: 12,
            color: current == 'wallet' ? '#ff0021' : '#666',
          }}
        >
          Ví tiền
        </Typography.Text>
      </motion.div>
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        style={{
          minHeight: 45,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#fff',
        }}
        onClick={() => {
          window.location.href = 'https://www.messenger.com/t/100082706225362/'
        }}
      >
        <WhatsAppOutlined
          style={{
            fontSize: 20,
            color: current == 'messenger' ? '#ff0021' : '#666',
          }}
        />
        <Typography.Text
          style={{
            fontSize: 12,
            color: current == 'messenger' ? '#ff0021' : '#666',
          }}
        >
          Dịch Vụ
        </Typography.Text>
      </motion.div>
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        style={{
          minHeight: 45,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#fff',
        }}
        onClick={() => {
          history.push('/phone');
          setCurrent('phone');
        }}
      >
        <PhoneOutlined
          style={{
            fontSize: 20,
            color: current == 'phone' ? '#ff0021' : '#666',
          }}
        />
        <Typography.Text
          style={{
            fontSize: 12,
            color: current == 'phone' ? '#ff0021' : '#666',
          }}
        >
          Điện Thoại
        </Typography.Text>
      </motion.div>
      <motion.div
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        style={{
          minHeight: 45,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#fff',
        }}
        onClick={() => {
          history.push('/me');
          setCurrent('me');
        }}
      >
        <UserOutlined
          style={{
            fontSize: 20,
            color: current == 'me' ? '#ff0021' : '#666',
          }}
        />
        <Typography.Text
          style={{
            fontSize: 12,
            color: current == 'me' ? '#ff0021' : '#666',
          }}
        >
          Tôi
        </Typography.Text>
      </motion.div>
    </div>
  );
}
