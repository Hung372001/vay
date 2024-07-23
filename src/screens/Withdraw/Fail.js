import { Button, Image, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import denied from '../../assets/denied.png';

import './withdraw.scss';
export default function Fail({
  visible,
  onClickContact,
  onClickCancel,
  onClose,
}) {
  return (
    <>
      <Modal
        onCancel={onClose}
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={null}
      >
        <div className="head-img-container">
          <div>
            <div>
              <Image preview={false} src={denied} className="fail-img pop" />
            </div>
          </div>
        </div>
        <div className="success-text-container">
          <Typography.Text className="success-text">
            Rút tiền không thành công!
          </Typography.Text>
        </div>

        <div className="fail-btn-container">
          <Button onClick={onClickContact} className="contact-btn">
            Liên hệ CSKH
          </Button>

          <Button onClick={onClickCancel} className="deny-btn">
            Huỷ
          </Button>
        </div>
      </Modal>
    </>
  );
}
