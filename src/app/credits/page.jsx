const Credits = () => {
  return (
    <div className="bg-white border-y">
      <div className="w-11/12 md:w-1/2 mx-auto pt-8">
        <h1 className="text-center font-serif text-3xl">
          Credits & Attributions
        </h1>
        <article className="mt-4 pb-8">
          <p>
            Our website makes use of publicly available museum data and images to
            provide users with an enriching experience of artwork collections.
            Below are the attributions and credits for the resources used:
          </p>
          <br />
          <section>
            <h2 className="font-serif text-xl">Museum Data & APIs</h2>
            <br />
            <h3 className="font-serif text-lg">The Cleveland Museum of Art</h3>
            <br />
            <p>
              This website uses the <a
                href="https://openaccess-api.clevelandart.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >Cleveland Museum of Art Open Access API</a> to
              provide information about artworks from the museum's collection. The
              API is provided under a{" "}
              <a
                href="https://creativecommons.org/publicdomain/zero/1.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                CC0 1.0 Universal (Public Domain Dedication)
              </a>{" "}
              license, meaning no attribution is legally required. However, we
              acknowledge and appreciate the museum's efforts in making this data
              freely accessible.
            </p>
            <br />
            <h3 className="font-serif text-lg">The Art Institute of Chicago</h3>
            <br />
            <p>
              Artwork data and images are sourced from the{" "}
              <a
                href="https://api.artic.edu/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                Art Institute of Chicago API
              </a>
              . Many images and metadata are provided under a{" "}
              <a
                href="https://creativecommons.org/publicdomain/zero/1.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                CC0 1.0 Universal (Public Domain Dedication)
              </a>{" "}
              license, though certain images may have restrictions. Users should
              verify specific usage rights on the Art Institute's website before
              reuse.
            </p>
          </section>
          <br />
          <section>
            <h2 className="font-serif text-xl">Images from Wikimedia Commons</h2>
            <br />
            <p>
              Some museum images used on this website are sourced from{" "}
              <a
                href="https://commons.wikimedia.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-400"
              >
                Wikimedia Commons
              </a>
              , a free media repository. Each image is subject to its own license,
              which may include Creative Commons or Public Domain terms. Proper
              attribution is given where required, linking back to the original
              image source.
            </p>
          </section>
          <br />
          <p>
            If you believe any attribution is missing or incorrect, please contact
            us, and we will promptly address the issue.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Credits;
