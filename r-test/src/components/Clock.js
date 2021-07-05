import React, { Component } from "react";

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    // Component를 생성할 때 state 값을 초기화하거나 메서드를 바인딩할 때 construcotr()를 사용

    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
        // setInterval은 첫번째 인자로 일정시간마다 수행될 함수를, 두번째 인자로 몇 밀리세컨드간격으로 수행할 건지를 지정하여 사용합니다.
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState(
            { date: new Date() }
        )
    }

    render() {
        return (
            <div>{this.state.date.toLocaleTimeString()}</div>
        );
    }
}

export default Clock ;
//마지막 줄에 export를 해주어야 외부 파일에서 컴포넌트를 불러서 사용할 수 있습니다