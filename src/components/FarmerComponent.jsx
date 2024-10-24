"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const FarmerComponent = ({ name, contact, email }) => {
  return (
    <div className=" my-[3rem] flex flex-col border border-gray-300 py-5 px-4 rounded-lg shadow-lg bg-white ">
      <div className="flex items-center border-b pb-3">
        <div className="flex-shrink-0">
          <Image
            height={150}
            width={150}
            src="/person.png"
            title="Farmer Image"
            alt="Farmer"
            className="rounded-full shadow-md"
          />
        </div>
        <div className="ml-4 flex flex-col">
          <div className="text-lg font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-600">Contact: {contact}</div>
          <div className="text-sm text-gray-600">Email: {email}</div>
        </div>
      </div>
      <div className="border-t mt-4 h-[12rem]">
        <Carousel
          responsive={responsive}
          swipeable={true}
          infinite={true}
          containerClass="carousel-container"
          className=" h-[12rem] py-2 px-2"
        >
          {[
            "/6-tomato-png-image.png",
            "/1-carrot-png-image.png",
            "/7-potato-png-images-pictures-download.png",
            "/8-onion-png-image.png",
            "/16-green-pepper-png-image.png",
          ].map((src, index) => (
            <div
              key={index}
              className="flex h-[200px] w-[200px] items-center justify-center"
            >
              <Image
                src={src}
                height={150}
                width={150}
                alt="vegetable"
                className="rounded-md shadow-sm transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default FarmerComponent;
