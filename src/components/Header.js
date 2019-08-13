import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Header() {
    return (
         <header className="app-header">
            <nav>
                <ul>
                    <li>
                        <h1>
                            <Link to="/">FoodieNest</Link>
                        </h1>
                    </li>
                    <li>
                        <Link to="/restaurant">Restaurant</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default Header;