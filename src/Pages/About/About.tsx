import React from 'react';
import classes from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={classes.aboutContainer}>
      <div className={classes.aboutContent}>
        <h1 className={classes.title}>About Us</h1>
        
        <section className={classes.section}>
          <h2 className={classes.sectionTitle}>Our Mission</h2>
          <p className={classes.description}>
            We are dedicated to providing high-quality products and exceptional customer service. 
            Our mission is to connect customers with the best products that meet their needs and exceed their expectations.
          </p>
        </section>

        <section className={classes.section}>
          <h2 className={classes.sectionTitle}>Our Story</h2>
          <p className={classes.description}>
            Founded with a passion for excellence, our company has grown from a small startup to a trusted name in the industry. 
            We believe in innovation, quality, and customer satisfaction above all else.
          </p>
        </section>

        <section className={classes.section}>
          <h2 className={classes.sectionTitle}>Our Values</h2>
          <div className={classes.valuesGrid}>
            <div className={classes.valueItem}>
              <h3 className={classes.valueTitle}>Quality</h3>
              <p className={classes.valueDescription}>
                We never compromise on quality. Every product in our catalog meets our high standards.
              </p>
            </div>
            <div className={classes.valueItem}>
              <h3 className={classes.valueTitle}>Innovation</h3>
              <p className={classes.valueDescription}>
                We constantly strive to bring the latest and most innovative products to our customers.
              </p>
            </div>
            <div className={classes.valueItem}>
              <h3 className={classes.valueTitle}>Customer First</h3>
              <p className={classes.valueDescription}>
                Our customers are at the heart of everything we do. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </section>

        <section className={classes.section}>
          <h2 className={classes.sectionTitle}>Contact Information</h2>
          <div className={classes.contactInfo}>
            <div className={classes.contactItem}>
              <strong>Email:</strong> info@company.com
            </div>
            <div className={classes.contactItem}>
              <strong>Phone:</strong> +1 (555) 123-4567
            </div>
            <div className={classes.contactItem}>
              <strong>Address:</strong> 123 Business Street, City, State 12345
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 