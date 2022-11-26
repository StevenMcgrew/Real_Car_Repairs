import './CreationForm.scoped.css';
import { range, getCurrentYear } from '../../utils/general-utils';
import * as Yup from 'yup';
import axios from "axios";
import { useState, useEffect } from 'react';
import {
  MANUFACTURERS,
  getEngineSizes,
  getYearDecoderDict,
  extractRelevantData,
} from '../../utils/vehicle-selection-utils';

import { Formik, Form, FieldArray } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';
import SelectInput from '../../form-components/SelectInput/SelectInput';
import RepairStepInput from '../../form-components/RepairStepInput/RepairStepInput';
import LoadingIndicator from '../../loaders/LoadingIndicator/LoadingIndicator';

const CreationForm = () => {
  const [isFetchingVinData, setIsFetchingVinData] = useState(false);
  const [myValue, setMyValue] = useState(null);
  const yearDecoderDict = getYearDecoderDict();

  useEffect(() => {
    if (myValue) {
      document.getElementById('repairFormUpdater').click();
    }
  }, [myValue]);

  const vinFormValidation = Yup.object({
    vin: Yup.string()
      .length(17, "Must be 17 characters in length")
      .required('Required, if you want to decode VIN.')
  });

  const repairFormValidation = Yup.object({
    // define validation rules
  });

  const updateVehicleFields = (vehicle, setFieldValue) => {
    setFieldValue('year', vehicle.year);
    setFieldValue('make', vehicle.make);
    setFieldValue('model', vehicle.model);
    setFieldValue('engine', vehicle.engine);
  };

  const handleVinSubmit = async (values, { setSubmitting }) => {
    setIsFetchingVinData(true);
    const tenthDigit = values.vin[9];
    const year = yearDecoderDict[tenthDigit];
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${values.vin}?format=json&modelyear=${year}`)
      .then(function (response) {
        const vehicle = extractRelevantData(response.data);
        setMyValue(vehicle);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsFetchingVinData(false);
      });
    setSubmitting(false); // Formik requires this to be set manually in this onSubmit handler
  };

  const handleRepairSubmit = (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false); // Formik requires this to be set manually in this onSubmit handler
  };

  return (
    <>
      <h1 className='page-title'>Create Post</h1>
      <h3 className='sub-header'>Vehicle Selection:</h3>

      <div className='vin-form-container'>
        <Formik
          initialValues={{
            vin: '',
          }}
          validationSchema={vinFormValidation}
          onSubmit={handleVinSubmit}
        >
          <Form>
            <div className="sub-body">
              <TextInput
                name='vin'
                label={`VIN Decoder (USA ${(getCurrentYear() - 27)}-present)`}
              />
            </div>
            <div className='decode-options'>
              <button type='submit'>Decode</button>
            </div>
          </Form>
        </Formik>
        {isFetchingVinData ? <LoadingIndicator msg='Fetching VIN data...' /> : null}
      </div>

      <div className='decode-options'>
        <p>or enter vehicle manually...</p>
      </div>

      <Formik
        initialValues={{
          year: '',
          make: '',
          model: '',
          engine: '',
          title: '',
          tags: ['', '', '', '', ''],
          steps: [{ img: '', text: '' }],
        }}
        validationSchema={repairFormValidation}
        onSubmit={handleRepairSubmit}
      >
        {
          ({ values, setFieldValue }) => (
            <Form>
              <button
                id="repairFormUpdater"
                className='sr-only'
                type="button"
                onClick={() => updateVehicleFields(myValue, setFieldValue)}>
              </button>
              <div className='sub-body'>

                <SelectInput name='year' label='Year' labelWidth='3.4rem' fieldWidth='24rem'>
                  <option value=""></option>
                  {range(1900, getCurrentYear() + 2)
                    .reverse()
                    .map((year, idx) => <option key={idx} value={year}>{year}</option>)}
                </SelectInput>

                <SelectInput name='make' label='Make' labelWidth='3.4rem' fieldWidth='24rem'>
                  <option value=""></option>
                  {MANUFACTURERS.map((mfr, idx) => (
                    <option key={idx} value={mfr.toLowerCase()}>{mfr}</option>
                  ))}
                </SelectInput>

                <TextInput name='model' label='Model' labelWidth='3.4rem' fieldWidth='24rem' />

                <SelectInput name='engine' label='Engine' labelWidth='3.4rem' fieldWidth='24rem'>
                  <option value=""></option>
                  {getEngineSizes().map((engSize, idx) => <option key={idx} value={engSize}>{engSize}</option>)}
                </SelectInput>

              </div>

              <h3 className='sub-header'>Title and Tags:</h3>
              <div className='sub-body'>
                <TextInput name='title' label='Title' labelWidth='3.4rem' />
                <p className='tags-p'>Give your post up to 5 tags (optional)</p>
                <TextInput name='tags[0]' label='Tag 1' labelWidth='3.4rem' fieldWidth='24rem' />
                <TextInput name='tags[1]' label='Tag 2' labelWidth='3.4rem' fieldWidth='24rem' />
                <TextInput name='tags[2]' label='Tag 3' labelWidth='3.4rem' fieldWidth='24rem' />
                <TextInput name='tags[3]' label='Tag 4' labelWidth='3.4rem' fieldWidth='24rem' />
                <TextInput name='tags[4]' label='Tag 5' labelWidth='3.4rem' fieldWidth='24rem' />
              </div>

              <h3 className='sub-header'>Repair Instructions:</h3>
              <FieldArray
                name='steps'
                render={arrayHelpers => (
                  <>
                    <div className='steps-container'>
                      {
                        values.steps.map((step, idx) => (
                          <RepairStepInput
                            key={idx}
                            index={idx}
                            img={step.img}
                            text={step.text}
                            deleteClicked={arrayHelpers.remove}
                            imgFieldName={`steps[${idx}].img`}
                            textFieldName={`steps[${idx}].text`}
                          />
                        ))
                      }
                    </div>
                    <div className="btns-panel">
                      <button type="button" onClick={() => arrayHelpers.push({ img: '', text: '' })}>Add Step</button>
                      <button type="button">Save</button>
                      <button type="submit">Publish</button>
                      <button type="button">Delete</button>
                    </div>
                  </>
                )}
              />
            </Form>
          )
        }
      </Formik>
    </>
  );
};

export default CreationForm;