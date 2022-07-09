import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { List, ListItem, Box, Button, Text, Center } from "@chakra-ui/react";

const Posts = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const pageFromQuery = searchParams.get("page");

	const getPageNoFromQueryString = () =>
		pageFromQuery === null ? 1 : parseInt(pageFromQuery, 10);

	const [currentPage, setCurrentPage] = useState(getPageNoFromQueryString);
	const [posts, setPosts] = useState([]);

	const makeApiCall = () =>
		axios
			.get(
				`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=7`,
			)
			.then((res) => setPosts(res.data))
			.catch((e) => console.log(e));

	//   useEffect(async () => {
	//     await makeApiCall();
	//   }, []);

	useEffect(() => {
		async function fetchData() {
			await makeApiCall();
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const doNext = () => {
		setCurrentPage(currentPage + 1);
		navigate(`${location.pathname}?page=${currentPage + 1}`);
	};
	const doPrevious = () => {
		setCurrentPage(currentPage - 1);
		navigate(`${location.pathname}?page=${currentPage - 1}`);
	};
	return (
		<Box minHeight={"calc(100vh - 8rem)"} overflowX={"hidden"}>
			<List cursor="pointer" pl={8}>
				{posts.map((item) => (
					<ListItem
						key={item.id}
						pt={4}
						textTransform="capitalize"
						fontSize="1.5rem"
					>
						<Text
							_hover={{ fontWeight: "bold" }}
							onClick={() => navigate(`/posts/${item.id}`)}
						>
							{item.title}
						</Text>
					</ListItem>
				))}
			</List>
			<Center position="absolute" bottom={"20px"} w="full">
				<Button
					mr={2}
					_hover={{
						backgroundColor: "tomato",
						color: "white",
						border: "none",
					}}
					borderRadius="100px"
					px={4}
					disabled={currentPage < 2}
					onClick={doPrevious}
				>
					Previous
				</Button>
				<Button
					bg="red"
					color="white"
					mr={2}
					_hover={{
						backgroundColor: "tomato",
						color: "white",
						border: "none",
					}}
					borderRadius="100px"
					px={4}
				>
					{currentPage}
				</Button>
				<Button
					_hover={{
						backgroundColor: "tomato",
						color: "white",
						border: "none",
					}}
					borderRadius="100px"
					px={4}
					disabled={currentPage >= 15}
					onClick={doNext}
				>
					Next
				</Button>
			</Center>
		</Box>
	);
};

export default Posts;
