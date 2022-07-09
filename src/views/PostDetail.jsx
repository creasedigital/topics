import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";

const PostDetail = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const navigate = useNavigate();

	const getPost = () =>
		axios
			.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((res) => setPost(res.data))
			.catch((e) => console.log(e));

	//   useEffect(async () => {
	//     await makeApiCall();
	//   }, []);

	useEffect(() => {
		async function fetchData() {
			await getPost();
		}
		fetchData();
	}, []);

	console.log(post);

	return (
		<Box pl={2}>
			<Button
				_hover={{
					backgroundColor: "tomato",
					color: "white",
					border: "none",
				}}
				borderRadius="100px"
				mt={4}
				px={4}
				onClick={() => navigate(-1)}
			>
				Return to previous page
			</Button>
			<Box mt={4} pl={4}>
				{post ? (
					<Box>
						<Heading mb={2}>{post.title}</Heading>
						<Box color="gray">{post.body}</Box>
					</Box>
				) : (
					<Spinner color="red.500" />
				)}
			</Box>
		</Box>
	);
};

export default PostDetail;
