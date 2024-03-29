/* ADDModal
author:Tanaya Bhole
cwid:20007357*/
import { useState } from 'react';
import ReactModal from 'react-modal';
import queries from '../queries';
import { useMutation } from '@apollo/client';

ReactModal.setAppElement('#root');
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		border: '1px solid #28547a',
		borderRadius: '4px',
		textAlign: 'center',
	},
};

function NewPostAdd(props) {
	const [showAddModal, setShowAddModal] = useState(props.isOpen);
	let [uploadImage] = useMutation(queries.uploadImage, {
		update(cache, { data: { uploadImage } }) {
			let userPostedImages = [];
			if (cache.readQuery({ query: queries.userPostedImages })) {
				userPostedImages = cache.readQuery({ query: queries.userPostedImages }).userPostedImages;
			} else {
				userPostedImages = [];
			}
			cache.writeQuery({
				query: queries.userPostedImages,
				data: { userPostedImages: userPostedImages.concat([uploadImage]) },
			});
		},
	});
	const handleCloseAddModal = () => {
		setShowAddModal(true);
		props.handleClose(false);
	};
	let url;
	let description;
	let posterName;
	let body = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				uploadImage({
					variables: {
						url: url.value.toString(),
						description: description.value.toString(),
						posterName: posterName.value.toString(),
					},
				});
				url.value = '';
				description.value = '';
				posterName.value = '';
				handleCloseAddModal();
			}}
		>
			<input
				ref={(node) => (url = node)}
				type="text"
				name="url"
				placeholder="Enter URL for post"
				required
			/>
			<br />
			<input
				ref={(node) => (description = node)}
				type="text"
				name="description"
				placeholder="Enter  Description of post"
			/>
			<br />
			<input
				ref={(node) => (posterName = node)}
				type="text"
				name="poster_name"
				placeholder="Enter your Poster's Name"
			/>
			<br />
			<input className="button" type="submit" />
		</form>
	);

	return (
		<ReactModal name="addModal" isOpen={showAddModal} contentLabel="Add Modal" style={customStyles}>
			{body}
			<button className="cancel" onClick={handleCloseAddModal}>
				Cancel
			</button>
		</ReactModal>
	);
}

export default NewPostAdd;
