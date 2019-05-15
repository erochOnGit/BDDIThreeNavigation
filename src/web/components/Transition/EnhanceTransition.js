import React from "react";
import {compose, withHandlers, withState} from "recompose";
import Home from "src/web/components/Home/Home";
import One from "src/web/components/InteractionOne/One";

const EnhanceTransition = () =>
    compose(
        withState("items", "setItems", [<Home />]),
        withHandlers({
            handleAdd: props => event => {
                const newItems = props.items.concat([
                  prompt('Enter some text')
                ]);
                props.setItems(newItems);
            },
            handleRemove: props => i => {
                let newItems = props.items.slice();
                newItems.splice(i, 1);
                newItems.push(<One/>)
                props.setItems(newItems);
            }
        }),
    );

export default EnhanceTransition;
