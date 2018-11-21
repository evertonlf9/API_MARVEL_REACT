import React, {Component} from 'react';

class Search extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {typeInput, typeButon,  disabled, value, handleChange, handleClick, placeholder, classContainer, classInput, classButton, classIcon} = this.props;

        return (
            <div className={classContainer}>
                <input type={typeInput || 'text'} className={classInput} placeholder={placeholder} onChange={handleChange} value={value} disabled={disabled}/>
                <button type={typeButon ||'button'} className={classButton} onClick={handleClick} disabled={disabled}>
                    {classIcon && <i className={classIcon}></i>}
                </button>
            </div>
        )
    }
}

export  default Search;