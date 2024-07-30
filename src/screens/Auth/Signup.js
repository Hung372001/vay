import { useState } from 'react';
import './Login.scss';
import { Image, Typography, Input, Button, message, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import isCorrectNumberPhone from '../../utils/isCorrectNumberPhone';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from '../../redux/constants';
import { motion } from 'framer-motion';
import logo from '../../assets/logo-AP-01.png';
import _buildings from '../../assets/4960785573497384318.jpg';
import DieuKhoan from '../../components/DieuKhoan';

import './Login.scss';
export default () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({
    phone: '',
    password: '',
    repassword: '',
    referCode:'',
    check: false,
  });
  // const toggleCheck = (e) => setState({ check: e.target.checked });
  const [loading, setLoading] = useState(false);
  async function confirmSignup() {
    try {
      if (!state.phone || !state.password || !state.referCode) {
        message.error('Không được để trống thông tin.');
        return;
      }

      if (!isCorrectNumberPhone(state.phone)) {
        message.error('Số điện thoại không đúng định dạng.');
        return;
      }
      if (state.repassword !== state.password) {
        message.error(
          'Mật khẩu không trùng nhau. Hãy xác nhận lại mật khẩu của bạn'
        );
        return;
      }
      if (state.password.length < 6 || state.password.length > 20) {
        message.error('Độ dài mật khẩu phải từ 6 - 20 ký tự.');
        return;
      }
      if (!state.check) {
        message.error('Bạn phải đồng ý với điều khoản và dịch vụ để đăng ký');
        return;
      }

      setLoading(true);
      const { data } = await api.post('/auth/signup', {
        phone: state.phone,
        password: state.password,
        repassword: state.repassword,
        referCode:state.referCode,
        check: true,
      });

      if (data.code !== 201) {
        message.error(data.message)
        history.push('/auth?phone=' + state.phone)
        return
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('role', data.role);
      dispatch({ type: LOGIN_SUCCESS, payload: {} });
      message.success('Tạo tài khoản thành công.');
    } catch (e) {
    } finally {
      setLoading(false);
    }
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
            marginTop: '50px',
            borderRadius: '10px'
          }}
          preview={false}
        />
      </motion.div>
      <div className="form">
        <div className="form-header">
          <Typography.Text className="title">Đăng ký tài khoản</Typography.Text>
        </div>
        <div className="form-body">
          <Input
            className="input"
            autoComplete="off"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            size="large"
            placeholder="Nhập số điện thoại"
          />

          <Input
            className="input"
            autoComplete="off"
            value={state.password}
            type="password"
            onChange={(e) => setState({ ...state, password: e.target.value })}
            size="large"
            placeholder="Mật khẩu"
          />

          <Input
            className="input"
            autoComplete="off"
            size="large"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={state.repassword}
            onChange={(e) => setState({ ...state, repassword: e.target.value })}
          />

          <Input
            className="input"
            autoComplete="off"
            size="large"
            type="text"
            placeholder="Nhập mã mời"
            value={state.referCode}
            onChange={(e) => setState({ ...state, referCode: e.target.value })}
          />
          <div className="check-box">
            <Checkbox
              defaultChecked={false}
              onChange={(e) => {
                setState({ ...state, check: e.target.checked });
              }}
            >
              Đồng ý với
            </Checkbox>{' '}
            <DieuKhoan />
          </div>

          <Button
            className="login-btn"
            onClick={confirmSignup}
            loading={loading}
            size="large"
          >
            <Typography.Text style={{ color: '#fff' }} strong>
              {' '}
              Đăng ký
            </Typography.Text>
          </Button>
          <div style={{}}>
            <br />
            <Typography.Text
              style={{
                padding: '3px 0px',
                color: '#777',
                fontWeight: '400',
                paddingHorizontal: 20,
              }}
            >
              Độ dài mật khẩu từ 6 - 20 ký tự
            </Typography.Text>
            <br />
            <Typography.Text
              style={{
                padding: '3px 0px',
                color: '#777',
                fontWeight: '500',
              }}
            >
              Ví dụ :
            </Typography.Text>
            <br />
            <Typography.Text
              style={{
                padding: '3px 0px',
                color: '#777',
                fontWeight: '400',
                paddingHorizontal: 20,
              }}
            >
              Mật khẩu : 123456
            </Typography.Text>
          </div>

          <div className="form-footer">
            <Typography.Link
              onClick={() => history.push('/auth')}
              style={{ fontSize: 15, color: '#333' }}
            >
              Đã có tài khoản ? Đăng nhập ngay
            </Typography.Link>
          </div>
        </div>
      </div>
    </div>
  );
};
