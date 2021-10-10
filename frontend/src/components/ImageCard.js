import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

const ImageCard = ({ image, deleteImage, saveImage }) => {
  const authorName = image.user?.name || 'No author name';
  const authorPortfolioURL = image.user?.portfolio_url;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{Image.description || image.alt_description}</Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>{' '}
        {!image.saved && ( // Display button if image.saved is not present
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="text-center text-muted">
        {authorPortfolioURL && (
          <Nav.Link href={authorPortfolioURL} target="_blank">
            {authorName}
          </Nav.Link>
        )}
        {!authorPortfolioURL && authorName}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;

// What is happening here: image.title?
// The ? is a new option, it is like a conditional
// if image.title is present do the upper case conversion else it's undefined
