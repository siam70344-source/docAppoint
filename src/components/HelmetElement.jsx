import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetElement = ({ title, description }) => {
  const defaultTitle = "DocAppoint | Book Top Rated Doctors Online";
  const defaultDesc = "Browse certified doctors, read real patient reviews, and schedule appointments instantly.";

  return (
    <Helmet>
      <title>{title ? `${title} | DocAppoint` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={title ? `${title} | DocAppoint` : defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default HelmetElement;