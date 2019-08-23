import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinkIcon from '@material-ui/icons/Link';
import MenuIcon from '@material-ui/icons/RestaurantMenu';
import ImageIcon from '@material-ui/icons/Image';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
        borderRadius: '44px',
        height: '44px',
        border: '1px solid #dadce0',
        margin: '6px 10px',
        padding: '10px',
        width: '44px'
    }
}));

function Icons(props) {
    const classes = useStyles();

    return (
        <>
            <Tooltip title="Save">
                <IconButton 
                    target="_blank"
                    rel="noopener"
                    aria-label="add to favorites"
                    className={classes.icon}>
                        <FavoriteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Visit website">
                <IconButton 
                    href={props.url} 
                    target="_blank"
                    rel="noopener"
                    aria-label="visit restaurant website"
                    className={classes.icon}>
                    <LinkIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Open menu">
                <IconButton 
                    href={props.menu} 
                    target="_blank"
                    rel="noopener"
                    aria-label='open menu'
                    className={classes.icon}>
                        <MenuIcon />
                    </IconButton>
            </Tooltip>
            <Tooltip title="View photos">
                <IconButton 
                    href={props.photos} 
                    target="_blank"
                    rel="noopener"
                    aria-label='view photos'
                    className={classes.icon}>
                        <ImageIcon />
                    </IconButton>
            </Tooltip>
            <Tooltip title="Share">
                <IconButton 
                    href="#" 
                    target="_blank"
                    rel="noopener"
                    aria-label='share restaurant details'
                    className={classes.icon}>
                        <ShareIcon />
                    </IconButton>
            </Tooltip>
        </>
    )
}

export default Icons;