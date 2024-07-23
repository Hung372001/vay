import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Typography,
  Image,
  Spin,
  Progress,
  Checkbox,
  Button,
  message,
} from 'antd';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ContractForm } from '../../components';
import converter from '../../utils/converterBase64ToBinary';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import api from '../../api';
import _img from '../../assets/success.jpg';
import connectCSKH from '../../utils/connectCSKH';
import useNotification from '../../hooks/useNotification';
import { BASE_URL } from '../../utils/constant'
import './Contract.scss';
export default function Contract() {
  const { pushNotifications } = useNotification();
  const history = useHistory();
  const padRef = useRef();

  const { currentContract, profile } = useSelector((state) => state._auth);
  const [signature, setSignature] = useState(null);
  const [signing, setSigning] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const confirmSignature = () => {
    setSignature(padRef.current.toDataURL());
    setSigning(false);
  };

  const createContract = async () => {
    if (!checked) {
      message.error('Đồng ý với hợp đồng để tiếp tục');
      return;
    }
    setLoading(true);
    let formData = new FormData();
    const dataURI = converter(signature);
    formData.append('file', dataURI);
    setLoading(true);
    const { data } = await axios.post(
      BASE_URL + '/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    await api.post('/contracts', {
      signature_capture: data.secure_url,
      times: currentContract.times || 6,
      amount: currentContract.amount || 30000000,
    });
    await api.post('/users/init', { initRoute: '/' });

    pushNotifications({
      message: `${profile.phone} tạo hợp đồng vay`,
      description: `Hợp đồng ${currentContract?.times
        } tháng, ${currentContract?.amount.toLocaleString()} VNĐ`,
    });
    setLoading(false);
    setSuccess(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header-content">
        <motion.div
          whileTap={{ scale: 0.95, x: -10 }}
          onClick={() => history.replace('/')}
          style={{ padding: 0 }}
        >
          <LeftOutlined className="left-icon" />
        </motion.div>
        <Typography.Text
          strong
          style={{ fontWeight: 700, fontSize: 20, color: 'white' }}
        >
          Xác nhận vay
        </Typography.Text>
        <div></div>
      </div>
      {success ? (
        <>
          <motion.div
            initial={{ opacity: 0.3, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="success-contract"
          >
            <Image src={_img} preview={false} />
            <Progress type="circle" percent={100} size="small" />
            <Typography.Text className="success-contract-title">
              Chúc mừng
            </Typography.Text>
            <Typography.Text className="success-contract-title">
              Hợp đồng vay của bạn đã được đăng ký thành công.
            </Typography.Text>
            <div className="contact-container">
              <Typography.Text strong className="contact-text">
                &rarr;
              </Typography.Text>
              <motion.div
                whileTap={{ opacity: 0.4, scale: 0.97 }}
                className="contact"
                onClick={connectCSKH}
              >
                <Typography.Text className="contact-title">
                  Liên hệ CSKH để duyệt hồ sơ
                </Typography.Text>
              </motion.div>
              <Typography.Text strong className="contact-text">
                &larr;
              </Typography.Text>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {loading ? (
            <div className="loading">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} />} />
              <Typography.Text>Đang xử lý...</Typography.Text>
            </div>
          ) : (
            <>
              <div className="checking-container">
                <Typography.Text
                  style={{ fontSize: 15, textAlign: 'center' }}
                  strong
                >
                  Xác nhận khoản vay
                </Typography.Text>
                <br />
                <br />
                <Typography.Text style={{ fontSize: 17 }}>
                  Khoản tiền vay :{' '}
                  <Typography.Text strong>
                    {currentContract.amount.toLocaleString()}
                  </Typography.Text>
                  VND
                </Typography.Text>
                <Typography.Text style={{ fontSize: 17 }}>
                  Thời hạn thanh toán :{' '}
                  <Typography.Text strong>
                    {currentContract.times} tháng
                  </Typography.Text>
                </Typography.Text>

                <ContractForm data={currentContract} />

                <div className="check-box">
                  <Checkbox
                    defaultChecked={false}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                    }}
                  >
                    Xác nhận đồng ý với hợp đồng
                  </Checkbox>
                </div>
                {signing && (
                  <>
                    <Typography.Text>Kí vào khung bên dưới </Typography.Text>
                    <div className="signing">
                      <SignatureCanvas
                        ref={padRef}
                        penColor="#666"
                        canvasProps={{
                          width: window.innerWidth - 20 || 300,
                          height: 200,
                          className: 'sigCanvas',
                        }}
                      />
                    </div>

                    <div className="refresh">
                      <Typography.Text
                        onClick={() => padRef.current.clear()}
                        style={{ textDecoration: 'underline' }}
                      >
                        Làm mới{' '}
                      </Typography.Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        style={{ background: '#ff0021' }}
                        onClick={confirmSignature}
                      >
                        <Typography.Text style={{ color: '#fff' }}>
                          Xác nhận chữ ký
                        </Typography.Text>
                      </Button>
                    </div>
                  </>
                )}
                {!signing && (
                  <>
                    <Image src={signature} preview={false} />
                    <div className="create-contract-container">
                      <motion.div
                        whileTap={{ opacity: 0.4, scale: 0.97 }}
                        className="create-contract"
                        onClick={createContract}
                      >
                        <Typography.Text className="create-contract-title">
                          Xác nhận
                        </Typography.Text>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </motion.div>
  );
}
