import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'; // {} not required as this is a default export
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import { Container, Row, Col } from 'react-bootstrap';

//const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  // useState() returns a stateful value and
  // a function to update the stateful value
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []); // Set images array equal to array returned from DB or to empty array
      setLoading(false);
      toast.success('Saved images downloaded');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => getSavedImages(), []); // Because array is empty useEffect will only trigger on initial render

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]); // Adding title = word to data object
      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id === id) {
        toast.success(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was removed from DB`
        );
        // filter out image if it's id equals id param value
        setImages(images.filter((image) => image.id !== id)); // implicit return
        // Filter returns new array
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    // in images array find an image with an image id equal to id parameter value
    imageToBeSaved.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved); // Axios will convert the data to JSON
      if (res.data?.inserted_id) {
        setImages(
          images.map(
            (image) => (image.id === id ? { ...image, saved: true } : image)
            // if image id equals param id add saved: true property to all other properties else return image
          )
        );
        toast.success(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  // Arrow function with implicit return of an array of image cards with key = index i
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>{' '}
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
