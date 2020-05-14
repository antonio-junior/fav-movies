import React, { useRef, useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CarouselContainer from '../../components/UI/CarouselContainer';
import Loader from '../../components/UI/Loader';
import LoadingBlocker from '../../components/UI/LoadingBlocker';
import { AppContext } from '../../helpers/AppStore';
import Api from '../../services/Api';
import AWS from '../../services/AWS';
import './styles.css';

const Edit = () => {
  const { favoriteid } = useParams();
  const [favorite, setFavorite] = useState(null);
  const { favorites } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [blocking, setBlocking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!favorite) {
      const favoriteContext = favorites.find(f => f._id === favoriteid);
      if (!favoriteContext) {
        Api.get(favoriteid).then(res => setFavorite(res.data));
      } else {
        setFavorite(favoriteContext);
      }
    }
  }, [favorite, favoriteid, favorites]);

  const onChooseFile = event => {
    const file = event.target.files[0];
    const extension = file.name.split('.').pop();
    const newFileName = `${favoriteid}-${Date.now()}.${extension}`;

    const newFile = new File([file], newFileName);

    setSelectedFile(newFile);
  };

  const onClickUpload = () => {
    AWS.addFile(selectedFile)
      .then(res => {
        const imgURL = res.location;
        const newPoster = `${favorite.poster}, ${imgURL}`;
        Api.update(favoriteid, { poster: newPoster })
          .then(resp => {
            toast('Image added successfully!');
            setBlocking(false);
            setFavorite(resp.data);
            setSelectedFile(null);
            inputRef.current.value = '';
          })
          .catch(setBlocking(false));
      })
      .catch(setBlocking(false));

    setBlocking(true);
  };

  return (
    <Container>
      <h1>Add image to AWS S3</h1>
      {!favorite && <Loader />}
      {favorite && (
        <LoadingBlocker active={blocking} text="Sending file...">
          <Row>
            <Col sm={4} xs={4}>
              <CarouselContainer poster={favorite.poster} />
            </Col>
            <Col sm={8} xs={8}>
              <h3>{favorite.title}</h3>
              <span>
                <input
                  ref={inputRef}
                  type="file"
                  name="file"
                  onChange={onChooseFile}
                />
                <Button
                  disabled={selectedFile == null}
                  onClick={onClickUpload}
                  style={{ marginLeft: '15px' }}
                >
                  Upload
                </Button>
              </span>
            </Col>
          </Row>
        </LoadingBlocker>
      )}
    </Container>
  );
};

export default Edit;
