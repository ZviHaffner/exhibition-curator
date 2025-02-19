import Image from "next/image";
import Link from "next/link";

const ApiSelector = () => {
  return (
    <div className="mx-auto w-11/12 md:w-2/3">
      <h1 className="mt-8 text-center text-2xl font-serif">
        Please Select a Source to Search From
      </h1>
      <div className="my-8 md:flex justify-around">
        <div className="md:w-1/3 my-8 md:my-0 pb-2 md:pb-0 bg-white text-center rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/20070622_Art_Institute_of_Chicago_Front_View.JPG"
            alt="Art Institute of Chicago"
            width={500}
            height={500}
            className="w-full h-48 object-cover rounded-t-3xl"
          />
          <p className="text-gray-400 text-xs">
            Image:{" "}
            <a
              href="https://en.wikipedia.org/wiki/File:20070622_Art_Institute_of_Chicago_Front_View.JPG"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Art Institute of Chicago Building by TonyTheTiger
            </a>{" "}
            (licensed under CC BY-SA 3.0).
          </p>
          <h2 className="mt-4 font-serif text-xl">Art Institute of Chicago</h2>
          <Link href="/artworks/chicago">
            <div className="w-fit mx-auto my-4 py-2 px-4 bg-white border rounded-sm shadow-equal hover:bg-gray-100">
              Select
            </div>
          </Link>
        </div>
        <div className="md:w-1/3 my-8 md:my-0 pb-2 md:pb-0 bg-white text-center rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/52/Cleveland_Museum_of_Art.jpg"
            alt="Cleveland Museum of Art"
            width={500}
            height={500}
            className="w-full h-48 object-cover rounded-t-3xl"
            unoptimized
          />
          <p className="text-gray-400 text-xs">
            Image:{" "}
            <a
              href="https://www.flickr.com/photos/edrost88/50586890476/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Cleveland Museum of Art by Erik Drost
            </a>{" "}
            (licensed under CC BY 2.0).
          </p>
          <h2 className="mt-4 font-serif text-xl">Cleveland Museum of Art</h2>
          <Link href="/artworks/cleveland">
            <div className="w-fit mx-auto my-4 py-2 px-4 bg-white border rounded-sm shadow-equal hover:bg-gray-100">
              Select
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApiSelector;
