import React from 'react';
import { Link } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(3),
        background: '#ffff'
    },
    heading: {
        fontFamily: '"Overpass", sans-serif',
        fontSize: '36px'
    },
    link: {
        color: '#000000'
    }
}));

function Header() {
    const classes = useStyles();

    return (
         <header className={classes.header}>
            <nav>
                <Typography color="textPrimary" className={classes.heading} variant="h1">
                    <Link className={classes.link} to="/">FoodieNest</Link>
                </Typography>
            </nav>
        </header>
    )
}


export default Header;