import React, { Component } from "react";



function Use_props(props) { // 사용자정의 컴포넌트는 항상 시작 대문자로 되야함

    const style = {
        color: "#ffffff"
    }
    
    return (
        <div style={style}>
            <p>my name: {props.name}</p>
            <p>my age: {props.age}</p>
            <p>my address: {props.address}</p>
        </div>
    );
}

class Learning extends Component {

    render() {

        return (
            <Use_props  name="박준영" age="25" address="서울시 노원구"/>
        );
    }
}

export default Learning ;
//마지막 줄에 export를 해주어야 외부 파일에서 컴포넌트를 불러서 사용할 수 있습니다