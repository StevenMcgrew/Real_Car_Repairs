import './SignInForm.scoped.css';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';

const SignInForm = () => {

  const yupValidation = Yup.object({
    email: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required')
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
          password: ''
        }}
        validationSchema={yupValidation}
        onSubmit={handleSubmit}>
        <Form className='signin-form'>
          <TextInput type="email" label="Email Address" labelWidth="6.3rem" name="email" />
          <TextInput type="password" label="Password" labelWidth="6.3rem" name="password" />
          <button type="submit" className='signin-btn'>Sign Up</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignInForm;