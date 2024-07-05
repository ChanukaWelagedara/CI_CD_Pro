import React from 'react';
import styles from './footer.css';  // Update the import path

export const Footer = () => {
  return (
    <div className={styles.fotter1}>
    <div className={styles.fotter1Child} />
    <img className={styles.cardPaymentsLogoUkPngTranIcon} alt="" src="615-6155786_card-payments-logo-uk-png-transparent-png 1.png" />
    <div className={styles.copyright20231}>{`Copyright © 2023 Chanu@Music. `}</div>
    <div className={styles.allRightsReserved1}>All Rights Reserved</div>
    </div>)
  
};

export default Footer;
