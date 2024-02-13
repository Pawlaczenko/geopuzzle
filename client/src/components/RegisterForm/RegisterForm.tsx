import { FC, useState } from 'react'
import styled from 'styled-components'
import MapImage from 'src/assets/map.svg';
import { flexContainer } from 'src/styles/mixins';
import Heading from '../Heading';
import ButtonIcon from '../Button/ButtonIcon';
import Paragraph from '../Paragraph.styled';
import { Form, Link } from 'react-router-dom';
import Logo, { StyledLogo } from '../Logo';
import { ErrorMessage, Field, Formik } from 'formik';
import { StyledInput } from '../Input/Input.styled';
import Container from 'src/layout/Container';
import { BREAKPOINTS } from 'src/styles/variables';
import { ICONS } from 'src/data/icons.data';

interface RegisterFormValues {
	email: string;
	username: string;
	password: string;
}

const initialValues: RegisterFormValues = {
	email: '',
	username: '',
	password: '',
};
  

const RegisterForm : FC = () => {
	const [showPassword,setShowPassword] = useState<boolean>(false);
	const IconOpen = ICONS.get('eye-open')!;
	const IconClosed = ICONS.get('eye-closed')!;

	const handleSubmit = (values: RegisterFormValues) => {
		console.log('Form values:', values);
	};

	const handleShowPassword = () => {
		setShowPassword(val => !val);
	}

	  
	return (
		<Container>
		<StyledRegisterForm>
			<StyledFormColumn>
				<Heading level='h4'>Dołącz do <Logo /></Heading>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validate={(values) => {
						const errors: Partial<RegisterFormValues> = {};

						// Example validation rules
						if (!values.email) {
							errors.email = 'To pole jest wymagane';
						}

						if (!values.username) {
							errors.username = 'To pole jest wymagane';
						}

						if (!values.password) {
							errors.password = 'To pole jest wymagane';
						}

						return errors;
					}}
					>
					<Form>
						<FieldWrapper>
							<label htmlFor="register">E-mail:</label>
							<StyledInput 
								as={Field} 
								type="email" 
								id="email" 
								name="email" 
								placeholder="Podaj adres e-mail" />
							<ErrorMessage name="email" component="div" />
						</FieldWrapper>

						<FieldWrapper>
							<label htmlFor="username">Nazwa użytkownika:</label>
							<StyledInput 
								as={Field} 
								type="text" 
								id="username" 
								name="username" 
								placeholder="Podaj nazwę użytkownika" />
							<ErrorMessage name="username" component="div" />
						</FieldWrapper>

						<FieldWrapper>
							<label htmlFor="password">Hasło:</label>
							<StyledInput 
								as={Field} 
								type={showPassword ? 'text' : 'password'} 
								id="password" 
								name="password" 
								placeholder="Podaj hasło" />
							<ShowPasswordButton onClick={handleShowPassword} type='button'>
								{showPassword ? <IconOpen /> : <IconClosed />}
							</ShowPasswordButton>
							<ErrorMessage name="password" component="div" />
						</FieldWrapper>

						<FieldWrapper>
							<ButtonIcon btnType={'outline'} icon={'login'}>Zarejestruj się</ButtonIcon>
						</FieldWrapper>
					</Form>
				</Formik>
				<ButtonIcon btnType={'outline'} icon={'google'}>Zarejestruj się za pomocą Google</ButtonIcon>
			</StyledFormColumn>
				<StyledFormAside>
					<Heading $alignCenter withAccent level={'h5'}>Posiadasz już konto?</Heading>
					<Paragraph>Jeśli masz już konto, zapraszamy do zalogowania się i ponownego korzystania z Geopuzzle</Paragraph>
					<Link to='/register'>
						<ButtonIcon btnType={'regular'} icon={'login'}>Zaloguj się</ButtonIcon>
					</Link>
				</StyledFormAside>
		</StyledRegisterForm>
		</Container>
	)
}

const StyledRegisterForm = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr;
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
	position: relative;

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

const ShowPasswordButton = styled.button`
	position: absolute;
	right: 0;
	width: 3rem;
	height: 3rem;
	background-color: transparent;
	top: 2.5rem;
	cursor: pointer;
`

export default RegisterForm 