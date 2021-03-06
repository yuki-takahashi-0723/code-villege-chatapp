import React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const ButtonCenter = styled.div`
  text-align:center;
`

const PraymaryButton = (props) =>{
    return (
      <ButtonCenter>
          <Button
             variant='contained'
              color='secondary'
              type={props.type}
              
          >
          {props.label}
        </Button>
      </ButtonCenter>
    )
}

export default PraymaryButton