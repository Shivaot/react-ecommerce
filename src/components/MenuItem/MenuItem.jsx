import React from 'react';
import { withRouter } from 'react-router-dom';

import './MenuItem.styles.scss';

const MenuItem = (props) => {
    const { linkUrl , match } = props;
    return (
        <div className={`${props.size} menu-item`} onClick={() => props.history.push(`${match.url}${linkUrl}`)}>
            <div style={{ backgroundImage: `url(${props.imageUrl})` }} className="background-image" />
            <div className="content">
                <h1 className="title">{props.title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem);
