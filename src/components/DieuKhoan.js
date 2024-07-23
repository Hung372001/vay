import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import moment from 'moment';

export default function App({ data, profile }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Typography.Link onClick={() => setVisible(true)}>
        điều khoản dịch vụ
      </Typography.Link>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable
        onCancel={() => setVisible(false)}
      >
        <center>
          <Typography.Text strong style={{ fontSize: 20 }}>
            {' '}
            Quy định chung
          </Typography.Text>
        </center>
        <Typography.Paragraph>
          Người vay phải trong độ tuổi từ 19- 60 , có tài khoản ngân hàng chính
          chủ hoặc có thể mượn người thân , có CMT hoặc thẻ căn cước , phải cung
          cấp số điện thoại chính chủ , facebook hay zalo chính chủ và số liên
          hệ ít nhất của một người thân
        </Typography.Paragraph>
        <Typography.Paragraph>
          VietCredit sẽ thẩm định đơn vay đầu tiên của bạn trong vòng 30
          phút – 1 tiếng. Với các đơn vay tiếp theo sau khi bạn đã được vay ,
          thời gian thẩm định chỉ 5 phút
        </Typography.Paragraph>
        <Typography.Paragraph>
          VietCredit sẽ thẩm đinh các thông tin của bạn cung cấp ,cung
          cấp càng nhiều thông tin , bạn càng dễ được vay. Cùng với đó , mức tín
          nhiệm của bạn cũng tăng , các khoản vay của bạn có thể được duyệt với
          giá trị lớn hơn , phí và lãi suất thấp hơn , thời gian vay dài hơn
        </Typography.Paragraph>
        <Typography.Paragraph>
          Bất kỳ thông tin không chính xác hoặc không rõ ràng nào cũng có thể
          làm đơn vay của bạn bị từ chối
        </Typography.Paragraph>
        <Typography.Paragraph>
          Vui lòng liên hệ tới sự hỗ trợ của VietCredit để được hỗ trợ
        </Typography.Paragraph>
      </Modal>
    </>
  );
}
