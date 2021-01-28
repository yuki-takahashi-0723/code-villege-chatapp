import React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components'

const ButtonCenter = styled.div`
  text-align:center;
`

const ClickButton = (props) =>{
    return (
      <ButtonCenter>
          <Button
             variant='contained'
              color='primary'
              onClick={props.onClick}
              
          >
          {props.label}
        </Button>
      </ButtonCenter>
    )
}

export default ClickButton