import React from 'react'
import styled from 'styled-components'
import FormSelect from 'components/atoms/FormSelect'

const FormSelectGender = ({name = 'gender'}) => {

  const Root = styled.div`
    margin-top: 20px;
  `
  const Title = styled.label`
    margin-right: 5px;
  `

  return (
    <Root>
      <Title>性別：</Title>
      <span>
        <FormSelect name={name} >
          <option value='male'>男性</option>
          <option value='female'>女性</option>
        </FormSelect>
      </span>
    </Root>
  )
}

export default FormSelectGender