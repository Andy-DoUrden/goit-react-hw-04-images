import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, GalleryContainer } from './App.styled';

import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchSubmit = nextSearchValue => {
    setSearchValue(nextSearchValue);
  };

  const toggleModal = () => {
    setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
  };
  return (
    <Container>
      <GalleryContainer>
        <ToastContainer autoClose={3000} theme={'dark'} />
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery
          searchValue={searchValue}
          onOpenModalClick={toggleModal}
          showModal={isModalVisible}
        />
      </GalleryContainer>
    </Container>
  );
}
