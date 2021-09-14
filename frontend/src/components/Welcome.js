import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Images Gallery</Card.Title>
        <Card.Text>
          This is simple application that retrieves photos using Unsplash API.
          In order to start enter any search term in the input field.
        </Card.Text>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Welcome;
