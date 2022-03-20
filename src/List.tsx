import { useState } from "react";

const Item = (props: any) => {
    return <li>{props.data.name}</li>
}
const List = (props: { data: any[] }) => {

    const [showList, setShowList] = useState(false)
    const message = 'clicked';
    const handleClick = () => {
        console.log(message);
        setShowList(prev => !prev);
    }

    return (
        <>
            <button onClick={handleClick}>
                {showList ? "hide" : "show list"}</button>
            {showList &&
                <ul>
                    <h3>Fruits:</h3>
                    {props.data.map(item => (
                        <Item
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ul>}
        </>
    )
}

export default List;