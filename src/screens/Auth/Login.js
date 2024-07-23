import { useState } from 'react';
import './Login.scss';
import { Image, Typography, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authActions from '../../redux/actions/auth';
// import logo from '../../assets/logo-khong-nen.png';
import logo from '../../assets/logo-AP-01.png';
import _buildings from '../../assets/4960785573497384318.jpg';
import { motion } from 'framer-motion';
export default () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    phone: params.get('phone') || '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  async function confirmLogin() {
    if (!state.phone || !state.password) {
      message.error('Không được để trống thông tin.');
      return;
    }
    dispatch(authActions.Login(state));
  }

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: ` linear-gradient(to bottom, rgba(255,255,255,0.7) 0%,rgba(255,255,255,1) 100%), url('${_buildings}')`,

        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <motion.div
        className="empty-div"
        initial={{
          opacity: 0.4,
          scale: 0.35,
        }}
        transition={{ duration: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Image
          src={logo}
          width={'30%'}
          style={{
            marginBottom: '50px',
            marginTop: '80px',
            borderRadius: '10px'
          }}
          preview={false}
        />
      </motion.div>
      <div className="form">
        <div className="form-header">
          <Typography.Text style={{ color: '#333', fontSize: 20 }} strong>
            Đăng nhập
          </Typography.Text>
        </div>
        <div className="form-body">
          <Input
            className="input"
            size="large"
            autoFocus={true}
            placeholder="Nhập số điện thoại"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />

          <Input
            className="input"
            size="large"
            placeholder="Nhập mật khẩu"
            type="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />

          <Button
            className="login-btn"
            onClick={confirmLogin}
            loading={loading}
            size="large"
          >
            <Typography.Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Đăng nhập
            </Typography.Text>
          </Button>
          <div
            className="form-footer"
            onClick={() => history.push('/auth/signup')}
          >
            <Typography.Link style={{ fontSize: 15, color: '#333' }}>
              Chưa có tài khoản ? Đăng ký tài khoản mới{' '}
            </Typography.Link>
          </div>
        </div>
      </div>
    </div>
  );
};
