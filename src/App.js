import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import Posts from "./views/Posts";
import PostDetail from "./views/PostDetail";
import { Box, Flex, Heading } from "@chakra-ui/react";

function App() {
	return (
		<Box minHeight={"100vh"} overflowX={"hidden"}>
			<Box as="nav" bg="red" p={4}>
				<Flex justifyContent="center" alignItems="center">
					<Heading as="h1" color="white" fontSize="4rem">
						<a href="/">TOPICS</a>
					</Heading>
				</Flex>
			</Box>
			<Box overflowX={"hidden"} w="full">
				<Router>
					<Routes>
						<Route path="/posts/:id" element={<PostDetail />} />
						<Route path="/" element={<Posts />} />
					</Routes>
				</Router>
			</Box>
		</Box>
	);
}

export default App;
