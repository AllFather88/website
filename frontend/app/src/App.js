import React, { createContext } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import Register from "./pages/registration/reg.js";
import Auth from "./pages/authentication/auth.js";
import Main from "./pages/mainPage/main.js";
import NotFound from "./pages/notFound/notfound.js";
import Lot from "./pages/mainPage/modules/lot.js";

export const userContext = createContext([])

export const App = () =>{ 
	
	const [user,setUser ] = useState(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {saved:[]});
	return(
  	<BrowserRouter forceRefresh={true}>
		<main>
			<userContext.Provider value={[user,setUser]}>
			<Routes>
				<Route path="/*" element={<NotFound/>}/>
        		<Route path="/reg" element={<Register />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/" element={<Main/>}/>
				<Route path="/lot/:data" element={<Lot/>}/>		
      		</Routes>
			</userContext.Provider>
			
		</main>
  </BrowserRouter>
)};

export default App;
