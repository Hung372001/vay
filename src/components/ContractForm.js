import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import conDau from '../assets/asign.jpg'

export default function App({ data, profile }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        shape="round"
        style={{ background: '#ff7323', margin: 10 }}
        onClick={() => setVisible(true)}
      >
        <Typography.Text style={{ color: '#fff' }} strong>
          Xem hợp đồng
        </Typography.Text>
      </Button>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable
        onCancel={() => setVisible(false)}
      >
        <h5>
          <center>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</center>
        </h5>
        <h5>
          <center>ĐỘC LẬP - TỰ DO - HANH PHÚC</center>
        </h5>
        <br />
        <Typography.Text strong>
          <center>HỢP ĐỒNG VAY TIỀN</center>
        </Typography.Text>
        <br />
        <p>
          Bên A (Bên cho vay):{' '}
          <Typography.Text strong>
            {' '}
            CÔNG TY CỔ PHẦN DỊCH VỤ TÀI CHÍNH VietCredit
          </Typography.Text>
        </p>
        <p>
          Bên B (Bên vay) Ông / Bà :
          <Typography.Text strong>
            {profile?.kyc?.name || 'Cập nhật khi hoàn thành'}
          </Typography.Text>
        </p>
        <p>
          {' '}
          Số CMT / CCCD :
          <Typography.Text strong>
            {profile?.kyc?.id_number || 'Cập nhật khi hoàn thành'}
          </Typography.Text>
        </p>
        <p>
          Ngày ký :
          <Typography.Text strong>
            {' '}
            {moment(data?.created_at).format('hh:mm A DD/MM/YYYY')}
          </Typography.Text>
        </p>
        <p>
          Số tiền khoản vay :{' '}
          <Typography.Text strong>
            {data?.amount.toLocaleString()} VNĐ
          </Typography.Text>
        </p>
        <p>
          Mã hợp đồng :{' '}
          <Typography.Text strong>
            {data?.slug || 'Cập nhật khi hoàn thành'}
          </Typography.Text>
        </p>
        <p>
          Thời gian vay :{' '}
          <Typography.Text strong>{data?.times} tháng</Typography.Text>
        </p>
        <p>
          Lãi suất vay : <Typography.Text strong>0.8%</Typography.Text> mỗi tháng
        </p>
        <p>
          Hợp đồng nêu rõ các bên đã đặt được thỏa thuận vay sau khi thương
          lượng và trên cơ sở bình đẳng , tự nguyện và nhất trí . Tất cả các bên
          cần đọc kỹ tất cả các điều khoản trong thỏa thuận này, sau khi ký vào
          thỏa thuận này coi như các bên đã hiểu đầy đủ và đồng ý hoàn toàn với
          tất cả các điều khoản và nội dung trong thỏa thuân này.
        </p>
        <p>
          1.Phù hợp với các nguyên tắc bình đẳng , tự nguyện , trung thực và uy
          tín , hai bên thống nhất ký kết hợp đồng vay sau khi thương lượng và
          cùng cam kết thực hiện.
        </p>
        <p>
          2.Bên B cung cấp tài liệu đính kèm của hợp đồng vay và có hiệu lực
          pháp lý như hợp đồng vay này.
        </p>
        <p>
          3.Bên B sẽ tạo lệnh tính tiền gốc và lãi dựa trên số tiền vay từ ví
          ứng dụng do bên A cung cấp.
        </p>
        <p>4.Điều khoản đảm bảo.</p>
        <p>
          - Bên vay không được sử dụng tiền vay để thực hiện các hoạt động bất
          hợp pháp .Nếu không , bên A có quyền yêu cầu bên B hoàn trả ngay tiền
          gốc và lãi , bên B phải chịu các trách nhiêm pháp lý phát sinh từ đó.
        </p>
        <p>
          - Bên vay phải trả nợ gốc và lãi trong thời gian quy định hợp đồng.
          Đối với phần quá hạn , người cho vay có quyền thu hồi nơ trong thời
          hạn và thu ( lãi quá hạn ) % trên tổng số tiền vay trong ngày.
        </p>
        <p>
          - Gốc và lãi của mỗi lần trả nợ sẽ được hệ thống tự động chuyển từ tài
          khoản ngân hàng do bên B bảo lưu sang tài khoản ngân hàng của bên A .
          Bên B phải đảm bảo có đủ tiền trong tài khoản ngân hàng trước ngày trả
          nợ hàng tháng.
        </p>
        <p>5.Chịu trách nhiệm do vi pham hợp đồng</p>
        <p>
          - Nếu bên B không trả được khoản vay theo quy định trong hợp đồng. Bên
          B phải chịu các khoản bồi thường thiệt hại đã thanh lý và phí luật sư,
          phí kiện tụng, chi phí đi lại và các chi phí khác phát sinh do kiện
          tụng.
        </p>
        <p>
          - Khi bên A cho rẳng bên B đã hoặc có thể xảy ra tình huống ảnh hưởng
          đến khoản vay thì bên A có quyền yêu cầu bên B phải trả lại kịp thời
          trược thời hạn.
        </p>
        <p>
          - Người vay và người bảo lãnh không được vi phạm điều lệ hợp đồng vì
          bất kỳ lý do gì
        </p>
        <p>
          6.Phương thức giải quyết tranh chấp hợp đồng. <br />
          Tranh chấp phát sinh trong quá trình thực hiện hợp đồng này sẽ được
          giải quyết thông qua thương lượng thân thiện giữa các bên hoặc có thể
          nhờ bên thứ ba làm trung gian hòa giải .Nếu thương lượng hoặc hòa giải
          không thành , có thể khởi kiện ra tòa án nhân dân nơi bên A có trụ sở.
        </p>
        <p>
          7.Khi người vay trong quá trình xét duyệt khoản vay không thành công
          do nhiều yếu tố khác nhau như chứng minh thư sai, thẻ ngân hàng sai ,
          danh bạ sai. Việc thông tin sai lệch này sẽ khiến hệ thống phát hiện
          nghi ngờ gian lận hoặc giả mạo khoản vay và bên vay phải chủ động hợp
          tác với bên A để xử lý.
        </p>
        <p>
          8.Nếu không hợp tác. Bên A có quyền khởi kiện ra Tòa án nhân dân và
          trình báo lên Trung tâm Báo cáo tín dụng của Ngân hàng nhà nước Việt
          Nam , hồ sơ nợ xấu sẽ được phản ánh trong báo cáo tín dụng , ảnh hưởng
          đến tín dụng sau này của người vay , vay vốn ngân hàng và hạn chế tiều
          dùng của người thân , con cái người vay ...
        </p>
        <br />


        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
          <div>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }} >Bên vay</p>
            <img src={`${data?.signature_capture}`} width="180px" />
            <h5 style={{ textAlign: 'center', fontWeight: 'bold' }} >{profile?.kyc?.name}</h5>
          </div>
          <div>
            <p style={{ textAlign: 'center', fontWeight: 'bold', position: 'relative' }} >Bên cho vay</p>
            <img src={'photo_2024-07-29_14-52-40.jpg'} width="160px" style={{ marginTop: '-20px' }} />
          </div>
        </div>
      </Modal>
    </>
  );
}
