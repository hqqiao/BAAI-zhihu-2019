import React from 'react';
import { Divider, Button } from 'antd';
import { PlusOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons';

import styles from './index.less';

const ButtonShowcase: React.FC = () => {
  const onPrimaryButtonClick = () => {};

  const onDefaultButtonClick = () => {};

  const onDashedButtonClick = () => {};

  const onAddProjectClick = () => {};

  const onSearchClick = () => {};

  const onDownloadClick = () => {};

  const onLikeClick = () => {};

  const onFavoriteClick = () => {};

  const onDangerClick = () => {};

  const onDisabledClick = () => {};

  const onLoadingClick = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.componentCommonRgu9}>
        <span className={styles.buttonShowcaseTitle}>
          Ant Design 按钮组件示例
        </span>
        <Divider orientation="center" className={styles.buttonTypeDivider}>
          基础按钮类型
        </Divider>
        <div className={styles.buttonGroupContainer}>
          <div className={styles.componentCommonJzl2}>
            <Button
              type="primary"
              size="small"
              onClick={onPrimaryButtonClick}
              className={styles.componentSharedIwi2}
            >
              Primary Button
            </Button>
            <Button
              size="small"
              onClick={onDefaultButtonClick}
              className={styles.defaultButton}
            >
              Default Button
            </Button>
            <Button
              size="small"
              onClick={onDashedButtonClick}
              className={styles.dashedButton}
            >
              Dashed Button
            </Button>
          </div>
          <div className={styles.componentCommonJzl2}>
            <span className={styles.componentSharedWuk7}>Text Button</span>
            <a className={styles.componentCommonRnt7}>Link Button</a>
          </div>
        </div>
      </div>
      <div className={styles.componentCommonRgu9}>
        <Divider orientation="center" className={styles.iconButtonDivider}>
          带图标按钮
        </Divider>
        <div className={styles.iconButtonGroup}>
          <div className={styles.iconButtonRow}>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined className={styles.plusIcon} />}
              onClick={onAddProjectClick}
              className={styles.componentSharedIwi2}
            >
              添加项目
            </Button>
            <Button
              size="small"
              icon={<SearchOutlined className={styles.componentSharedRux3} />}
              onClick={onSearchClick}
              className={styles.componentSharedIkm9}
            >
              搜索
            </Button>
            <Button
              size="small"
              onClick={onDownloadClick}
              className={styles.downloadButton}
            >
              <img
                alt=""
                src="https://mdn.alipayobjects.com/fecodex_image/afts/img/ewkNQ79fzwgAAAAACaAAAAgAejH3AQBr/original"
                className={styles.componentSharedQzk8}
              />
              <span className={styles.componentSharedWuk7}>下载</span>
            </Button>
            <Button
              size="small"
              onClick={onLikeClick}
              className={styles.likeButton}
            >
              <img
                alt=""
                src="https://mdn.alipayobjects.com/fecodex_image/afts/img/JZRKQa1uAC0AAAAADeAAAAgAejH3AQBr/original"
                className={styles.componentSharedQzk8}
              />
              <span className={styles.likeLabel}>喜欢</span>
            </Button>
            <Button
              size="small"
              icon={<StarOutlined className={styles.componentSharedRux3} />}
              onClick={onFavoriteClick}
              className={styles.componentSharedIkm9}
            >
              收藏
            </Button>
          </div>
          <Divider orientation="center" className={styles.buttonStateDivider}>
            按钮状态
          </Divider>
          <div className={styles.stateButtonGroup}>
            <Button
              size="small"
              onClick={onDangerClick}
              className={styles.dangerButton}
            >
              危险操作
            </Button>
            <Button
              size="small"
              onClick={onDisabledClick}
              className={styles.disabledButton}
            >
              禁用状态
            </Button>
            <Button
              size="small"
              onClick={onLoadingClick}
              className={styles.loadingButton}
            >
              <img
                alt=""
                src="https://mdn.alipayobjects.com/fecodex_image/afts/img/sSmSSYJFRwUAAAAAChAAAAgAejH3AQBr/original"
                className={styles.loadingIcon}
              />
              <span className={styles.loadingLabel}>加载中</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
