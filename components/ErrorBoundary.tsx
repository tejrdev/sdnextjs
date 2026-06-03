interface ErrorProps {
  error: {
    message: string;
    code: string;
  };
}

export const ErrorDisplay: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className='error-container p-4 text-center'>
      <h1 className='text-xl font-bold mb-2'>Something went wrong</h1>
      <p className='text-red-500'>{error.message}</p>
      {process.env.NODE_ENV === 'development' && <p className='text-sm text-gray-500'>Error code: {error.code}</p>}
    </div>
  );
};
