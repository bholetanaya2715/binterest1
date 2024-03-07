/* 
author:Tanaya Bhole
cwid:20007357
*/
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import queries from '../queries';
import PostLink from './PostLink';

function MyHome() {
	let [pageNumumber, setPageNum] = useState(1);
	let { loading, error, data } = useQuery(queries.unsplashImages, {
		variables: { pageNum: pageNumumber },
	});
	if (data) {
		const { unsplashImages } = data;
		return (
			<div>
				<div className="page-header">Binterest with Unsplash Images</div>
				<div className="post-card-holder">
					<PostLink datapost={unsplashImages} userpost={false} />
					<br />
					<button
						className="get-more-post"
						onClick={() => {
							setPageNum(pageNumumber + 1);
						}}
					>
						Load more binterest
					</button>
				</div>
			</div>
		);
	} else if (loading) {
		return <div>Loading...Please hold your horses</div>;
	} else if (error) {
		return <div>{error.message}</div>;
	}
}

export default MyHome;
