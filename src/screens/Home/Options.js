import React, { useState } from 'react';
import {
  PlusCircleOutlined,
  FileTextOutlined,
  CustomerServiceFilled,
  WalletFilled,
  CreditCardOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Typography, Drawer, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import connectCSKH from '../../utils/connectCSKH';
export default function Options() {
  const history = useHistory();
  const { profile } = useSelector((state) => state._auth);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: 10,
        }}
      >
        <Item
          icon={<PlusCircleOutlined style={{ fontSize: 30, color: '#fff' }} />}
          color={'#2c4aab'}
          text={'Đăng ký vay'}
          onClick={() => history.push('/vay')}
        />
        <Item
          icon={<FileTextOutlined style={{ fontSize: 30, color: '#fff' }} />}
          color={'#3d7285'}
          text={'Hồ sơ'}
          onClick={() => setVisible(true)}
        />
        <Item
          icon={<WalletFilled style={{ fontSize: 30, color: '#fff' }} />}
          color={'#2c4aab'}
          text={'Ví tiền'}
          onClick={() => history.push('/wallet')}
        />
        <Item
          icon={
            <CustomerServiceFilled style={{ fontSize: 30, color: '#fff' }} />
          }
          color={'#3d7285'}
          text={'Hỗ trợ'}
          onClick={connectCSKH}
        />
      </div>
      <Drawer
        placement="bottom"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <div>
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minWidth: '100%',
              padding: 5,
              border: '1px solid #2c4aab',
              borderRadius: 10,
            }}
            onClick={() => history.push('/my-contract')}
            whileTap={{ opacity: 0.3, scale: 0.9 }}
          >
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: 20,
                background: '#2c4aab',
              }}
            >
              <CreditCardOutlined style={{ fontSize: 30, color: '#fff' }} />
            </motion.div>
            <Typography.Text style={{ flex: 1, paddingLeft: 20, fontSize: 17 }}>
              Xem khoản vay của bạn
            </Typography.Text>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minWidth: '100%',
              padding: 5,
              border: '1px solid #2c4aab',
              borderRadius: 10,
              marginTop: 30,
            }}
            whileTap={{ opacity: 0.3, scale: 0.9 }}
            onClick={
              profile?.kyc?.name
                ? () => history.push('/detail-profile')
                : () => message.info('Bạn chưa xác minh danh tính.')
            }
          >
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
                borderRadius: 20,
                background: '#3d7285',
              }}
            >
              <UserDeleteOutlined style={{ fontSize: 30, color: '#fff' }} />
            </motion.div>
            <Typography.Text style={{ flex: 1, paddingLeft: 20, fontSize: 17 }}>
              Xem thông tin hồ sơ
            </Typography.Text>
          </motion.div>
        </div>
      </Drawer>
    </>
  );
}

const Item = ({ color, icon, text, onClick }) => {
  return (
    <div
      style={{
        minWidth: '49%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '20px 0px',
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
          background: color,
          borderRadius: 20,
        }}
        whileTap={{ opacity: 0.3, scale: 0.9 }}
        onClick={onClick}
      >
        {icon}
      </motion.div>
      <Typography.Text
        style={{ color: '#222', fontWeight: '400', fontSize: 14 }}
      >
        {text}
      </Typography.Text>
    </div>
  );
};
