import React, { useEffect } from 'react';
import { Badge } from 'antd';
import { BellFilled } from '@ant-design/icons';
import useNotification from '../hooks/useNotification';
import { useDispatch } from 'react-redux';

export default function Notification() {
  const dispatch = useDispatch();
  const { notifications } = useNotification();

  return (
    <Badge count={notifications.length}>
      <BellFilled style={{ fontSize: 20, color: 'white' }} />
    </Badge>
  );
}
