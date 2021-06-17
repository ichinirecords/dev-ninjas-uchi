import React from "react";
import SelectCountry from "./SelectCountry";
import Switch from "./Switch";

const AppHeader = () => {
	return (
		<header>
			<div
				className="header_bg"
				style={{
					position: "absolute",
					top: "0",
					bottom: "0",
					right: "0",
					left: "0",
					width: "100 %",
					height: "100 %",
					backgroundImage: "linear-gradient(white, white)",
					transform: "skewY(-7deg)",
					transformOrigin: "top left",
				}}
			>
				<div className="header-contents">
					<div className="page-title">
						<h1>UCHI</h1>
					</div>
					<div className="search-select">
						<div key="input-form" className="search-input-wrapper">
							<i className="fas fa-search"></i>
							<input
								key="search-input "
								type="text"
								className="search-bar"
								placeholder="Search ..."
								// value={searchInput}
								// onChange={handleSearchInput}
							/>
						</div>
						<SelectCountry />
					</div>
					<div className="grid-empty-space"></div>
					<Switch />
				</div>
			</div>
		</header>
	);
 
};

export default AppHeader;