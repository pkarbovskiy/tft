import React from 'react';
import Home from './homePage';
import Items, { ItemsInGrid } from './itemsPage';
import Header from './header';
import { BrowserRouter as Router, Route } from "react-router-dom";


export default function Routing() {
    return (
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={Home} />
                <Route exact path="/items" component={Items} />
                <Route exact path="/itemsInGrid" component={ItemsInGrid} />
            </div>
        </Router>
    );
}
