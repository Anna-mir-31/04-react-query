import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    const search = input.value.trim();

    if (!search) {
      toast.error('Please enter a search query.');
      return;
    }

    onSubmit(search);
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
