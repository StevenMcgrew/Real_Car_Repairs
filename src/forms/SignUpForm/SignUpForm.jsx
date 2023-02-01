import './SignUpForm.scoped.css';
import * as Yup from 'yup';
import axios from 'axios';
import { apiBaseUrl } from '../../config.js';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../components/UserDropdown/userDropdownSlice';
import { hideModal, showModal } from '../../components/Modal/modalSlice';
import { showToast } from '../../components/Toast/toastSlice';
import { formatAxiosError } from '../../utils/general-utils.js';

import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';

const SignUpForm = () => {
    const dispatch = useDispatch();

    const yupValidation = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email address is required'),
        username: Yup.string()
            .min(3, 'Must be 3 to 15 characters')
            .max(15, 'Must be 3 to 15 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(8, 'Must be 8 to 128 characters')
            .max(128, 'Must be 8 to 128 characters')
            .required('Password is required')
    });

    const submitSignUp = (values, { setSubmitting }) => {
        let url = `${apiBaseUrl}/auth/signup`;
        axios.post(url, values, { withCredentials: true })
            .then(function (response) {
                dispatch(setUsername(response.username));
                dispatch(hideModal());
                dispatch(showToast({ content: 'Success! You are now signed in.' }));
            })
            .catch(function (error) {
                if (error.response?.status === 400) {
                    dispatch(showModal({ title: 'Oops!', content: error.response.data.warning }));
                }
                else {
                    console.log(error);
                    const msg = formatAxiosError(error);
                    dispatch(showModal({ title: 'Error', content: msg }));
                }
            });
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
                onSubmit={submitSignUp}>
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