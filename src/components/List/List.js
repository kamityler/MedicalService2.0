import {Component} from 'react'

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: props.list
        }
    }

    render(){
        return(
            <div>
                {this.state.list}
            </div>
        )
    }
}

export default List;