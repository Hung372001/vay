import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LeftOutlined } from '@ant-design/icons';
import {
  Typography,
  Input,
  Table,
  Modal,
  Popconfirm,
  message,
  InputNumber,
  Select,
  Button,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import connectCSKH from '../../utils/connectCSKH';
import './Vay.scss';
import { months } from 'moment';
// import CurrencyInput from 'react-currency-input-field';

const { Option } = Select;

const listLoan = [
  {
    id: 1,
    title : '40 Triệu ~ 50 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  },
  {
    id: 2,
    title : '60 Triệu ~ 80 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  },
  {
    id: 3,
    title : '100 Triệu ~ 200 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  },
  {
    id: 4,
    title : '200 Triệu ~ 300 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  }
]

export default function Vay() {
  const [verify, setVerify] = useState('confirm');
  const monthData = [12 ,24, 36, 48, 60];

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state._auth);
  const [amount, setAmount] = useState(null);
  const [month, setMonth] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [notModal, setNotModal] = useState(false);
  const interestRate = Math.round(amount * 0.008 * month);
  const payback = amount + interestRate;
  const onConfirm = async () => {
    const { data } = await api.get('/contracts');
    if (data.data.length > 0) {
      // if (data.data?.find(d=>d.status=='pending')) {
      setNotModal(true);
      return;
    }
    if (isNaN(amount) || amount < 20000000 || amount > 500000000) {
      message.error(`Hạn mức vay trong khoảng 20tr đến 500tr đồng.`);
      return;
    }
    dispatch({
      type: 'DISPATCH_CONTRACT',
      payload: { contract: { times: month, amount } },
    });
    if (profile?.kyc?.name) history.replace('/contracts');
    else history.replace('/verify');
  };

  const loanActive = listLoan.find(item => item.id === localStorage.getItem('loanActive'));
  return (
    <div className="container">
      <div className="head" />
      <div className="vay-header" style={{ background: '#ff0021' }}>
        <motion.div
          whileTap={{ scale: 0.95, x: -10 }}
          onClick={() => history.replace('/')}
        >
          <LeftOutlined className="arrow-icon" style={{ color: '#fff' }} />
        </motion.div>
        <Typography.Text className="header-text" style={{ color: '#fff' }}>
          Chọn khoản vay
        </Typography.Text>
        <div />
      </div>

      <div className="vay-body">
        <div className="title-container">
          <Typography.Text className="title" style={{ color: '#fff' }}>
            Số tiền vay
          </Typography.Text>
        </div>
        <div className="input-container">
          <Input
            className="input-field"
            placeholder="Nhập số tiền cần vay"
            style={{ minWidth: '100%' }}
            min={30000000}
            max={500000000}
            onChange={(value) => setAmount(parseInt(value.target.value))}
          />
          {/* <Input
            value={amount}
            className=""
            min={0}
            max={1000000000}
            placeholder="Nhập số tiền bạn cần vay"
            onChange={(e) => setAmount(parseInt(e.target.value))}
          /> */}
        </div>
        <div className="subtitle">
          <Typography.Text>Từ 20.000.000đ</Typography.Text>
          <Typography.Text>Đến 500.000.000đ</Typography.Text>
        </div>
        <div className="month-container" style={{ padding: 10 }}>
          <Typography.Text>Chọn thời hạn vay</Typography.Text>
          <Select
            onChange={(value) => setMonth(value)}
            value={month}
            style={{ borderRadius: 100, minWidth: 150 }}
          >
            {monthData.map((value) => (
              <Select.Option key={value} value={value} className="month-picker">
                {value} tháng
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="form-container">
        <div className="information-form">
          <Typography.Text
            className="form-title"
            style={{ color: '#fff', fontWeight: 'bold' }}
          >
            Thông tin khoản vay
          </Typography.Text>
          <div className="information">
            <div className="details-information">
              <Typography.Text>Số tiền</Typography.Text>
              <Typography.Text>{amount?.toLocaleString()} đ</Typography.Text>
            </div>
            <div className="details-information">
              <Typography.Text>Thời hạn vay</Typography.Text>
              <Typography.Text>{month} tháng</Typography.Text>
            </div>
            <div className="details-information">
              <Typography.Text>Ngày vay</Typography.Text>
              <Typography.Text>{date}</Typography.Text>
            </div>
            <div className="details-information">
              <Typography.Text>Hình thức thanh toán</Typography.Text>
              <Typography.Text>Trả góp mỗi tháng</Typography.Text>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="old-debt-text">
          <Typography.Text style={{ flex: 2, color: '#666', fontSize: 14 }}>
            Trả nợ kì đầu
          </Typography.Text>
          <Typography.Text style={{ flex: 2, color: '#3e3e3e', fontSize: 16 }}>
            {Math.round(amount / month + amount * 0.01).toLocaleString()} VND
          </Typography.Text>
        </div>
        <div className="old-debt-text">
          <Typography.Text style={{ flex: 2, color: '#666', fontSize: 14 }}>
            Lãi suất hàng tháng
          </Typography.Text>
          <Typography.Text style={{ flex: 2, color: '#3e3e3e', fontSize: 16 }}>
            0.8%
          </Typography.Text>
        </div>
        <div className="old-debt-text">
          <Typography.Link onClick={() => setShowDetail(true)}>
            Chi tiết trả nợ
          </Typography.Link>
        </div>
      </div>
      <div className="btn-container">
        <Popconfirm
          title={`Đồng ý vay ${amount?.toLocaleString() || 0
            } VND kì hạn ${month} tháng ?`}
          onConfirm={onConfirm}
        >
          <Button className="confirm-btn">
            <Typography.Text className="btn-title">
              Xác nhận khoản vay
            </Typography.Text>
          </Button>
        </Popconfirm>
      </div>

      <ModalDetailPayment
        visible={showDetail}
        onCancel={() => setShowDetail(false)}
        times={month}
        amount={amount}
      />
      <>
        <Modal
          title={null}
          footer={null}
          visible={notModal}
          closable={false}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#002dbf',
            }}
          >
            <Typography.Text style={{ color: '#fff', fontSize: 17 }} strong>
              Thông báo
            </Typography.Text>
          </div>
          <br />
          <Typography.Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Bạn đang có khoản vay chưa hoàn thành
          </Typography.Text>
          <Typography.Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Bạn không thể đăng ký hồ sơ mới
          </Typography.Text>
          <Typography.Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Vui lòng ấn vào liên hệ CSKH để được tư vấn và hỗ trợ
          </Typography.Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 30,
            }}
          >
            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.97 }}
              style={{
                background: '#888',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                padding: '0px 10px',
              }}
              onClick={() => setNotModal(false)}
            >
              <Typography.Text
                style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}
              >
                Đóng
              </Typography.Text>
            </motion.div>

            <motion.div
              whileTap={{ opacity: 0.4, scale: 0.97 }}
              style={{
                background: '#002dbf',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                padding: '0px 10px',
              }}
              onClick={connectCSKH}
            >
              <Typography.Text
                style={{ color: '#fff', fontWeight: 400, fontSize: 14 }}
              >
                Liên hệ CSKH
              </Typography.Text>
            </motion.div>
          </div>
        </Modal>
      </>
    </div>
  );
}
const ModalDetailPayment = ({ visible, onCancel, times, amount }) => {
  const array = [...new Array(times)].map((item, index) => ({
    index: index + 1,
    amount: amount / times + (amount - (index * amount) / times) * 0.008,
    period: `${new Date().getDate()} - ${(new Date().getMonth() + 1 + index + 1) % 12 === 0
      ? 12
      : (new Date().getMonth() + 1 + index + 1) % 12
      }`,
  }));
  const columns = [
    {
      title: 'Kỳ',
      dataIndex: 'index',
      key: 'index',
      render: (text) => <Typography.Text>Kì thứ {text}</Typography.Text>,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => (
        <Typography.Text strong>
          {Math.ceil(text).toLocaleString()}
        </Typography.Text>
      ),
    },
    {
      title: 'Ngày đóng',
      dataIndex: 'period',
      key: 'period',
      render: (text) => <Typography.Text strong>{text}</Typography.Text>,
    },
  ];
  return (
    <Modal
      visible={visible}
      onOk={onCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      closeIcon={() => <></>}
    >
      <div style={{ maxHeight: 350, overflowY: 'scroll' }}>
        <Table dataSource={array} columns={columns} pagination={false} />
      </div>
    </Modal>
  );
};
