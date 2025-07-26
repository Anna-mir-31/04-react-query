// ErrorMessage.tsx
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong. Please try again.',
}: ErrorMessageProps) {
  return <p className={css.text}>{message}</p>; 
}
