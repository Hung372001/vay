import React, { useState, useEffect } from 'react';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import Overview from './Overview';
import One from './One';
import Two from './Two';
import Three from './Three';
import api from '../../api';
import Success from './Success';
import { useDispatch } from 'react-redux';
import './verify.scss';
export default function Verify() {
  const router = useHistory();
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1);

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  async function onConfirm(e) {
    setLoading(true);
    await api.post('/users/verify', {
      ...state,
      ...e,
    });
    await api.put('/users/profile/avatar', { url: state.id_with_face });
    dispatch({ type: 'UPDATE_KYC', payload: { ...state, ...e } });
    setLoading(false);
    setStep(4);
  }

  async function updateInitRoute(initRoute) {
    await api.post('/users/init', { initRoute });
  }
  useEffect(() => {
    if (step == 1) {
      updateInitRoute('/verify');
    }
    if (step == 4) {
      updateInitRoute('/vay');
    }
  }, [step]);
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header-container">
        <LeftOutlined className="arrow-icon" onClick={() => router.goBack()} />{' '}
        <Typography.Text className="header-title">Xác minh</Typography.Text>
        <div></div>
      </div>
      {loading ? (
        <div className="loading">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} />} />
          <Typography.Text>Đang tiến hành xét duyệt</Typography.Text>
        </div>
      ) : (
        <>
          {step == 0 && (
            <Overview
              onOk={(e) => {
                setStep(1);
              }}
            />
          )}
          {step == 1 && (
            <One
              onOk={(e) => {
                setStep(2);
                setState({
                  ...state,
                  id_front: e.front,
                  id_back: e.back,
                  id_with_face: e.face,
                });
              }}
            />
          )}
          {step == 2 && (
            <Two
              onOk={(e) => {
                setStep(3);
                setState({ ...state, ...e });
              }}
            />
          )}
          {step == 3 && <Three onOk={onConfirm} />}
          {step == 4 && <Success />}
        </>
      )}
    </motion.div>
  );
}
