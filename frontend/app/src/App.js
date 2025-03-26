import React from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Register from "./pages/registration/reg.js";
import Auth from "./pages/authentication/auth.js";
import Main from "./pages/mainPage/main.js";
import NotFound from "./pages/notFound/notfound.js";

export const App = () => (
  	<BrowserRouter forceRefresh={true}>
		<main>
			<Routes>
        		<Route path="/reg" element={<Register />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/" element={<Main/>}/>
				<Route path="/*" element={<NotFound/>}/>
      		</Routes>

		</main>
  </BrowserRouter>
);

export default App;
