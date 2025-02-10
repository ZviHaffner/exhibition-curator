const LoadingSpinner = () => {
  return (
    <>
      <div
        className={`mt-52 mx-auto size-16 border-8 border-dotted border-gray-500 border-t-gray-200 rounded-full animate-spin`}
      />
      <p className="my-4 text-center font-serif text-xl text-gray-500">Loading...</p>
    </>
  );
};

export default LoadingSpinner;
