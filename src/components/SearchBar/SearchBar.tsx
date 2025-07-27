// ✅ SearchBar.tsx
import { useState, type FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      toast.error('Please enter a search query');
      return;
    }
    onSubmit(trimmed); // 🔥 ВИКЛИК функції
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className={css.button}>Search</button>
    </form>
  );
}
