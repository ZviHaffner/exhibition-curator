const ApiSelector = ({ setSelectedApi, setArtworks }) => {
  function handleChange(e) {
    setArtworks({});
    setSelectedApi(e.target.value);
  }
  
  return (
    <div className="text-center m-5">
      <h2 className="text-lg">Please Select a Source to Search From</h2>
      <form>
        <label className="m-1" htmlFor="chicago">
          Art Institute of Chicago
        </label>
        <input
          type="radio"
          id="chicago"
          name="apiSource"
          value="artInstChicago"
          onChange={handleChange}
        />
        <label className="m-1" htmlFor="cleveland">
          The Cleveland Museum of Art
        </label>
        <input
          type="radio"
          id="cleveland"
          name="apiSource"
          value="clevelandMuseumArt"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default ApiSelector;
