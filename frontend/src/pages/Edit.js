import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CarouselContainer from '../components/UI/CarouselContainer';
import Loader from '../components/UI/Loader';
import LoadingBlocker from '../components/UI/LoadingBlocker';
import Api from '../services/Api';
import AWS from '../services/AWS';
import './Edit.css';

const Edit = () => {
  const { favoriteid } = useParams();
  const [favorite, setFavorite] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [blocking, setBlocking] = useState(false);
  const inputRef = useRef(null);

  if (favorite == null) Api.get(favoriteid).then(res => setFavorite(res));

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
        const newPoster = `${favorite.data.poster}, ${imgURL}`;
        Api.update(favoriteid, { poster: newPoster })
          .then(resp => {
            toast('Image added successfully!');
            setBlocking(false);
            setFavorite(resp);
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
          <div className="img-details">
            <CarouselContainer poster={favorite.data.poster} />
          </div>
          <div className="content-details" style={{ paddingLeft: '50px' }}>
            <div>
              <h3>{favorite.data.title}</h3>
              <span>
                <input
                  ref={inputRef}
                  type="file"
                  name="file"
                  onChange={onChooseFile}
                />
                <Button onClick={onClickUpload} style={{ marginLeft: '15px' }}>
                  Upload
                </Button>
              </span>
            </div>
          </div>
        </LoadingBlocker>
      )}
    </Container>
  );
};

export default Edit;
