/* 
My post
author:Tanaya Bhole
cwid:20007357
*/
import queries from '../queries';
import PostLink from './PostLink';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import NewPostAdd from './NewPostAdd';

function Posts() {
	const [showAddModal, setShowAddModal] = useState(false);
	const { loading, error, data } = useQuery(queries.userPostedImages, {
		fetchPolicy: 'cache-and-network',
	});
	if (data) {
		const { userPostedImages } = data;
		return (
			<div>
				<div className="page-header">My Posts</div>
				<button onClick={() => setShowAddModal(true)} className="new-post">
					Create New Post
				</button>
				<div className="post-card-holder">
					<PostLink datapost={userPostedImages} userpost={true} />
				</div>
				{showAddModal && <NewPostAdd isOpen={showAddModal} handleClose={setShowAddModal} />}
			</div>
		);
	} else if (loading) {
		return <div>Loading...hold your horses</div>;
	} else if (error) {
		return <div>{error.message}</div>;
	}
}

export default Posts;
