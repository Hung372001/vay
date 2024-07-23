import React, { useState, useRef } from 'react';
import { Image, Typography, Spin, message } from 'antd';
import axios from 'axios';
import { CameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import Compress from 'react-image-file-resizer';
import converter from '../../utils/converterBase64ToBinary';
import './verify.scss';
import { BASE_URL } from '../../utils/constant';
const Camera = ({ type, onDispatch }) => {
  const [chooseImage, setChooseImage] = useState(localStorage.getItem(type));
  const [loading, setLoading] = useState(false);
  if (chooseImage) {
    onDispatch(chooseImage);
  }
  function onChange(event) {
    if (event.target && event.target.files[0]) {
      Compress.imageFileResizer(
        event.target.files[0],
        480,
        480,
        'PNG', // compress format WEBP, JPEG, PNG
        100,
        0, // rotation
        async (uri) => {
          try {
            let formData = new FormData();
            const dataURI = converter(uri);
            formData.append('file', dataURI);
            setLoading(true);
            const { data } = await axios.post(
              BASE_URL + '/upload',
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'access_token'
                  )}`,
                },
              }
            );

            // const transformater = 'w_300,h_400,c_fit';
            // const splited = data.secure_url.split('/');
            // let str = [
            //   ...splited.slice(0, 6),
            //   transformater,
            //   ...splited.slice(6),
            // ];

            const endpoint = data.secure_url
            localStorage.setItem(type, endpoint);
            setChooseImage(endpoint);
            onDispatch(endpoint);
          } catch (err) {
            message.error('Đã có lỗi trong việc upload ảnh. Vui lòng thử lại');
          } finally {
            setLoading(false);
          }
        },
        'base64' // blob or base64 default base64
      );
    }
  }

  return (
    <motion.div
      className="image-container"
      style={{
        backgroundImage: `url(${chooseImage})`,
      }}
      whileTap={{ scale: 0.98, opacity: 0.3 }}
      onClick={() => document.getElementById(`camera${type}`).click()}
    >
      {loading ? (
        <Spin spinning />
      ) : (
        <>
          {!chooseImage && (
            <CameraOutlined
              style={{ fontSize: 30, color: chooseImage ? '#fff' : '#333' }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            id={`camera${type}`}
            hidden
          />

          {type == 'front' && !chooseImage && (
            <Typography.Text
              style={{
                color: chooseImage ? '#fff' : '#333',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Mặt trước CMND / CCCD
            </Typography.Text>
          )}
          {type == 'back' && !chooseImage && (
            <Typography.Text
              style={{
                color: chooseImage ? '#fff' : '#333',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Mặt sau CMND / CCCD
            </Typography.Text>
          )}
          {type == 'face' && !chooseImage && (
            <Typography.Text
              style={{
                color: chooseImage ? '#fff' : '#333',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Ảnh chân dung
            </Typography.Text>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ({ onOk }) => {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [face, setFace] = useState(null);
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="user-img-container"
    >
      <Typography.Text strong style={{ fontSize: 18, padding: 5 }}>
        Chụp ảnh định danh KYC
      </Typography.Text>
      <Camera type="front" onDispatch={(e) => setFront(e)} />
      <Camera type="back" onDispatch={(e) => setBack(e)} />
      <Camera type="face" onDispatch={(e) => setFace(e)} />
      <motion.div
        whileTap={{ opacity: 0.4, scale: 0.97 }}
        className="confirm-div"
        onClick={() => {
          if (front && back && face) onOk({ front, back, face });
          else message.error('Vui lòng cung cấp đủ thông tin');
        }}
      >
        <Typography.Text
          style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}
        >
          Tiếp tục
        </Typography.Text>
      </motion.div>
    </motion.div>
  );
};
