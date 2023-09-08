import { BrowserRouter, Route } from 'react-router-dom';

import Books from './Books';
import Details from './bookDetails';
import Header from './Header';


function Router() {
    return (
        <BrowserRouter>
        <Header />
            <Route exact path="/" component={Books}></Route>
            <Route path="/details/:id" component={Details}></Route>
         
           
        </BrowserRouter>
    )
}

export default Router;