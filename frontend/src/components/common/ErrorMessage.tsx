import { Alert } from 'react-bootstrap';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  return (
    <Alert variant="danger" onClose={onDismiss} dismissible={!!onDismiss}>
      {message}
    </Alert>
  );
}; 