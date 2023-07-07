import { Form } from "formik";
import { styled } from "styled-components";
import { flexContainer } from 'src/styles/mixins';

const StyledForm = styled(Form)`
    grid-area: form;
    ${flexContainer('flex-start','center','column')}
    gap: 2rem;
    min-width: 0;
`

export default StyledForm;