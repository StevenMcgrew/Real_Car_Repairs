import './SignInForm.scoped.css';
import * as Yup from 'yup';
import axios from 'axios';
import { apiBaseUrl } from '../../config.js';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../components/UserDropdown/userDropdownSlice';
import { hideModal, showModal } from '../../components/Modal/modalSlice';
import { showToast } from '../../components/Toast/toastSlice.js';

import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';

const SignInForm = () => {
    const dispatch = useDispatch();

    const yupValidation = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email address is required'),
        password: Yup.string()
            .min(8, 'Must be 8 to 128 characters')
            .max(128, 'Must be 8 to 128 characters')
            .required('Password is required')
    });

    const submitSignIn = (values, { setSubmitting }) => {
        let url = `${apiBaseUrl}/auth/login`;
        axios.post(url, values)
            .then(function (response) {
                dispatch(setUsername(response.data.username));
                // TODO: set view_history, profile_pic, theme
                dispatch(hideModal());
                dispatch(showToast({ content: 'You are now logged in' }));
            })
            .catch(function (error) {
                if (error.response?.status === 400) {
                    dispatch(showModal({ title: 'Oops!', content: error.response.data.warning }));
                }
                else {
                    dispatch(showModal({ title: 'Oops!', content: `Error while attempting to log in:  ${error.message}. ${error.response?.statusText ? error.response.statusText : ''}` }));
                }
            });
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
                onSubmit={submitSignIn}>
                <Form className='signin-form'>
                    <TextInput type="email" label="Email Address" labelWidth="7.4rem" name="email" />
                    <TextInput type="password" label="Password" labelWidth="7.4rem" name="password" />
                    <button type="submit" className='signin-btn'>Sign In</button>
                </Form>
            </Formik>
        </>
    );
};

export default SignInForm;