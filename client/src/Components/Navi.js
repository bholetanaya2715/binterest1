/* 
author:Tanaya Bhole
cwid:20007357
*/

import { Link } from 'react-router-dom';

function Navi() {
	return (
		<nav className="navigation">
			<Link to="/">
				<span className="MyApp-link">My Home</span>
			</Link>
			<Link to="/my-bin">
				<span className="MyApp-link">My bin</span>
			</Link>
			<Link to="/my-posts">
				<span className="MyApp-link">My posts</span>
			</Link>
			<Link to="/new-post">
				<span className="MyApp-link">New posts</span>
			</Link>
		</nav>
	);
}

export default Navi;
