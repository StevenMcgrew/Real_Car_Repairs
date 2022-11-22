import './CreationForm.scoped.css';
import { getCurrentYear } from '../../utils/vehicle-selection-utils';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';
import SelectInput from '../../form-components/SelectInput/SelectInput';
import RepairStepInput from '../../form-components/RepairStepInput/RepairStepInput';

const CreationForm = () => {

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
          year: '',
          make: '',
          model: '',
          engine: '',
          title: '',
          tags: [],
          steps: [],
        }}
        validationSchema={yupValidation}
        onSubmit={handleSubmit}>
        <Form>

          <h1 className='page-title'>Create Post</h1>

          <h3 className='sub-header'>Vehicle Selection:</h3>
          <div className='sub-body'>
            <TextInput name='vin' label={`VIN Decoder (USA ${(getCurrentYear() - 27)}-present)`} fieldWidth='25rem' />
            <div className='decode-options'>
              <button type='button'>Decode</button>
              <p>or enter vehicle manually...</p>
            </div>
            <SelectInput name='year' label='Year' labelWidth='3.4rem' fieldWidth='24rem' />
            <SelectInput name='make' label='Make' labelWidth='3.4rem' fieldWidth='24rem' />
            <TextInput name='model' label='Model' labelWidth='3.4rem' fieldWidth='24rem' />
            <SelectInput name='engine' label='Engine' labelWidth='3.4rem' fieldWidth='24rem' />
          </div>

          <h3 className='sub-header'>Title and Tags:</h3>
          <div className='sub-body'>
            <TextInput name='title' label='Title' labelWidth='3.4rem' />
            <p className='tags-p'>Give your post up to 5 tags (optional)</p>
            <TextInput name='tag[0]' label='Tag 1' labelWidth='3.4rem' fieldWidth='24rem' />
            <TextInput name='tag[1]' label='Tag 2' labelWidth='3.4rem' fieldWidth='24rem' />
            <TextInput name='tag[2]' label='Tag 3' labelWidth='3.4rem' fieldWidth='24rem' />
            <TextInput name='tag[3]' label='Tag 4' labelWidth='3.4rem' fieldWidth='24rem' />
            <TextInput name='tag[4]' label='Tag 5' labelWidth='3.4rem' fieldWidth='24rem' />
          </div>

          <h3 className='sub-header'>Repair Instructions:</h3>
          <div className='sub-body'>
            <RepairStepInput />
          </div>

        </Form>
      </Formik>
    </>
  );
};

export default CreationForm;