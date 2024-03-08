import { gallery } from "../constants/Gallery";

const Gallery = () => {
  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24 my-36">
      <h2 className="text-3xl font-bold text-center mb-10">
        Best Selling Products
      </h2>
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2 relative">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gallery[0].url}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white">{gallery[0].desc}</p>
            </div>
          </div>
          <div className="w-1/2 p-1 md:p-2 relative">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gallery[1].url}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white">{gallery[1].desc}</p>
            </div>
          </div>
          <div className="w-full p-1 md:p-2 relative">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gallery[2].url}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white">{gallery[2].desc}</p>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2 relative">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gallery[3].url}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white">{gallery[3].desc}</p>
            </div>
          </div>
          <div className="w-1/2 p-1 md:p-2 relative">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gallery[4].url}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white">{gallery[4].desc}</p>
            </div>
          </div>
          <div className="w-1/2 p-1 md:p-2 relative">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={gallery[5].url}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white">{gallery[5].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
