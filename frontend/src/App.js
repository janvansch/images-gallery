import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'; // no {} as this is a default export
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
  // useState() returns a stateful value and
  // a function to update the stateful value
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json()) // call utility function
      .then((data) => {
        // call defined function
        setImages([{ ...data, title: word }, ...images]); // Adding title = word to data object
        setWord('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id)); // implicit return
    // Filter returns new array
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            // Arrow function with implicit return of an array of image cards with key = index i
            <Col key={i} className="pb-3">
              <ImageCard image={image} deleteImage={handleDeleteImage} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;
