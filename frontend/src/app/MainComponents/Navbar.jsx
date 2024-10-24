export default function Navbar() {
  return (
      <nav className="sticky top-0 z-50 w-full bg-gray-500 bg-opacity-5 backdrop-filter backdrop-blur-sm shadow-lg ">
          <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-evenly h-16">
                  <div className="flex space-x-4 text-black font-semibold text-2xl">
                    TRACK YOUR FOOD HERE
                  </div>
              </div>
          </div>
      </nav>

  );
}