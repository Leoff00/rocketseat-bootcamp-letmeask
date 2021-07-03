import Home from "./pages/Home";
import NewRoom from "./pages/newRoom";
import Room from "./pages/Room";
import AdminRoom from "./pages/AdminRoom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { createContext } from "react";

type ThemeContextType = {
   mode: string;
};

export const ThemeContext = createContext({} as ThemeContextType);

function App() {
   return (
      <BrowserRouter>
         <ThemeContext.Provider value={{ mode: "dark" }}>
            <AuthContextProvider>
               <Switch>
                  <Route path="/" exact={true} component={Home}></Route>
                  <Route path="/rooms/new" component={NewRoom}></Route>
                  <Route path="/rooms/:id" component={Room}></Route>
                  <Route path="/admin/rooms/:id" component={AdminRoom}></Route>
               </Switch>
            </AuthContextProvider>
         </ThemeContext.Provider>
      </BrowserRouter>
   );
}

export default App;
