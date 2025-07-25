import { useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  const [value, setValue] = useState('');

  return (
    <form className={css.form} action={async (formData: FormData) => {
      const query = (formData.get('search') as string)?.trim();
      if (!query) {
        toast.error('Please enter a search query');
        return;
      }
      action(formData);
    }}>
      <input
        className={css.input}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit" className={css.button}>Search</button>
    </form>
  );
}