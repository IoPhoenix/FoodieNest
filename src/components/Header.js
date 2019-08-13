import React from 'react';
import { Link } from "react-router-dom";

function Header() {
    return (
         <header className="app-header">
            <nav>
                <h1>
                    <Link to="/">FoodieNest</Link>
                </h1>
            </nav>
        </header>
    )
}


export default Header;