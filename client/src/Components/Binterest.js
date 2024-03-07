/* 
author:Tanaya Bhole
cwid:20007357
*/
import queries from '../queries';
import PostLink from './PostLink';
import { useQuery } from '@apollo/client';

function MyBin() {
	const { loading, error, data } = useQuery(queries.binnedImages, {
		fetchPolicy: 'cache-and-network',
	});
	if (data) {
		const { binnedImages } = data;
		return (
			<div>
				<div className="page-header">My Bin</div>
				<div className="post-card-holder">
					<PostLink datapost={binnedImages} userpost={false} />
				</div>
			</div>
		);
	} else if (loading) {
		return <div>Loading...hold your horses</div>;
	} else if (error) {
		return <div>{error.message}</div>;
	}
}

export default MyBin;
