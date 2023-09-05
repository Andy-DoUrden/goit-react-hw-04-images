import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Form, FormName, NewFormValue, Search } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = e => {
    setSearchText(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchText.trim() === '') {
      toast.warning('Воу-воу козаче, введи щось)');
      return;
    }

    onSubmit(searchText);
    setSearchText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormName>
        Знайди картинки:
        <NewFormValue
          type="text"
          autoFocus
          placeholder="Search images and photos"
          name="searchText"
          value={searchText}
          onChange={handleInputChange}
          autocomplete="off"
        />
      </FormName>

      <Search type="submit">Шукати</Search>
    </Form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
