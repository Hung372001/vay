import { Button, Image, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import checked from '../../assets/checked.png';
import './withdraw.scss';
export default function Success({
  money,
  visible,
  onCancel,
  onClose,
  onClickBtn,
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
              <Image preview={false} src={checked} className="check-img pop" />
            </div>
          </div>
        </div>
        <div className="success-text-container">
          <Typography.Text className="success-text">
            Rút tiền thành công! <br /> {money}
          </Typography.Text>
        </div>
        <div className="box-container">
          <div className="information-box">
            <Typography.Text className="box-text">
              Tài khoản nhận tiền:
            </Typography.Text>
            <Typography.Text className="box-text">
              Tên người nhận:
            </Typography.Text>
            <Typography.Text className="box-text">Số tiền:</Typography.Text>
            <Typography.Text className="box-text"> Số dư ví:</Typography.Text>
          </div>
        </div>
        <div className="trans-btn-container">
          <div>
            <Button onClick={onClickBtn} className="trans-btn">
              Thực hiện giao dịch khác
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
