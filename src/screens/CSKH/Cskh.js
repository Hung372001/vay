import React from 'react';
import './cskh.scss';
import cskh from '../../assets/cskh.png';
import { Image, Typography, Button } from 'antd';
import zalo from '../../assets/zalo.png';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import zlcskh from '../../utils/connectCSKH';
export default function Cskh() {
  const router = useHistory();
  return (
    <div className="container">
      <div className="header">
        <Image src={cskh} preview={false} className="head-img" />
      </div>
      <div className="body">
        <div>
          <Typography.Text className="body-title">Xin chào</Typography.Text>
          <br />
          <Typography.Text className="body-title">
            Liên hệ với chúng tôi
          </Typography.Text>
          <motion.div
            className="zalo-container"
            whileTap={{ scale: 0.95, x: -10 }}
            // onClick={zlcskh()}
          >
            <Image preview={false} src={zalo} className="zalo" />
          </motion.div>
        </div>
      </div>
      <div className="footer">
        <Button onClick={() => router.goBack()} className="back-btn">
          Quay lại
        </Button>
      </div>
    </div>
  );
}
