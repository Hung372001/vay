import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './withdraw.scss';
import Fail from './Fail';
import connectCSKH from '../../utils/connectCSKH';

export default function Withdraw() {
  const [amount, setAmount] = useState({ money: '' });
  const router = useHistory();
  const [showDetail, setShowDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <div>
      <div className="head-container">
        <div className="head">
          <motion.div whileTap={{ scale: 0.95, x: -10 }}>
            <LeftOutlined
              className="left-icon"
              onClick={() => router.goBack()}
            />
          </motion.div>
        </div>
        <div className="head-text-container">
          <Typography.Text strong className="head-text">
            Rút tiền
          </Typography.Text>
        </div>
      </div>
      <div className="body">
        <Typography.Text className="body-text">Số tiền rút</Typography.Text>
        <Input
          placeholder="Nhập số tiền cần rút"
          className="withdraw"
          onChange={(e) => setAmount({ ...amount, money: e.target.value })}
        />
      </div>
      <div className="footer">
        <Button className="confirm-withdraw" onClick={() => setShowModal(true)}>
          Xác nhận
        </Button>
      </div>
      {/* <Success
        visible={showModal}
        // money={amount}
        onClickBtn={closeModal}
           onClose={closeModal}
      /> */}
      <Fail
        onClickContact={connectCSKH}
        visible={showModal}
        onClickCancel={closeModal}
        onClose={closeModal}
      />
    </div>
  );
}
