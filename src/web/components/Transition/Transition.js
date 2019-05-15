import React from "react"
import EnhanceTransition from "./EnhanceTransition"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
//var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm

const Transition = props => {
    const items = props.items.map((item, i) => (
        <div key={item} onClick={() => props.handleRemove(i)}>
            {item}
        </div>
    ));

    return (
        <div>
            <button onClick={props.handleAdd}>Add Item</button>
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                {items}
            </ReactCSSTransitionGroup>
        </div>
    );
};

export default EnhanceTransition()(Transition);
