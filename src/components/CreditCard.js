import React from 'react';
import { Image, Typography } from 'antd';
import { motion } from 'framer-motion';
import bgcard from '../assets/card.png';
import './CreditCard.scss';
export default function CreditCard({ nameBank, bankNumber, logoBank, name }) {
  return (
    <motion.div
      style={{
        minHeight: 200,
        width: '85vw',
        borderRadius: 10,
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundImage: `url(${bgcard})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="image"
    >
      {!logoBank || logoBank == 'undefined' ? (
        <Typography.Text
          style={{ fontSize: 20, color: '#fff', padding: '0px 5px' }}
        >
          {nameBank ? nameBank : 'Chọn ngân hàng'}
        </Typography.Text>
      ) : (
        <Image src={logoBank} width={80} preview={false} />
      )}

      <div>
        {bankNumber ? (
          <Typography.Text strong className="information">
            {bankNumber}
          </Typography.Text>
        ) : (
          <Typography.Text strong className="hidden-information">
            &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
          </Typography.Text>
        )}

        <br />

        {name ? (
          <Typography.Text strong className="information">
            {name.toUpperCase()}
          </Typography.Text>
        ) : (
          <Typography.Text strong className="hidden-information">
            *********
          </Typography.Text>
        )}
      </div>
    </motion.div>
  );
}
