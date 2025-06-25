import React, { useState } from 'react';
import { Button, Upload, Card, Space, Typography, message } from 'antd';
import { UploadOutlined, RollbackOutlined } from '@ant-design/icons';
import './App.less';

const { Title, Text } = Typography;

const App = () => {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [isPicking, setIsPicking] = useState(false);
  const [pickInterval, setPickInterval] = useState(null);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const nameList = content.split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);
      setNames(nameList);
      message.success(`成功导入 ${nameList.length} 个名字`);
    };
    reader.readAsText(file);
    return false; // Prevent default upload behavior
  };

  const startPicking = () => {
    if (names.length === 0) {
      message.warning('请先上传包含名字的文件');
      return;
    }

    setIsPicking(true);
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setSelectedName(names[randomIndex]);
    }, 100);
    setPickInterval(interval);
  };

  const stopPicking = () => {
    clearInterval(pickInterval);
    setIsPicking(false);
  };

  const reset = () => {
    setNames([]);
    setSelectedName('');
    setIsPicking(false);
    if (pickInterval) {
      clearInterval(pickInterval);
      setPickInterval(null);
    }
  };

  return (
    <div className="container">
      <Card className="main-card">
        <Title level={2} className="title">随机点名系统</Title>
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="upload-section">
            <Text>请上传包含名字的文本文件（每行一个名字）</Text>
            <Upload
              beforeUpload={beforeUpload}
              accept=".txt"
              showUploadList={false}
              disabled={isPicking}
            >
              <Button icon={<UploadOutlined />} disabled={isPicking}>
                上传名单
              </Button>
            </Upload>
            {names.length > 0 && (
              <Text type="secondary">当前名单: {names.length}人</Text>
            )}
          </div>

          <div className="result-section">
            <Card className="name-card">
              <Title level={1} className={selectedName ? 'selected-name' : 'placeholder'}>
                {selectedName || '等待抽取...'}
              </Title>
            </Card>
          </div>

          <div className="action-section">
            {!isPicking ? (
              <Button 
                type="primary" 
                size="large" 
                onClick={startPicking}
                disabled={names.length === 0}
              >
                开始抽取
              </Button>
            ) : (
              <Button 
                type="primary" 
                size="large" 
                danger 
                onClick={stopPicking}
              >
                停止
              </Button>
            )}
            <Button 
              icon={<RollbackOutlined />} 
              onClick={reset}
              disabled={isPicking}
            >
              重置
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default App;
