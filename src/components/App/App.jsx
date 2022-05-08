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
      await imagesApi(searchQuery, page)
        .then(data => {
          if (data.length > 0) {
            setGallery(prevGalerry => [...prevGalerry, ...data]);
            setStatus('resolved');
            return;
          } else {
            setStatus('idle');
            toast.warn(
              `По вашему запросу ${searchQuery} не чего не найдено 😕`
            );
          }
        })
        .catch(error => {
          setError('error');
          console.log(error.message);
          toast.error(`Ууупс что то пошло не так`);
        });
    };

    fetchApi();
  }, [page, searchQuery]);

  const handleClickBtn = async () => {
    await imagesApi(searchQuery, page).then(data => {
      setPage(prevPage => prevPage + 1);
      setStatus('pending');
    });
  };
  const handleNewQuery = newRequest => {
    if (searchQuery !== newRequest) {
      setSearchQuery(newRequest);
      setStatus('resolved');
    }
  };
  const toogleModal = () => {
    setShowModal(!showModal);
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

export default App;

// export class App extends Component {
//   state = {
//     gallery: [],
//     searchQuery: '',
//     page: 1,
//     status: 'idle',
//     error: null,
//     showModal: false,
//     modalImg: '',
//     modalAlt: '',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.searchQuery;
//     const currentQuery = this.state.searchQuery;

//     const prevPage = prevState.page;
//     const currentPage = this.state.page;

//     if (currentPage > 1) {
// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'auto',
// });
//     }

//     if (prevQuery !== currentQuery) {
//       this.setState({ gallery: [], status: 'pending' });
//     }
//     if (prevQuery !== currentQuery || prevPage !== currentPage) {
//       await imagesApi(currentQuery, currentPage)
//         .then(data => {
//           const images = data;

//           if (images.length > 0) {
//             images.map(({ id, tags, webformatURL, largeImageURL }) => {
//               return this.setState(({ gallery }) => ({
//                 gallery: [
//                   ...gallery,
//                   { id, tags, webformatURL, largeImageURL },
//                 ],
//                 status: 'resolved',
//               }));
//             });
//           } else {
//             toast.warn(
//               `По вашему запросу ${currentQuery} не чего не найдено 😕 `,
//               {
//                 position: 'top-right',
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               }
//             );
//             this.setState({ status: 'idle' });
//           }
//         })
//         .catch(error => {
//           this.setState({ error, status: 'rejected' });
//           toast.error(`Что то пошло не так 😔`, {
//             position: 'top-right',
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         });
//     }
//   }
//   handleNewQuery = newRequest => {
//     const { searchQuery } = this.state;

//     if (newRequest !== searchQuery) {
//       this.setState({ searchQuery: newRequest, page: 1, status: 'pending' });
//       toast.error();
//     }
//   };
//   handleClickBtn = evt => {
//     this.setState(({ page }) => {
//       return { page: page + 1, status: 'pending' };
//     });
//   };
//   toogleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };
//   handClickImage = evt => {
//     const modalImg = evt.target.dataset.src;
//     const modalAlt = evt.target.alt;

//     this.setState({
//       showModal: true,
//       modalAlt,
//       modalImg,
//     });
//   };
//   render() {
//     const { gallery, status, showModal, modalAlt, modalImg } = this.state;

//     return (
// <>
//   <Searchbar onSubmit={this.handleNewQuery} />

//   {status === 'pending' && <Loader />}
//   {status === 'resolved' && (
//     <>
//       {showModal && (
//         <Modal
//           onCloseModal={this.toogleModal}
//           modalAlt={modalAlt}
//           modalImg={modalImg}
//         />
//       )}

//       <ImageGallery gallery={gallery} onClickImg={this.handClickImage} />
//       <Button onClickBtn={this.handleClickBtn} />
//     </>
//   )}
//   <GlobalStyles />
//   <ToastContainer autoClose={3000} />
// </>
//     );
//   }
// }
