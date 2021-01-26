import React from 'react'
import Button from '@material-ui/core/Button';

const PraymaryButton = (props) =>{
    return (
        <Button
             variant="outlined"
             color="secondary"
             type={'submit'}
        >
        {props.label}
      </Button>
    )
}

export default PraymaryButton