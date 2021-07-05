const HomeTab = ({setView}) => {

	const changeSelection = (value) => (e) => {
		setView(value)
		e.target.parentElement.childNodes.forEach(element => {
			element.className = "tab-button";
		});
		e.target.className = "tab-button active";
	}

	return (
    <div className="tab-container">
      <button
        className="tab-button active"
        onClick={changeSelection("map")}
        style={{
          // backgroundColor: "#1c555c",
          backgroundColor: '#4f3e7f',
          color: "antiquewhite",
          fontWeight: "normal",
          border: "3px solid #a8546c",
          boxSizing: "border-box",
          borderRadius: "7px",
          fontFamily: "EB Garamond",
          padding: "0.5em 1.75em",
		  cursor: "pointer"
        }}
      >
        MAP VIEW
      </button>
      <button
        className="tab-button"
        onClick={changeSelection("listing")}
        style={{
          // backgroundColor: "#1c555c",
          backgroundColor: '#4f3e7f',
          color: "antiquewhite",
          fontWeight: "normal",
          border: "3px solid #a8546c",
          boxSizing: "border-box",
          borderRadius: "7px",
          fontFamily: "EB Garamond",
          padding: "0.5em 1.75em",
		  cursor: "pointer"
        }}
      >
        LIST VIEW
      </button>
    </div>
  );
}

export default HomeTab;