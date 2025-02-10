"use client";

import { notFound, useParams } from "next/navigation";
import { FaExternalLinkAlt } from "react-icons/fa";

const apiSource = () => {
  const { apiSource } = useParams();

  if (apiSource === "chicago") {
    return (
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/51/20070622_Art_Institute_of_Chicago_Front_View.JPG"
          alt="Art Institute of Chicago"
          className="mx-auto w-11/12 my-4 md:my-10 md:w-1/4"
        />
        <p className="text-center md:text-right text-gray-600 text-xs">
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
        <div className="pt-8 pb-4 bg-white border-b">
          <hr className="mb-4" />
          <article className="mx-auto w-11/12 md:w-1/2">
            <section>
              <h1 className="text-center font-serif text-3xl">
                Art Institute of Chicago
              </h1>
              <p className="font-light mt-4 mb-8">
                A world-renowned museum with an extensive collection spanning
                centuries. From Impressionist masterpieces to ancient artifacts,
                the Art Institute of Chicago offers a rich and diverse selection
                of artworks.
              </p>
            </section>
            <a
              href="https://www.artic.edu/"
              target="_blank"
              className="mx-auto w-fit py-2 px-4 flex justify-center items-center gap-1 bg-gray-600 text-white rounded-lg hover:bg-gray-200 hover:text-black"
            >
              <p>Visit their Website</p>
              <FaExternalLinkAlt />
            </a>
          </article>
        </div>
      </div>
    );
  } else if (apiSource === "cleveland") {
    return (
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/52/Cleveland_Museum_of_Art.jpg"
          alt="Cleveland Museum of Art"
          className="mx-auto w-11/12 my-4 md:my-10 md:w-1/4"
        />
        <p className="text-center md:text-right text-gray-600 text-xs">
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
        <div className="pt-8 pb-4 bg-white border-b">
          <hr className="mb-4" />
          <article className="mx-auto w-11/12 md:w-1/2">
            <section>
              <h1 className="text-center font-serif text-3xl">
                Cleveland Museum of Art
              </h1>
              <p className="font-light mt-4 mb-8">
                Known for its globally significant collection, the Cleveland
                Museum of Art showcases masterpieces from a wide range of
                cultures and time periods. Its open-access collection allows art
                lovers to explore and appreciate great works freely.
              </p>
            </section>
            <a
              href="https://www.clevelandart.org/"
              target="_blank"
              className="mx-auto w-fit py-2 px-4 flex justify-center items-center gap-1 bg-gray-600 text-white rounded-lg hover:bg-gray-200 hover:text-black"
            >
              <p>Visit their Website</p>
              <FaExternalLinkAlt />
            </a>
          </article>
        </div>
      </div>
    );
  } else {
    notFound();
  }
};

export default apiSource;
