import { Component } from 'react';

class SearchPannel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render(){
        // className="form-control search-input"
        return(
            <input type="text" className = 'search-bar' placeholder='Enter name' value={this.state.term} onChange={this.onUpdateSearch}/>
        )
    }
}

export default SearchPannel;