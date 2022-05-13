import { useEffect, useState } from 'react';
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
    if (searchQuery === '') {
      return;
    }

    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    const fetchApi = async () => {
      setStatus('pending');
      try {
        await imagesApi(searchQuery, page).then(data => {
          if (data.length > 0) {
            setGallery(prevGalerry => [...prevGalerry, ...data]);
            setStatus('resolved');
          }
          if (data.length === 0) {
            setStatus('idle');
            toast.warn(
              `По вашему запросу ${searchQuery} не чего не найдено 😔`
            );
          }
        });
      } catch (error) {
        setError(error);
        console.log(error.message);
      }
    };

    fetchApi();
  }, [page, searchQuery]);

  const handleClickBtn = async () => {
    setPage(prevPage => prevPage + 1);
    setStatus('pending');
  };

  const handleNewQuery = newRequest => {
    if (searchQuery !== newRequest) {
      setSearchQuery(newRequest);
      setPage(1);
      setStatus('resolved');
      setGallery([]);
    }
  };
  const toogleModal = () => {
    setShowModal(!showModal);
  };
  const handClickImage = evt => {
    const modalAlt = evt.target.alt;
    const modalImg = evt.target.dataset.src;

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
export default App;
