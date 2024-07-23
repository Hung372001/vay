import React from 'react';
import { motion } from 'framer-motion';
import { Input, Typography, Select, Form, Button, message } from 'antd';
import {
  PicRightOutlined,
  IdcardOutlined,
  DownCircleOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import InputMask from 'react-input-mask';
import api from '../../api';
import './verify.scss';
export default function Two({ onOk }) {
  const onFinish = async (values) => {
    if (parseInt(values['dob'].split('/')[2]) > 2004) {
      message.error('Độ tuổi phải trên 18.');
      return;
    }
    const { data } = await api.get(`/users/checkId?id=${values.id_number}`);
    if (data.data) {
      message.error('Chứng minh thư đã được sử dụng để thực hiện khoản vay.');
      return;
    }
    localStorage.setItem('step2', JSON.stringify({ ...values }));
    onOk({ ...values });
  };
  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="personal-information-container"
    >
      <Typography.Text strong style={{ fontSize: 18, padding: 10 }}>
        Thông tin cá nhân
      </Typography.Text>
      <Form
        autoComplete="off"
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
        initialValues={
          localStorage.getItem('step2')
            ? { ...JSON.parse(localStorage.getItem('step2')) }
            : {}
        }
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên của bạn',
            },
          ]}
          name="name"
        >
          <Input
            size="large"
            placeholder="Họ tên "
            suffix={<IdcardOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập số CMND/CCCD',
            },
          ]}
          name="id_number"
        >
          <Input
            type="number"
            size="large"
            placeholder="Số CMND/CCCD"
            suffix={<PicRightOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn giới tính',
            },
          ]}
          name="sex"
        >
          <Select
            size="large"
            placeholder="Giới tính"
            style={{
              borderRadius: 5,
              minWidth: '100%',
              fontSize: 16,
            }}
          >
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
            <Select.Option value="Khác">Khác</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập ngày sinh của bạn',
            },
          ]}
          name="dob"
        >
          <InputMask
            mask="99/99/9999"
            maskPlaceholder="dd/mm/yyyy"
            placeholder="Sinh nhật : ngày/tháng/năm"
            className="mask-focus mask-input-date"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập công việc hiện tại ',
            },
          ]}
          name="job"
        >
          <Input
            size="large"
            placeholder="Nghề nghiệp"
            suffix={<ScheduleOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập thu nhập của bạn',
            },
          ]}
          name="income"
        >
          <Select
            size="large"
            placeholder="Chọn thu nhập của bạn"
            style={{
              borderRadius: 5,
              minWidth: '100%',
              fontSize: 16,
            }}
          >
            <Select.Option value="Dưới 5 triệu">Dưới 5 triệu</Select.Option>
            <Select.Option value="Từ 5 - 10 triệu">
              Từ 5 - 10 triệu
            </Select.Option>
            <Select.Option value="Từ 10 - 20 triệu">
              Từ 10 - 20 triệu
            </Select.Option>
            <Select.Option value="Trên 20 triệu">Trên 20 triệu</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập Mục đích vay của bạn',
            },
          ]}
          name="purpose"
        >
          <Input
            size="large"
            placeholder="Mục đích vay"
            suffix={<PicRightOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập vào địa chỉ cá nhân',
            },
          ]}
          name="address"
        >
          <Input
            size="large"
            placeholder="Địa chỉ"
            suffix={<DownCircleOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập số điện thoại người thân',
            },
          ]}
          name="relative_number"
        >
          <Input
            size="large"
            placeholder="SĐT người thân"
            suffix={<DownCircleOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Nhập Mối quan hệ với người thân',
            },
          ]}
          name="relative"
        >
          <Input
            size="large"
            placeholder="Mối quan hệ với người thân"
            suffix={<DownCircleOutlined className="information-icon" />}
            style={{
              borderRadius: 5,
              padding: 5,
              fontSize: 18,
            }}
          />
        </Form.Item>

        <motion.div
          whileTap={{ opacity: 0.4, scale: 0.97 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button className="confirm-btn" htmlType="submit">
            <Typography.Text className="btn-title">Tiếp tục</Typography.Text>
          </Button>
        </motion.div>
      </Form>
    </motion.div>
  );
}
