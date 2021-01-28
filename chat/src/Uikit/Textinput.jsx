import React from 'react'
import TextField from '@material-ui/core/TextField';

const TextInput = (props) =>{
   
    return (
        <TextField 
            variant={props.variant}
            margin={'dense'}
            label={props.label}
            fullWidth={props.fullWidth}
            required={props.required}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            color='secondary'
        />
    )
}

export default TextInput