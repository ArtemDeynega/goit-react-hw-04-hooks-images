import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';

import imagesApi from 'service/imageApi';
import { toast, ToastContainer } from 'react-toastify';
import { GlobalStyles } from 'Styles/GlobalStyles/GlobalStyles';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'auto',
      });
    }
    async function fetchApi() {
      try {
        const data = await imagesApi(searchQuery, page);

        setGallery(prevGalerry => [...prevGalerry, ...data]);
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    setStatus('pending');
    setGallery([]);
    fetchApi();
  }, [searchQuery, page]);

  const handleNewQuery = newRequest => {
    if (newRequest !== searchQuery) {
      setSearchQuery(newRequest);
      setStatus('pending');
    }
  };

  const handleClickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toogleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const handClickImage = evt => {
    const modalImg = evt.target.dataset.src;
    const modalAlt = evt.target.alt;

    setShowModal(true);
    setModalAlt(modalAlt);
    setModalImg(modalImg);
  };

  return (
    <>
      <Searchbar onSubmit={handleNewQuery} />

      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <>
          {showModal && (
            <Modal
              onCloseModal={toogleModal}
              modalAlt={modalAlt}
              modalImg={modalImg}
            />
          )}

          <ImageGallery gallery={gallery} onClickImg={handClickImage} />
          <Button onClickBtn={handleClickBtn} />
        </>
      )}
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </>
  );
};
