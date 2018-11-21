import React, {Component} from 'react';

class Select extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {name, options, disabled, value, handleChange, label, classLabel, classSpan, classSelect} = this.props;

        return (
            <span className={classSpan}>
                <label className={classLabel}>{label}</label>
                <select name={name} className={classSelect}  onChange={handleChange} value={value} disabled={disabled}>
                    {
                        options.map((key)=> <option key={key.value} value={key.value}>{key.label}</option>)
                    }
                </select>
            </span>
        )
    }
}

export  default Select;