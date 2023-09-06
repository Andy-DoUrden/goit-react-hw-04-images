import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import { Container, GalleryImage } from './ImageGallery.styled';

const BASE_URL = 'https://pixabay.com/api/';
const START_PAGE = 1;
const START_RESPONSE = [];

export default function ImageGallery({
  searchValue,
  onOpenModalClick,
  showModal,
}) {
  const [response, setResponse] = useState(START_RESPONSE);
  const [loading, setLoading] = useState(false);
  const [localPage, setLocalPage] = useState(START_PAGE);
  const [totalPictures, setTotalPictures] = useState(0);

  const [targetImg, setTargetImg] = useState('');
  const [showImg, setShowImg] = useState(false);

  const fetchImages = useMemo(
    () => async page => {
      const params = {
        key: '35900010-e6fba30fbbb71a29105fd08a0',
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: page,
      };

      try {
        const response = await axios.get(BASE_URL, { params });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    [searchValue]
  );

  const loadImages = useMemo(
    () => async (page, images) => {
      setLoading(true);
      const newResponse = await fetchImages(page);
      setLoading(false);

      setResponse(images.concat(newResponse.data.hits));

      setTotalPictures(newResponse.data.totalHits);

      setLocalPage(page);
    },
    [fetchImages]
  );

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    loadImages(START_PAGE, START_RESPONSE, searchValue);
  }, [searchValue, loadImages]);

  const onImageClick = url => {
    setTargetImg(url);
    onOpenModalClick();
  };

  return (
    <Container>
      {response &&
        response.map(img => (
          <ImageGalleryItem
            key={img.id}
            webformatURL={img.webformatURL}
            onClick={() => onImageClick(img.largeImageURL)}
          />
        ))}

      <Button
        onClick={() => loadImages(localPage + 1, response, searchValue)}
        isHide={localPage * 12 > totalPictures}
      />

      {showModal && (
        <Modal
          onClose={onOpenModalClick}
          showImg={showImg}
          resetImg={() => setShowImg(false)}
        >
          <GalleryImage src={targetImg} onLoad={() => setShowImg(true)} />
        </Modal>
      )}

      {loading && <Loader />}
    </Container>
  );
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
  onOpenModalClick: PropTypes.func,
  showModal: PropTypes.bool,
};
