import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Typography, Divider } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import api from '../../api';
import * as actions from '../../redux/actions/auth';

export default function DetailProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showBankAccount, setShowBankAccount] = useState(false)
  const { profile } = useSelector((state) => state._auth);
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await api.get('/users/profile');
      dispatch(actions.initialLogin(data.data));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
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
          onClick={() => history.replace('/me')}
          style={{ padding: 0 }}
        >
          <LeftOutlined style={{ fontSize: 25, color: '#555' }} />
        </motion.div>
        <Typography.Text strong style={{ fontWeight: 700, fontSize: 20 }}>
          Thông tin cá nhân
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
        <Avatar src={profile?.avatar} size={100} />
        <Typography.Text style={{ fontSize: 17, fontWeight: 700 }}>
          {profile?.phone}
        </Typography.Text>
        <Divider orientation="left">Thông tin </Divider>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Họ tên :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.name}{' '}
            </Typography.Text>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Địa chỉ :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.address}{' '}
            </Typography.Text>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Số CMND/CCCD :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.id_number}{' '}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Giới tính :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.sex}{' '}
            </Typography.Text>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Ngày sinh :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.dob}{' '}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Nghề nghiệp :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.job}{' '}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Thu nhập :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.income}{' '}
            </Typography.Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '5px 0px',
            }}
          >
            <Typography.Text
              style={{
                paddingRight: 10,

                fontSize: 14,
                fontWeight: 500,
                flex: 2,
              }}
            >
              Mục đích khoản vay :{' '}
            </Typography.Text>
            <Typography.Text
              style={{
                flex: 2,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {profile?.kyc?.purpose}{' '}
            </Typography.Text>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0px',
          }}
        >
          <Typography.Text
            style={{
              paddingRight: 10,

              fontSize: 14,
              fontWeight: 500,
              flex: 2,
            }}
          >
          </Typography.Text>
          <Typography.Text
            style={{
              flex: 2,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
          </Typography.Text>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0px',
          }}
        >
          <Typography.Text
            style={{
              paddingRight: 10,

              fontSize: 14,
              fontWeight: 500,
              flex: 2,
            }}
          >
          </Typography.Text>
          <Typography.Text
            style={{
              flex: 2,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
          </Typography.Text>
        </div>

        <Divider orientation="left">Tài khoản ngân hàng</Divider>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0px',
          }}
        >
          <Typography.Text
            style={{
              paddingRight: 10,

              fontSize: 14,
              fontWeight: 500,
              flex: 2,
            }}
          >
            Tên ngân hàng :{' '}
          </Typography.Text>
          <Typography.Text
            style={{
              flex: 2,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {profile?.kyc?.bank.bankName}{' '}
          </Typography.Text>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0px',
          }}
        >
          <Typography.Text
            style={{
              paddingRight: 10,

              fontSize: 14,
              fontWeight: 500,
              flex: 2,
            }}
          >
            Số TK ngân hàng :{'  '}
          </Typography.Text>
          <Typography.Text
            style={{
              flex: 2,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {showBankAccount ? profile?.kyc?.bank.number : '**********'}{' '}
          </Typography.Text>
          <span style={{}}>
            {showBankAccount ? (
              <EyeOutlined
                onClick={() => setShowBankAccount((prev) => !prev)}
                className="eye-icon"
              />
            ) : (
              <EyeInvisibleOutlined
                onClick={() => setShowBankAccount((prev) => !prev)}
                className="eye-icon"
              />
            )}
          </span>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0px',
          }}
        >
          <Typography.Text
            style={{
              paddingRight: 10,

              fontSize: 14,
              fontWeight: 500,
              flex: 2,
            }}
          >
            Tên thụ hưởng :{' '}
          </Typography.Text>
          <Typography.Text
            style={{
              flex: 2,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {profile?.kyc?.bank.name}{' '}
          </Typography.Text>
        </div>
      </div>
    </motion.div>
  );
}
