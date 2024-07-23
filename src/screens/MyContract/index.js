import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Typography, Empty, Divider, Modal, Table, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import moment from 'moment';
import { ContractForm } from '../../components';
import { useSelector } from 'react-redux';
export default function MyContract() {
  const history = useHistory();
  const { profile } = useSelector((state) => state._auth);
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await api.get('/contracts');
      if (data.data.length > 0) setContract(data.data[0]);
      setLoading(false);
    })();
  }, []);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <motion.div
      style={{ padding: '10px 15px' }}
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 5,
          borderBottom: '1px solid #eee',
        }}
      >
        <motion.div
          whileTap={{ scale: 0.95, x: -10 }}
          onClick={() => history.replace('/')}
          style={{ padding: 0 }}
        >
          <LeftOutlined style={{ fontSize: 25, color: '#555' }} />
        </motion.div>
        <Typography.Text strong style={{ fontWeight: 700, fontSize: 20 }}>
          Khoản vay
        </Typography.Text>
        <div></div>
      </div>
      <div
        style={{
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          <div
            style={{
              height: '80vh',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              background: 'rgba(0,0,0,0.07)',
            }}
          >
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} />} />
            <Typography.Text>Đang tải dữ liệu...</Typography.Text>
          </div>
        ) : (
          <>
            {!contract?._id ? (
              <>
                <Empty description="Bạn chưa có khoản vay nào" />
                <motion.div
                  whileTap={{ opacity: 0.4, scale: 0.97 }}
                  style={{
                    background: '#002dbf',
                    width: '70%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 30,
                    padding: 5,
                  }}
                  onClick={() => history.push('/vay')}
                >
                  <Typography.Text
                    style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}
                  >
                    Đăng ký ngay
                  </Typography.Text>
                </motion.div>
              </>
            ) : (
              <>
                <Divider>
                  <Typography.Text style={{ fontSize: 16 }}>
                    Thông tin hợp đồng của bạn
                  </Typography.Text>
                </Divider>
                <div
                  style={{
                    width: '100%',
                    padding: 10,
                    paddingTop: 20,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: 17,
                      }}
                    >
                      Mã hợp đồng :
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        fontSize: 17,
                        fontWeight: 500,
                      }}
                    >
                      {contract.slug}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: 17,
                      }}
                    >
                      Số tiền vay :
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        fontSize: 17,
                        fontWeight: 700,
                      }}
                    >
                      {contract.amount.toLocaleString()} VND
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: 17,
                      }}
                    >
                      Hạn thanh toán :
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        fontSize: 17,
                        fontWeight: 500,
                      }}
                    >
                      {contract.times} tháng
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: 17,
                      }}
                    >
                      Khởi tạo lúc :
                    </Typography.Text>
                    <Typography.Text
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        fontSize: 17,
                        fontWeight: 500,
                      }}
                    >
                      {moment(contract.created_at).format('HH:mm, DD/MM/YYYY')}
                    </Typography.Text>
                  </div>
                  <Typography.Link strong onClick={() => setShowDetail(true)}>
                    Chi tiết trả nợ
                  </Typography.Link>
                </div>
                <ModalDetailPayment
                  visible={showDetail}
                  onCancel={() => setShowDetail(false)}
                  times={contract.times}
                  amount={contract.amount}
                />
                <ContractForm profile={profile} data={contract} />
              </>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
const ModalDetailPayment = ({ visible, onCancel, times, amount }) => {
  const array = [...new Array(times)].map((item, index) => ({
    index: index + 1,
    amount: amount / times + (amount - (index * amount) / times) * 0.01,
    period: `${new Date().getDate()} - ${
      (new Date().getMonth() + 1 + index + 1) % 12 === 0
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
      title={'Chi tiết trả nợ'}
    >
      <div style={{ maxHeight: 350, overflowY: 'scroll' }}>
        <Table dataSource={array} columns={columns} pagination={false} />
      </div>
    </Modal>
  );
};
