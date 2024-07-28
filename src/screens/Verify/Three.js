import React, { useState } from 'react';
import { CreditCard } from '../../components';
import { motion } from 'framer-motion';
import { Input, Select, Typography, Image, message, Button } from 'antd';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import _bank from './bank.json';
import InputMask from 'react-input-mask';
export default function Three({ onOk }) {
  const [state, setState] = useState({
    bankName: '',
    logo: '',
    number: '',
    name: '',
    date: '',
  });
  async function onConfirm() {
    if (!state.bankName || !state.name || !state.number) {
      message.error('Vui lòng cung cấp đầy đủ thông tin yêu cầu');
      return;
    }
    onOk({ bank: state });
  }
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bank-form-container"
    >
      <Typography.Text strong style={{ fontSize: 17, padidng: 10 }}>
        Thông tin ngân hàng thụ hưởng
      </Typography.Text>


      <div style={{ padding: 20 }}>
        <Input
          size="large"
          placeholder="Số tài khoản"
          type="number"
          prefix={<GlobalOutlined className="information-icon" />}
          value={state.number}
          onChange={(e) => setState({ ...state, number: e.target.value })}
          className="bank-input"
        />

        <Input
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
          size="large"
          placeholder="Tên chủ tài khoản"
          prefix={<UserOutlined className="information-icon" />}
          className="bank-input"
        />
        <Select
          className="select-bank"
          placeholder="Chọn ngân hàng thụ hưởng"
          onChange={(e) =>
            setState({
              ...state,
              bankName: e.split('@')[0],
              logo: e.split('@')[1],
            })
          }
        >
          {_bank.banksnapas.map((item) => (
            <Select.Option value={`${item.shortName}@${item.logo}`}>
              <div>
                <Typography.Text strong> {item.shortName}</Typography.Text> -{' '}
                <Typography.Text>{item.vn_name}</Typography.Text>
              </div>
              {item.logo && (
                <Image src={item.logo} preview={false} width="20%" />
              )}
            </Select.Option>
          ))}
        </Select>
        <div className="send-request-div">
          <Button className="confirm-btn" onClick={onConfirm}>
            <Typography.Text className="confirm-div-title">
              Gửi yêu cầu
            </Typography.Text>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
