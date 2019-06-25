import React from 'react';
import { Link } from "react-router-dom";

export default function header() {
    return (
        <header>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/items'>Items</Link>
                </li>
            </ul>
        </header>
    );
}