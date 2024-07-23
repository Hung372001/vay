import React, { useState, useEffect } from 'react';
import api from '../../api';
import useNotification from '../../hooks/useNotification';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Empty } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import './Notification.scss';
export default function Notifications() {
  const history = useHistory();
  const { notifications, setNotifications } = useNotification();
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/notifications');
      setNotifications([...data.data.docs]);
    })();
  }, []);
  return (
    <motion.div
      style={{ padding: '0px 0px' }}
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header-container">
        <motion.div
          whileTap={{ scale: 0.95, x: -10 }}
          onClick={() => history.replace('/')}
          style={{ padding: 0 }}
        >
          <LeftOutlined style={{ fontSize: 25, color: '#fff' }} />
        </motion.div>
        <Typography.Text
          strong
          style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}
        >
          Thông báo
        </Typography.Text>
        <div></div>
      </div>
      <div style={{ padding: 5 }}>
        {notifications.length == 0 && (
          <Empty description="Chưa có thông báo nào." />
        )}
        {notifications.map((item) => (
          <Item
            data={item}
            key={item._id}
            setNotifications={setNotifications}
          />
        ))}
      </div>
    </motion.div>
  );
}

const Item = ({ data, setNotifications }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!data.status)
        (async () => {
          await api.post(`notifications/${data._id}`);
          setNotifications((prev) => [
            ...prev.map((i) => {
              if (i._id == data._id) {
                i['status'] = true;
              }
              return i;
            }),
          ]);
        })();
    }, 700);
    return () => clearTimeout(timeout);
  }, [data]);
  return (
    <motion.div
      className="infor-bar"
      initial={{ opacity: 0.3, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Typography.Text style={{ fontSize: 17, fontWeight: 400 }}>
        {data?.message}
      </Typography.Text>
      <div style={{ minHeight: 60 }}>
        <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
          {data?.description}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text style={{ fontSize: 12, color: '#333' }}>
          {moment(data?.createdAt).format('HH:mm, DD/MM/YYYY')}
        </Typography.Text>
      </div>
    </motion.div>
  );
};
