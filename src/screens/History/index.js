import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api/';
import moment from 'moment';
import { Typography, Empty, Spin } from 'antd';
import { motion } from 'framer-motion';
import {
  LeftOutlined,
  LoadingOutlined,
  CheckOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
import './history.scss';
export default function () {
  const history = useHistory();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await api.get('/payments');
      setRequests([...data.data]);
      setLoading(false);
    })();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="head-container">
        <div
          className="head"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <motion.div whileTap={{ scale: 0.95, x: -10 }}>
            <LeftOutlined
              className="left-icon"
              onClick={() => history.replace('/wallet')}
            />
          </motion.div>
          <Typography.Text strong style={{ color: '#fff', fontSize: 17 }}>
            Lịch sử giao dịch
          </Typography.Text>
          <div />
        </div>
      </div>
      <div style={{ padding: 10 }}>
        {loading ? (
          <div className="loading">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} />} />
            <Typography.Text>Đang tải dữ liệu...</Typography.Text>
          </div>
        ) : (
          <>
            {requests.length == 0 && <Empty description="Chưa có dữ liệu" />}
            {requests.map((item, index) => (
              <Item item={item} key={index} />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

const Item = ({ item }) => {
  return (
    <div className="item-box" style={{ margin: 5 }}>
      <div>
        <Typography.Text className="item-text">
          {moment(item.created_at).format('hh:mm A DD/MM/YYYY')}
        </Typography.Text>
        <br />
        <Typography.Text className="item-text">
          {item.description}
        </Typography.Text>
        <br />
        <Typography.Text className="item-text">
          {item.status ? '+ ' : '- '}
          {item.amount.toLocaleString()} VND
        </Typography.Text>
      </div>
      <div>
        {item.status ? (
          <CheckOutlined className="check-icon" />
        ) : (
          <ExclamationOutlined className="exclamation-icon" />
        )}
      </div>
    </div>
  );
};
