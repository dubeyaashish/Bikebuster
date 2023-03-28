import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="mt-6">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/images/discoball.png" alt="disco ball" style={{ width: "160px" }} />
        <img src="/images/logoishtyle.jpg" alt="placeholder" className="rounded-lg w-44.5 mx-8" />
        <img src="/images/discoball.png" alt="disco ball" style={{ width: "160px" }} />
      </div>
      <header className="rounded-2xl border-t-4 border-b-4 border-l-4 border-r-4 border-purple-900 py-6 shadow-md max-w-4xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-purple-1000">
            Don't let fashion stress you out – book an expert stylist and make sure you always look and feel your best!
          </h1>
        </div>
      </header>
      <div className="flex justify-center mt-4 mb-12">
       <Link to="/stylistlogin">
        <button className="bg-purple-900 hover:bg-purple-700 text-white py-5 px-12 rounded-lg shadow-lg font-bold text-xl mr-4">
          START as a Stylist
        </button>
        </Link>
        <Link to="/login">
        <button className="bg-purple-900 hover:bg-purple-700 text-white py-5 px-12 rounded-lg shadow-lg font-bold text-xl mr-4">
          START as a Customer
        </button>
        </Link>
      </div>
      <footer className="bg-purple-900 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white font-bold">
             Elevate your style with our stress-free styling services – our team of fashion experts will work with you to create a look that's uniquely you!
          </p>
        </div>
      </footer>
    </div>
  );
}
