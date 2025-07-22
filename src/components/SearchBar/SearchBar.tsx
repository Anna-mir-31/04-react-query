import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter a search query');
      return;
    }

    onSubmit(query);
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSearch}>
      <input className={css.input} type="text" name="query" autoComplete="off" autoFocus />
      <button className={css.button} type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
