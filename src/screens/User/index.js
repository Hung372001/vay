import React from 'react';
import { Typography, Avatar, message, Image, Button } from 'antd';
import {
  ExclamationCircleOutlined,
  AlertFilled,
  UserOutlined,
  LogoutOutlined,
  CustomerServiceFilled,
  CheckOutlined,
  DollarCircleOutlined, SolutionOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import * as actions from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import connectCSKH from '../../utils/connectCSKH';
import tickAsset from '../../assets/tick.png';
import './User.scss';
export default function User() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state._auth);
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="header">
        <Typography.Text className="header-text">Hồ sơ</Typography.Text>
      </div>
      <div className="avatar">
        <Avatar
          size={120}
          src={profile?.kyc?.id_with_face || profile?.avatar}
        />
        <Typography.Text strong style={{ fontSize: 23, color: '#121212' }}>
          {profile?.kyc?.name}
        </Typography.Text>
        <Typography.Text
          style={{ fontSize: 18, color: '#666', fontWeight: 500 }}
        >
          {profile?.phone}
        </Typography.Text>
      </div>
      {!profile?.kyc?.name && <AlertVerify />}
      <div style={{ padding: 20 }}>
        <Tab
          title="Thông tin ngân hàng trả nợ"
          icon={
            <SolutionOutlined
              style={{ color: '#fff', fontSize: 25, marginRight: 20 }}
            />
          }
          onClick={() => {
            history.push('/info-contract');
          }}
        />
        <Tab
          title="Hợp đồng vay"
          icon={
            <DollarCircleOutlined
              style={{ color: '#fff', fontSize: 25, marginRight: 20 }}
            />
          }
          onClick={() => {
            history.push('/my-contract');
          }}
        />
        <Tab
          title="Thông tin cá nhân"
          icon={
            <UserOutlined
              style={{ color: '#fff', fontSize: 25, marginRight: 20 }}
            />
          }
          onClick={
            profile?.kyc?.name
              ? () => history.push('/detail-profile')
              : () => message.info('Bạn chưa xác minh danh tính.')
          }
        />
        <Tab
          title="Liên hệ tư vấn - hỗ trợ"
          icon={
            <CustomerServiceFilled
              style={{ color: '#fff', fontSize: 25, marginRight: 20 }}
            />
          }
          onClick={connectCSKH}
        />
        <motion.div
          whileTap={{ scale: 0.95, opacity: 0.4 }}
          className="log-out"
        >
          <Button
            className="log-out-btn"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            icon={<LogoutOutlined style={{ fontSize: 25, color: '#fff' }} />}
            onClick={() => dispatch(actions.Logout())}
          >
            Đăng xuất
          </Button>
        </motion.div>
      </div>

      <div
        style={{
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Image src={tickAsset} preview={false} style={{ maxWidth: 100 }} />
        <Typography.Text
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#555',
            textAlign: 'center',
          }}
        >
          &reg; Bản quyền thuộc về công ty cổ phần Dịch vụ Tài chính
          <br /> VietCredit
        </Typography.Text>
      </div>
    </motion.div>
  );
}

const Tab = ({ title, onClick, icon }) => {
  return (
    <motion.div
      whileTap={{
        scale: 0.96,
        opacity: 0.3,
        border: '1px solid rgba(0, 106, 176,0.3)',
      }}
      onClick={onClick}
      className="tab"
    >
      {icon}
      <Typography.Text className="tab-text" style={{ color: '#fff' }}>
        {title}
      </Typography.Text>
    </motion.div>
  );
};
const AlertVerify = ({ status }) => {
  const history = useHistory();

  return (
    <div className="alert-container">
      <div>
        <Typography.Text strong style={{ fontSize: 17, color: '#121212' }}>
          Xác thực tài khoản
        </Typography.Text>
        <div
          style={{
            borderBottom: '1px solid rgba(0, 106, 176,0.3)',
            height: 0.1,
            width: '100%',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '30px 10px',
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AlertFilled style={{ fontSize: 45, color: '#242ba6' }} />
          </div>
          <div>
            <Typography.Text
              style={{ fontSize: 16, fontWeight: 400, color: '#121212' }}
            >
            Bổ sung CMND/CCCD và chân dung để hoàn tất định danh
            </Typography.Text>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0px 10px',
          }}
        >
          <motion.div
            whileTap={{ scale: 0.9, opacity: 0.3 }}
            onClick={() => history.push('/verify')}
          >
            <Typography.Text
              strong
              style={{
                textAlign: 'right',
                fontWeight: '700',
                color: '#0022ba',
                fontSize: 17,
              }}
            >
              Xác thực ngay
            </Typography.Text>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const IsVerify = ({ status }) => {
  return (
    <div
      className="verify"
      style={{
        background: status ? '#28ba00' : 'rgba(0,0,0,0.1)',
      }}
    >
      {status ? (
        <>
          <CheckOutlined
            style={{
              color: '#87d489',
              fontSize: 20,
            }}
          />
          <Typography.Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: '#fff',
              fontWeight: 500,
            }}
          >
            Đã xác minh
          </Typography.Text>
        </>
      ) : (
        <>
          <ExclamationCircleOutlined
            style={{
              color: '#666',
              fontSize: 20,
            }}
          />
          <Typography.Text style={{ flex: 1, textAlign: 'center' }}>
            Chưa xác minh
          </Typography.Text>
        </>
      )}
    </div>
  );
};
