import { FC } from 'react'
import styled from 'styled-components'
import MapImage from 'src/assets/map.svg';
import { flexContainer } from 'src/styles/mixins';
import TagNamesContainer from '../TagNames/TagNamesContainer';
import Heading from '../Heading';
import ButtonIcon from '../Button/ButtonIcon';
import Paragraph from '../Paragraph.styled';
import { Form, Link } from 'react-router-dom';
import Button from '../Button/Button.styled';
import Logo, { StyledLogo } from '../Logo';
import { ErrorMessage, Field, Formik } from 'formik';
import { StyledInput } from '../Input/Input.styled';
import Container from 'src/layout/Container';
import { BREAKPOINTS } from 'src/styles/variables';

interface LoginFormValues {
	login: string;
	password: string;
}

const initialValues: LoginFormValues = {
	login: '',
	password: '',
};
  

const LoginForm : FC = () => {
	const handleSubmit = (values: LoginFormValues) => {
		// Handle form submission logic here
		console.log('Form values:', values);
	  };
	  
	return (
		<Container>
		<StyledLoginForm>
			<StyledFormAside>
				<Heading $alignCenter withAccent level={'h5'}>Nie posiadasz<br/> jeszcze konta?</Heading>
				<Paragraph>Chcesz w pełni korzystać z naszego serwisu? Zarejestruj się już teraz.</Paragraph>
				<Link to='/register'>
					<ButtonIcon btnType={'regular'} icon={'login'}>Zarejestruj się</ButtonIcon>
				</Link>
			</StyledFormAside>
			<StyledFormColumn>
				<Heading level='h4'>Zaloguj się na <Logo /></Heading>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validate={(values) => {
						const errors: Partial<LoginFormValues> = {};

						// Example validation rules
						if (!values.login) {
							errors.login = 'To pole jest wymagane';
						}

						if (!values.password) {
							errors.password = 'To pole jest wymagane';
						}

						return errors;
					}}
					>
					<Form>
						<FieldWrapper>
							<label htmlFor="login">E-mail:</label>
							<StyledInput as={Field} type="text" id="login" name="mail" placeholder="Podaj adres e-mail" />
							<ErrorMessage name="login" component="div" />
						</FieldWrapper>

						<FieldWrapper>
							<label htmlFor="password">Hasło:</label>
							<StyledInput as={Field} type="password" id="password" name="password" placeholder="Podaj swoje hasło" />
							<ErrorMessage name="password" component="div" />
						</FieldWrapper>

						<FieldWrapper>
							<ButtonIcon btnType={'outline'} icon={'login'}>Zaloguj się</ButtonIcon>
						</FieldWrapper>
					</Form>
				</Formik>
				<ButtonIcon btnType={'outline'} icon={'google'}>Zaloguj się za pomocą Google</ButtonIcon>
			</StyledFormColumn>
		</StyledLoginForm>
		</Container>
	)
}

const StyledLoginForm = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.5fr;
	max-width: 96rem;
	border-radius: 0.8rem;
	border: 1px solid var(--color-grey);
	margin: 6.4rem auto;

	@media only screen and (${BREAKPOINTS.phone}){
		grid-template-columns: 1fr;
		margin: 3.2rem auto;
	}
`;

const StyledFormAside = styled.aside`
	background-color: var(--color-grey-light);
	background: url(${()=> MapImage}) center / cover no-repeat, var(--color-grey-light);
	padding: 4.8rem 2.4rem;	

	p {
		text-align: center;
		margin-top: 0.8rem;
		margin-bottom: 3.2rem;
	}

	button {
		margin: 0 auto;
	}

	@media only screen and (${BREAKPOINTS.phone}){
		grid-row: 2;
	}
`;

const StyledFormColumn = styled.div`
	padding: 4.8rem 2.4rem;	

	h4 {
		${flexContainer('center','center')};
		flex-wrap: wrap;
		gap: 1.6rem;
	}

	${StyledLogo} {
		height: 3.2rem;
	}

	${StyledInput} {
		height: 3.3rem;
	}

	form {
		width: 70%;
		margin: 3.2rem auto;

		@media only screen and (${BREAKPOINTS.big}){
			width: 100%
		}
	}

	& > button {
		margin: 0 auto;
		margin-top: 4.4rem;
	}
`

const FieldWrapper = styled.div`
	margin-top: 1.6rem;

	label, div {
		font-size: 1.4rem;
	}

	label {
		display: block;
		margin-bottom: 0.4rem;
	}

	div {
		color: var(--color-error);
		margin-top: 0.4rem;
	}

	button {
		margin: 0 auto;
	}
`

export default LoginForm 