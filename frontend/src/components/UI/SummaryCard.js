import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';

import './SummaryCard.css';

const SummaryCard = ({ icon, data, text }) => {
  return (
    <Card className="summary-card">
      <Card.Body>
        <>
          <div className="imgContainer db-container">
            <FontAwesomeIcon icon={icon} />
          </div>

          <div className="contentContainer db-container">
            <Card.Title>{data}</Card.Title>
            <Card.Text>{text}</Card.Text>
          </div>
        </>
      </Card.Body>
    </Card>
  );
};

SummaryCard.propTypes = {
  icon: PropTypes.object.isRequired,
  data: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SummaryCard;
