const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-red-500 border-opacity-75"></div>
    </div>
  );
};

export default LoadingScreen;
