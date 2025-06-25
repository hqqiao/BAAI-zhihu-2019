import React from 'react';

import styles from './index.less';

const CouponCenterPromotion: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.couponCenterHeader}>
        <span className={styles.promotionTitle}>618领券中心·叠券7.2折起</span>
        <div className={styles.promotionContentWrapper}>
          <div className={styles.promotionSection}>
            <div className={styles.promotionImageContainer}>
              <img
                alt=""
                src="https://weavefox.alipay.com/assets/c064a3d3-0dc0-46bb-a40a-f2a1ed9fdf9d.png"
                className={styles.promotionImage}
              />
              <span className={styles.maxDiscountLabel}>至高抵1050元</span>
            </div>
            <span className={styles.componentSharedEbc1}>88vip专享</span>
          </div>
          <div className={styles.promotionItemWrapper}>
            <div className={styles.promotionItemImageContainer}>
              <img
                alt=""
                src="https://weavefox.alipay.com/assets/0a9bf853-1b3f-4d04-8f51-3311068e0894.png"
                className={styles.promotionItemImage}
              />
              <span className={styles.bestBuyListLabel}>618必买榜</span>
            </div>
            <span className={styles.componentSharedEbc1}>必买爆款</span>
          </div>
          <div className={styles.promotionOfferWrapper}>
            <div className={styles.promotionOfferImageContainer}>
              <img
                alt=""
                src="https://weavefox.alipay.com/assets/808eddfd-bac5-4e1a-9556-fba763a8c55f.png"
                className={styles.promotionOfferImage}
              />
              <span className={styles.officialDiscountLabel}>官方立减15%</span>
            </div>
            <span className={styles.componentSharedEbc1}>立即抢购</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCenterPromotion;
