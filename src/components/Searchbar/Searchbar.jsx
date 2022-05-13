import { useState } from 'react';
import { Header, Form, FormButton, ButtonLabel, FormIpnut } from '.';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = evt => {
    setSearchValue(evt.target.value);
  };

  const handleInputChange = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      toast.warn(`Введите слово для поиска 🦄`);
      return;
    }
    onSubmit(searchValue.trim().toLowerCase());
    setSearchValue('');
  };

  return (
    <>
      <Header>
        <Form onSubmit={handleInputChange}>
          <FormButton type="submit">
            <ImSearch
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                color: 'black',
              }}
            />
            <ButtonLabel>Search</ButtonLabel>
          </FormButton>
          <FormIpnut
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleSubmit}
          />
        </Form>
      </Header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

///   handleSubmit = evt => {
//     evt.preventDefault();
//     const { searchValue } = this.state;
//     if (searchValue.trim() === '') {
//       toast.warn(`Введите слово для поиска 🦄`);
//       return;
//     }

//     this.props.onSubmit(searchValue.trim().toLowerCase());
//     this.resetRequest();
//   };
