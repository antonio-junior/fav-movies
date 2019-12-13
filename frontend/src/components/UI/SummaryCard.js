import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loader from './Loader';
import './SummaryCard.css';

const SummaryCard = ({ icon, promise, text }) => {
  const [value, setValue] = useState(null);

  if (value === null) promise.then(res => setValue(res.data.value));

  return (
    <>
      {!value && <Loader />}
      {value && (
        <Card bg="secondary" className="summary-card">
          <Card.Body>
            <div className="imgContainer db-container">
              <FontAwesomeIcon icon={icon} />
            </div>

            <div className="contentContainer db-container">
              <Card.Title>{value}</Card.Title>
              <Card.Text>{text}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

SummaryCard.propTypes = {
  icon: PropTypes.object.isRequired,
  promise: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default SummaryCard;
