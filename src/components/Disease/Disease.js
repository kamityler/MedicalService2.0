import { Component } from "react";


class Disease extends Component{


    render(){
        return(                    
            <div className="disease-block">
                <div className="disease-upper-block">
                    <p className="card-field">Взятий на облік <span className='card-data'>22.08.2021</span></p>
                    <p className="card-field">Причина <span className='card-data'>Ковід</span></p>
                </div>
                <div className="disease-lower-block">
                    <p className="card-field">Знятий з обліку <span className='card-data'>18.09.2021</span></p>
                    <p className="card-field">Причина <span className='card-data'>Вілікуваний</span></p>
                </div>
            </div>
        )
    }
}

export default Disease

