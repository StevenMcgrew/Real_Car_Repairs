import './SignUpForm.scoped.css';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';

const SignUpForm = () => {

  const yupValidation = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    username: Yup.string()
      .min(3, 'Username must be 3 to 15 characters')
      .max(15, 'Username must be 3 to 15 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be 8 to 128 characters')
      .max(128, 'Password must be 8 to 128 characters')
      .required('Password is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false); // Formik requires this to be set manually in this onSubmit handler
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: ''
        }}
        validationSchema={yupValidation}
        onSubmit={handleSubmit}>
        <Form className='signup-form'>
          <TextInput type="email" label="Email Address" labelWidth="7.4rem" name="email" />
          <TextInput type="text" label="Username" labelWidth="7.4rem" name="username" />
          <TextInput type="password" label="Password" labelWidth="7.4rem" name="password" />
          <button type="submit" className='signup-btn'>Sign Up</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;