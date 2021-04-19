import React, { useState } from "react";

function Input(){

    const [state, setState] = useState({
        value : "",
        isValid : true,
        isLoading : false,
        median : []
    });
    
    function handleChange(e){
        let value = e.target.value || "";
        let isValid = true;
        let regex = /^\d+$/;
        
        if (!regex.test(value)){
            isValid = false;
        }

        setState({
            ...state,
            value , isValid
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setState({
            ...state,
            isLoading : true
        })
        fetch("http://localhost:4000/primeNumbers/",{
            "method" : "post",
            "headers" : {
                'Content-Type' : "application/json",
            },
            "body" : JSON.stringify({
                max : parseInt(state.value)
            })
        })
        .then(res => res.json())
        .then(result => {
            setState({
                ...state,
                isLoading : false,
                median : result.median
            })
            ;
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="value">Enter Number</label>
                    <input className="form-control" id="value" aria-describedby="help" placeholder='Enter value' type="text" value={state.value} onChange={handleChange} />
                    <small hidden={!state.isValid || state.value > 2} className="form-text text-muted">Value must be greater than 2</small>
                    <small id="help" hidden={state.isValid} className="form-text text-muted">Please enter digits</small>
                </div>
                <div className="form-group row">
                    <button type="submit"  disabled={!state.isValid}>Submit</button>
                </div>
            </form>
            <div hidden={!state.isLoading} className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div hidden={state.median.length===0}>{state.median.join(', ')}</div>
        </>
    )
}

export default Input