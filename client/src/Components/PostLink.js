/* 
author:Tanaya Bhole
cwid:20007357
*/
import { useMutation } from '@apollo/client';
import queries from '../queries';

function PostLink(props) {
	const [updateImage] = useMutation(queries.updateImage, {
		update(cache, { data: { updateImage } }) {
			let binnedImages = [];
			if (cache.readQuery({ query: queries.binnedImages })) {
				binnedImages = cache.readQuery({ query: queries.binnedImages }).binnedImages;
			} else {
				binnedImages = [];
			}
			binnedImages = binnedImages?.filter((image) => {
				return image.id !== updateImage.id;
			});
			cache.writeQuery({
				query: queries.binnedImages,
				data: { binnedImages: binnedImages.concat([updateImage]) },
			});
		},
	});

	const [deleteImage] = useMutation(queries.deleteImage, {
		update(cache, { data: { deleteImage } }) {
			let userPostedImages = [];
			if (cache.readQuery({ query: queries.userPostedImages })) {
				userPostedImages = cache.readQuery({ query: queries.userPostedImages }).userPostedImages;
			} else {
				userPostedImages = [];
			}
			userPostedImages = userPostedImages?.filter((image) => {
				return image.id !== deleteImage.id;
			});
			cache.writeQuery({
				query: queries.userPostedImages,
				data: { userPostedImages: userPostedImages },
			});
		},
	});
	const images = props.datapost?.map((image) => {
		return (
			<div key={image.id} className="card">
				<img src={image.url} alt={image.posterName} width="auto" height="400px" />
				<div className="post-card-description">
					Description: {image.description ? image.description : 'No Description'}
				</div>
				<div className="post-card-poster">
					Poster: {image.posterName ? image.posterName : 'Unknown Poster'}
				</div>

				{props.userpost ? (
					<button
						className="post-card-button"
						onClick={() =>
							deleteImage({
								variables: {
									deleteImageId: image.id,
								},
							})
						}
					>
						Remove my Post
					</button>
				) : null}
				<br />
				{image.binned ? (
					<button
						className="post-post-card-button"
						onClick={() => {
							updateImage({
								variables: {
									updateImageId: image.id,
									url: image.url,
									posterName: image.posterName,
									description: image.description,
									userPosted: image.userPosted,
									binned: false,
								},
							});
						}}
					>
						Remove from your bin
					</button>
				) : (
					<button
						className="post-post-card-button"
						onClick={() => {
							updateImage({
								variables: {
									updateImageId: image.id,
									url: image.url,
									posterName: image.posterName,
									description: image.description,
									userPosted: image.userPosted,
									binned: true,
								},
							});
						}}
					>
						Add to your bin
					</button>
				)}
			</div>
		);
	});
	return images;
}

export default PostLink;
