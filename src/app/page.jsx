import { FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <div className="bg-[url(https://upload.wikimedia.org/wikipedia/commons/d/d9/Whitney_Western_Art_Museum.jpg)] bg-cover bg-center">
        <div className="bg-white/80">
          <div className="mx-auto h-[calc(100vh-7rem)] w-2/3 flex items-center">
            <section className="my-auto">
              <h1 className="text-5xl font-serif">Exhibition Curator</h1>
              <h2 className="my-4 text-3xl font-serif">
                Create and Curate Stunning Exhibitions
              </h2>
              <p className="text-xl">
                Explore a vast collection of nearly 200,000 artworks from the{" "}
                <span className="font-bold">Art Institute of Chicago</span> and
                the <span className="font-bold">Cleveland Museum of Art</span>. Discover paintings, sculptures, and
                other masterpieces, and curate your own personalised exhibition.
                Unleash your creativity and bring art to life in a way that's
                uniquely yours.
              </p>
            </section>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-6rem)] mx-auto w-2/3">
        <h2 className="my-8 text-center text-3xl font-serif">
          Artwork Sources
        </h2>
        <div className="my-10 flex justify-around">
          <div className="w-2/5 bg-white text-center rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/20070622_Art_Institute_of_Chicago_Front_View.JPG"
              alt="Art Institute of Chicago"
              className="w-full h-48 object-cover rounded-t-3xl"
            />
            <section className="m-4">
              <h3 className="font-serif text-xl">Art Institute of Chicago</h3>
              <p>
                A world-renowned museum with an extensive collection spanning
                centuries. From Impressionist masterpieces to ancient artifacts,
                the Art Institute of Chicago offers a rich and diverse selection
                of artworks.
              </p>
            </section>
            <a
              href="https://www.artic.edu/"
              target="_blank"
              className="m-4 py-2 flex justify-center items-center gap-2 bg-gray-600 text-white rounded-lg hover:bg-gray-200 hover:text-black"
            >
              <p>Visit the Art Institute of Chicago Website</p>
              <FaExternalLinkAlt />
            </a>
          </div>
          <div className="w-2/5 bg-white text-center rounded-3xl shadow-lg transition duration-100 ease-in-out hover:-translate-y-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/52/Cleveland_Museum_of_Art.jpg"
              alt="Cleveland Museum of Art"
              className="w-full h-48 object-cover rounded-t-3xl"
            />
            <section className="m-4">
              <h3 className="font-serif text-xl">Cleveland Museum of Art</h3>
              <p>
                Known for its globally significant collection, the Cleveland
                Museum of Art showcases masterpieces from a wide range of
                cultures and time periods. Its open-access collection allows art
                lovers to explore and appreciate great works freely.
              </p>
            </section>
            <a
              href="https://www.clevelandart.org/"
              target="_blank"
              className="m-4 py-2 flex justify-center items-center gap-2 bg-gray-600 text-white rounded-lg hover:bg-gray-200 hover:text-black"
            >
              <p>Visit the Cleveland Museum of Art Website</p>
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
