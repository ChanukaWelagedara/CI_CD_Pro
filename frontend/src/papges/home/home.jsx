
import React from 'react';
import styles from './Home.module.css';

export const Home = () => {
	
	return (
    		<div className={styles.home}>
      			
      			<div className={styles.ourCategories}>Our Categories</div>
      			<div className={styles.display}>
        				<div className={styles.background}>
          					<div className={styles.backgroundimage1} />
          					<div className={styles.background} />
          					<div className={styles.backgroundImage}>
            						<img className={styles.image1} alt="" src="image1.png" />
            						<img className={styles.image2} alt="" src="image2.png" />
            						<img className={styles.image3} alt="" src="image3.png" />
            						<img className={styles.image4} alt="" src="image4.png" />
            						<img className={styles.image5} alt="" src="image5.png" />
            						<img className={styles.image6} alt="" src="image 6.png" />
          					</div>
        				</div>
        				<div className={styles.text}>
          					<div className={styles.text1}>Explore our Wide Selection Today!</div>
          					<div className={styles.text2}>{`Elevate Your Melodies  `}</div>
          					<div className={styles.text3}>Music Instruments</div>
        				</div>
      			</div>
      			<div className={styles.categories}>
        				<div >
          					<img className={styles.gitarImage} alt="" src="image7.png"  />
          					<div className={styles.guitars}>Guitars</div>
        				</div>
        				<div className={styles.drum}>
          					<img className={styles.drumChild} alt="" src="image8.png" />
          					<div className={styles.accessories}>Drums and Percussion</div>
        				</div>
        				<div className={styles.elec}>
          					<img className={styles.drumChild} alt="" src="image9.png" />
          					<div className={styles.guitars}>Electronic Instruments</div>
        				</div>
        				<div className={styles.auduio}>
          					<img className={styles.auduioChild} alt="" src="image10.png" />
          					<div className={styles.audioEquipment}>Audio Equipment</div>
        				</div>
        				<div className={styles.asses}>
          					<img className={styles.drumChild} alt="" src="image11.png" />
          					<div className={styles.accessories}>Accessories</div>
        				</div>
        				<div className={styles.brass}>
          					<img className={styles.gitarImage} alt="" src="image12.png" />
          					<div className={styles.brassInstruments}>Brass Instruments</div>
        				</div>
        				<div className={styles.string}>
          					<img className={styles.drumChild} alt="" src="image13.png" />
          					<div className={styles.guitars}>String Instruments</div>
        				</div>
        				<div className={styles.keyboards}>
          					<img className={styles.keyboardsChild} alt="" src="image14.png" />
          					<div className={styles.guitars}>Keyboards/Pianos</div>
        				</div>
      			</div>
      			
      			
    		</div>);
};

export default Home;
