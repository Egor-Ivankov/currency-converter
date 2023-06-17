import Header from "../Header/Header";	
import SubHeader from "../SubHeader/SubHeader";
import './app.scss';

function App() {

	return (
		<div className="app">
			<div className="border">
				<Header/>
				<div className="container">
					<SubHeader/>
				</div>
			</div>
		</div>
	);
}

export default App;
