import React, { useState, useEffect } from 'react';
import './Splash.css';
import { motion } from 'framer-motion';
import { Image } from 'antd';
import logo from '../assets/logo.png';
import logoWhite from '../assets/4960785573497384318.jpg';
export default function Splash() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current < 1) setCurrent((prev) => prev + 1);
      else setCurrent((prev) => 0);
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      className="welcome"
      // style={{ background: current == 0 ? '#006997' : '#fff' }}
      style={{ background: current == 0 ? '#fff' : '#fff', width: '100%' }}
    >
      <main
        className="valign-wrapper"
        style={{
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ position: 'absolute', margin: 'auto' }}
          transition={{ duration: 1 }}
        >
          <Image src={logoWhite} preview={false} style={{ width: '100%' }} />
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', margin: 'auto' }}
          transition={{ duration: 1.5 }}
        >
          <Image src={logo} preview={false} />
        </motion.div> */}
      </main>
    </motion.div>
  );
}
