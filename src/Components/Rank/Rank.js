import React from "react";

class Rank extends React.Component {
    constructor() {
        super();
        this.state= {
            emoji: ""
        }
    }

    componentDidMount(){
        this.generateEmoji(this.props.entries)
    };

    componentDidUpdate(prevProps, prevState){
        if (prevProps.entries===this.props.entries && prevProps.name === this.props.name){
            return null
        }
        this.generateEmoji(this.props.entries);
    };

    generateEmoji=(entries)=> {
        fetch(`https://uld377grjb.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`)
            .then(res=>res.json())
            .then(data=>this.setState({emoji: data.input}))
            .catch(console.log);
    };

    render(){
        return(
            <div>
                <div className="white f3 center tc">
                    {`${this.props.name}, your entry count is...`}
                </div>
                <div className="white f1 center tc">
                    {this.props.entries}
                </div>
                <div className="white f3 center tc">
                    {`Rank Badge: ${this.state.emoji}`}
                </div>
            </div>
        );
    };
};

export default Rank;