import { useState, useEffect } from 'react';
import { Header, Form, FormButton, ButtonLabel, FormIpnut } from '.';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = evt => {
    setSearchValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchValue.trim() === '') {
      toast.warn(`Введите слово для поиска 🦄`);
      return;
    }
    onSubmit(searchValue.trim().toLowerCase());
    resetRequest();
  };
  const resetRequest = () => {
    setSearchValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
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
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };
//   state = {
//     searchValue: '',
//   };
//   handleInputChange = evt => {
//     this.setState({ searchValue: evt.target.value });
//   };
//   handleSubmit = evt => {
//     evt.preventDefault();
//     const { searchValue } = this.state;
//     if (searchValue.trim() === '') {
//       toast.warn(`Введите слово для поиска 🦄`);
//       return;
//     }

//     this.props.onSubmit(searchValue.trim().toLowerCase());
//     this.resetRequest();
//   };
//   resetRequest = () => {
//     this.setState({ searchValue: '' });
//   };
//   render() {
//     const { searchValue } = this.state;

//     return (
//       <>
// <Header>
//   <Form onSubmit={this.handleSubmit}>
//     <FormButton type="submit">
//       <ImSearch
//         style={{
//           marginRight: 'auto',
//           marginLeft: 'auto',
//           color: 'black',
//         }}
//       />
//       <ButtonLabel>Search</ButtonLabel>
//     </FormButton>
//     <FormIpnut
//       placeholder="Search images and photos"
//       value={searchValue}
//       onChange={this.handleInputChange}
//     />
//   </Form>
// </Header>
//       </>
//     );
//   }
// }
