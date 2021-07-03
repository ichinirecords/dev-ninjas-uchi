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
      <button className="tab-button active" onClick={changeSelection("map")}>
        Map view
      </button>
      <button className="tab-button" onClick={changeSelection("listing")}>
        List view
      </button>
    </div>
  );
}

export default HomeTab;