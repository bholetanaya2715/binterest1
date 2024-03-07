/* 
author:Tanaya Bhole
cwid:20007357
*/
import { useMutation } from '@apollo/client';
import queries from '../queries';

function CreatePost() {
	let url;
	let description;
	let posterName;
	let [uploadImage] = useMutation(queries.uploadImage);
	return (
		<div>
			<div className="page-header">Create your Post</div>
			<div>
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
						alert('Post Successfully uploaded');
					}}
				>
					<input
						ref={(node) => (url = node)}
						type="text"
						name="url"
						required
						placeholder="Enter URL"
					/>
					<br />
					<input
						ref={(node) => (description = node)}
						type="text"
						name="description"
						placeholder="Enter Description of post"
					/>
					<br />
					<input
						ref={(node) => (posterName = node)}
						type="text"
						name="poster_name"
						placeholder="Enter your Poster Name"
					/>
					<br />
					<input type="submit" className="button" />
				</form>
			</div>
		</div>
	);
}

export default CreatePost;
