import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SummaryCard.css';

const SummaryCard = ({ bg, icon, cbvalue, text }) => {
  const [value, setValue] = useState(null);

  if (value === null) cbvalue.then(res => setValue(res.data.value));

  return (
    <Card
      bg={bg}
      className="summary-card"
    >
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
  );
};

SummaryCard.propTypes = {
  bg: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  cbvalue: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default SummaryCard;
