import React, {Component} from 'react'
import './users.css'


let axios = require('axios');


class Calculator extends Component{

    constructor(props) {
        super(props);

        this.state = {

            value:'',
            from:'USD',
            to:'USD',
            result: 0

        };
        this.handleSubmitCalculator = this.handleSubmitCalculator.bind(this);
        this.handleChangeCalculator = this.handleChangeCalculator.bind(this);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleChangeResult = this.handleChangeResult.bind(this);
    }

    handleSubmitCalculator(event){
        console.log(this.state);
        axios.get(`http://api.fixer.io/latest?base=${this.state.from}`)
            .then((response) => {
                let result;
                if (this.state.from === this.state.to) {
                    result = this.state.value;
                } else {
                    let to = this.state.to;
                    let koef = response.data.rates;
                    /*console.log(response);
                    console.log(to);
                    console.log(koef[to]);*/
                    result = parseInt(this.state.value, 10) * koef[to];
                }

                document.getElementById('result').textContent = result;

            });
        event.preventDefault()

    }

    handleChangeResult(event){

        this.setState({result:event.target.value})

    }

    handleChangeCalculator(event){

        this.setState({value:event.target.value})

    }

    handleChangeFrom(event){

        this.setState({from:event.target.value})

    }

    handleChangeTo(event){

        this.setState({to:event.target.value})

    }


    render(){

        return (
            <form>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label >From:</label>
                            <select onChange={this.handleChangeFrom} value={this.state.from} className="form-control">
                                <option>USD</option>
                                <option>EUR</option>
                                <option>RUB</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label >To:</label>
                            <select onChange={this.handleChangeTo} value={this.state.to} className="form-control">
                                <option>USD</option>
                                <option>EUR</option>
                                <option>RUB</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Enter value"
                    value={this.state.value} onChange={this.handleChangeCalculator}/>
                </div>
                <div className="form-group">
                    <button onClick={this.handleSubmitCalculator} type="button" className="btn btn-info">Calculate</button>
                </div>
                <div className="form-group">
                    <div  className="help-block">Result:</div>
                    <div  className="help-block" ><p id="result">0</p></div>
                </div>
            </form>
        )

    }

}


export default Calculator;
/*



<form>
<div class="row">
    <div class="col-sm-6">
    <div class="form-group">
    <label for="from_currency">From:</label>
<select class="form-control">
    <option>USD</option>
    <option>EUR</option>
    <option>RUB</option>
    </select>
</div>
</div>
<div class="col-sm-6">
    <div class="form-group">
        <label for="from_currency">To:</label>
        <select class="form-control">
        <option>USD</option>
        <option>EUR</option>
        <option>RUB</option>
    </select>
</div>
</div>
</div>
<div class="form-group">
    <input type="text" class="form-control" placeholder="Enter value">
</div>
<div class="form-group">
    <button type="button" class="btn btn-info">Calculate</button>
</div>
<div class="form-group">
    <div class="help-block">Result:</div>
    <div class="help-block"></div>
</div>
</form>-->*/
