import React from 'react';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './index.module.less';

const AIPromptBuilder = () => {
  return (
    <div className={styles.aiPromptBuilder}>
      <span className={styles.title}>你想要构建什么?</span>
      <div className={styles.subtitleContainer}>
        <span className={styles.subtitleText}>用AI打造前端研发新范式</span>
        <img
          alt=""
          src="https://mdn.alipayobjects.com/fecodex_image/afts/img/ivY4T4HEMFgAAAAAQBAAAAgAejH3AQBr/original"
          className={styles.subtitleIcon}
        />
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputBox}>
          <span className={styles.inputLabel}>开</span>
          <div className={styles.inputRow}>
            <span className={styles.modelName}>Qwen3-Coder(默认)</span>
            <DownOutlined className={styles.dropdownIcon} />
            <img
              alt=""
              src="https://mdn.alipayobjects.com/fecodex_image/afts/img/rfDRRb9LJDEAAAAAQBAAAAgAejH3AQBr/original"
              className={styles.techIcon}
            />
            <span className={styles.framework}>React</span>
            <DownOutlined className={styles.dropdownIconSecondary} />
            <Button shape="round" className={styles.generateButton}>
              <img
                alt=""
                src="https://mdn.alipayobjects.com/fecodex_image/afts/img/NJpiTYlr8DYAAAAAHcAAAAgAejH3AQBr/original"
                className={styles.buttonIcon}
              />
              <span className={styles.buttonText}>生成</span>
            </Button>
          </div>
        </div>
        <div className={styles.modeSelector}>
          <div className={styles.modeCardPrimary}>
            <CheckOutlined className={styles.checkIcon} />
            <div className={styles.cardContent}>
              <img
                alt=""
                src="https://mdn.alipayobjects.com/fecodex_image/afts/img/k_o4RKTy_YMAAAAAQBAAAAgAejH3AQBr/original"
                className={styles.profileIcon}
              />
              <span className={styles.modeLabel}>通用模式</span>
            </div>
          </div>
          <div className={styles.modeCardSecondary}>
            <img
              alt=""
              src="https://mdn.alipayobjects.com/fecodex_image/afts/img/aa7RQ4DFODAAAAAAQCAAAAgAejH3AQBr/original"
              className={styles.modeIcon}
            />
            <span className={styles.modeText}>网页开发专家模式</span>
          </div>
          <div className={styles.modeCardDisabled}>
            <img
              name="BulbFilled"
              alt=""
              src="https://mdn.alipayobjects.com/fecodex_image/afts/img/7RxLTpX-loUAAAAAQBAAAAgAejH3AQBr/original"
              className={styles.comingSoonIcon}
            />
            <span className={styles.comingSoonText}>敬请期待</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPromptBuilder;
