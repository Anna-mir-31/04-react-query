import { useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState('');

  return (
    <form
      className={css.form}
      action={async (formData: FormData) => {
        const query = (formData.get('query') as string)?.trim();

        if (!query) {
          toast.error('Please enter a search query');
          return;
        }

        onSubmit(query);
      }}
    >
      <input
        className={css.input}
        type="text"
        name="query"
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
