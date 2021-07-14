import React from "react";

import Square from './Square';


class Board extends React.Component {

    renderSquare(i) {
        return <Square 
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />; // Game에서 받은 handleclick함수를 받아 또 그 함수를 넘겨준다.
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
