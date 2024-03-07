/* 
author:Tanaya Bhole
cwid:20007357
*/
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navi from './Components/Navi';
import MyHome from './Components/MyHome';
import Binterest from './Components/Binterest';
import Posts from './Components/Post';
import CreatePost from './Components/CreatePost';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:4000',
	}),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<header className="App-header">
					<Navi />
				</header>
				<div className="App">
					<Routes>
						<Route exact path="/" element={<MyHome />} />
						<Route exact path="/my-bin" element={<Binterest />} />
						<Route exact path="/my-posts" element={<Posts />} />
						<Route exact path="/new-post" element={<CreatePost />} />
					</Routes>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
