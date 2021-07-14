import React from "react";

class Square extends React.Component {

    // this.props.value  다른 컴포넌트 에서 받은 value값
    // this.state.value  Square의 value값
    render() { 
        return (     //props는 컴포넌트 끼리 값을 전달하는 수단이다.
            <button 
                className="square"  
                onClick={() => this.props.onClick()} 
            >
                {this.props.value}  
            </button>
        );
    }
}

// function Square(props) {
//     return (
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     );
// }

export default Square;