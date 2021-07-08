import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const HomeTab = ({ setView, showIntro, setShowIntro, hideIntro, setHideIntro}) => {

	const changeSelection = (value) => (e) => {
		setView(value);
    setShowIntro(false);
    setTimeout(function () {
      setHideIntro(true)
    }, 2000);
    e.target.parentElement.childNodes.forEach((element, index) => {
      if (index !== 1) {
        element.className = "tab-button";
      };
    });
    e.target.className = "tab-button active";
	}

  const handleClose = () => {
    setShowIntro(false)
    setTimeout(function () {
      setHideIntro(true)
    }, 2000);
  }

	return (
    <div className="tab-container">
      <button
        className="tab-button active"
        onClick={changeSelection("map")}
        style={{
          backgroundColor: '#4f3e7f',
          color: "antiquewhite",
          fontWeight: "normal",
          border: "3px solid #a8546c",
          boxSizing: "border-box",
          borderRadius: "7px",
          fontFamily: "EB Garamond",
          padding: "0.5em 1.75em",
		      cursor: "pointer",
          whiteSpace: "nowrap"
        }}
      >
        MAP VIEW
      </button>
      <div className={(showIntro ? "intro" : "animate") && (hideIntro ? "d-none" : "intro-wrapper")}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ float: 'right', color: '#a8546c', top: '0' }}
        >
          <CloseIcon />
        </IconButton>
        <h2 className={showIntro ? "intro" : "animate"}>
          <span className='larger-text'>UCHI</span> &nbsp;is sed tellus nisl. Aenean tincidunt convallis sagittis. Vivamus at varius ipsum. Cras venenatis at sapien vitae imperdiet. Aenean facilisis hendrerit gravida. Nam dictum nulla eu purus porta luctus at eget sapien. Sed tincidunt non nulla in viverra.  Etiam tristique nisl eget hendrerit tincidunt. Nulla dapibus, urna sit amet tempor pellentesque, turpis neque molestie felis, sed auctor metus nunc ut risus.
        </h2>
      </div>
      <button
        className="tab-button"
        onClick={changeSelection("listing")}
        style={{
          backgroundColor: '#4f3e7f',
          color: "antiquewhite",
          fontWeight: "normal",
          border: "3px solid #a8546c",
          boxSizing: "border-box",
          borderRadius: "7px",
          fontFamily: "EB Garamond",
          padding: "0.5em 1.75em",
		      cursor: "pointer",
          whiteSpace: "nowrap"
        }}
      >
        LIST VIEW
      </button>
    </div>
  );
}

export default HomeTab;