function DashBoard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="mt-4 text-lg text-gray-600">
        You are successfully logged in!
      </p>
      {/* <p>{JSON.stringify(auth.user)}</p> */}
    </div>
  );
}

export default DashBoard;
