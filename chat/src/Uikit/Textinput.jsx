import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({

     root: {
        '& label.Mui-focused': {
            color: '#CCFF66',
            backgroundColor:'rgba( 255, 255, 255, 0)'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#CCFF66',
            },
        }
     },
     input: {
        backgroundColor:'rgba( 255, 255, 255, 0.55)',
     }


}))
const TextInput = (props) =>{
   const classes = useStyles()    
    return (
        <TextField  className={classes.root}
            InputProps={{className:classes.input}}
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