import React, { useState, useEffect } from 'react';
import { Typography, Carousel, Image, Button } from 'antd';
import tickAsset from '../../assets/tick.png';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Notification } from '../../components';
import './Home.scss';
import { useSelector } from 'react-redux';

const arrayText = [
  '097***4 đã rút 35.000.000 đ',
  '033***8 đã rút 30.000.000 đ',
  '087***3 đã rút 45.000.000 đ',
  '033***1 đã rút 100.000.000 đ',
  '035***5 đã được duyệt hồ sơ',
  '033***5 đã rút 80.000.000 đ',
];

const listLoan = [
  {
    id: 1,
    title : '40 Triệu ~ 50 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  },
  {
    id: 2,
    title : '60 Triệu ~ 80 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  },
  {
    id: 3,
    title : '100 Triệu ~ 200 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  },
  {
    id: 4,
    title : '200 Triệu ~ 300 Triệu',
    limit: '12-60 tháng',
    rate: '0.8%'
  }
]

export default function Home() {
  const history = useHistory();
  const { profile } = useSelector((state) => state._auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeClass, setActiveClass] = useState(1);
  const [loanActive, setLoanActive] = useState(listLoan.find(item => item.id === 1));

  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < arrayText.length - 1)
        setCurrentIndex((prev) => prev + 1);
      else setCurrentIndex((prev) => 0);
    }, 1800);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleOnTouchStart = (start) => { 
    setActiveClass(start);
    setLoanActive(listLoan.find(item => item.id === start));
  }

  return (
    <motion.div
      initial={{ opacity: 0.3, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
    >
      <div className="header-content">
        <div>
          <Typography.Text className="text-head">Xin chào, </Typography.Text>
          <br />
          <Typography.Text className="text-head">
            {profile?.kyc?.name || profile.phone}
          </Typography.Text>
        </div>
        <motion.div
          whileTap={{ scale: 0.9, opacity: 0.7 }}
          onClick={() => history.push('/notifications')}
        >
          <Notification />
        </motion.div>
      </div>

      <div className="noti-text-container">
        <Typography.Text className="noti-text">
          {arrayText[currentIndex]}
        </Typography.Text>
      </div>
      <div
        className='loan-estimate'
        style={{ justifyContent: 'center', minHeight: 150 }}
      >
        {/* <Image
          preview={false}
          src={home}
          width={'100%'}
        /> */}
        <p className='loan-estimate-title'>Số tiền cho vay ước tính</p>
        <p className='loan-estimate-money'>{loanActive.title}</p>
        <div className='noti-detail'>
            <div className='noti-detail-left'>
                <p>Lãi suất hàng tháng</p>
                <p>{loanActive.rate}</p>
            </div>
            <div className='noti-detail-right'>
                <p>Thời gian cho vay</p>
                <p>{loanActive.limit}</p>
            </div>
        </div>
      </div>
      {/* <Button
        className="choose-btn"
        onClick={() => {
          history.push('/vay');
        }}
      >
        <Typography.Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: blink ? 'yellow' : 'white',
            transition: 'color 0.5s',
          }}
        >
          Đăng ký khoản vay
        </Typography.Text>
      </Button> */}
      <label className='title-loan'>Số tiền cho vay ước tính</label>
      <div className='loan-list' style={{ padding: 10 }}>
        {listLoan.map((item, index) => (
        <div key={index} className={`loan-item ${activeClass === item.id ? 'active' : ''}`}
                onClick={() => {
                  history.push(`/vay`);
                  localStorage.setItem('loanActive', item.id);
                }}
                onTouchStart={()=>handleOnTouchStart(item.id)}>
            <div className='loan-item-left' >
                <p>{item.title}<br/>
                Hạn mức | {item.limit}
                </p>
            </div>
            <div className='loan-item-right'>
                <p>{item.rate}<br/>Lãi suất</p>
            </div>
        </div>
        ))}
      </div>
      <Carousel autoplay autoplaySpeed={2800} className="carousel-container">
        <div>
          <div className="carousel slider2">
            <div className="sl-text-container"></div>
          </div>
        </div>
        <div>
          <div className="carousel slider3">
            <div className="sl-text-container"></div>
          </div>
        </div>
        <div>
          <div className="carousel slider4">
            <div className="sl-text-container"></div>
          </div>
        </div>
      </Carousel>
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
        border: '1px solid #ff0021',
      }}
      onClick={onClick}
      style={{
        margin: '10px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 15px',
        border: '1px solid #ff0021',
        borderRadius: 5,
      }}
    >
      <Typography.Text
        style={{ flex: 1, fontSize: 16, color: '#ff0021', fontWeight: 500 }}
      >
        {title}
      </Typography.Text>
      {icon}
    </motion.div>
  );
};
