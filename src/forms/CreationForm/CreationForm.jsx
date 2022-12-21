import Sortable from 'sortablejs';
import './CreationForm.scoped.css';
import { range, getCurrentYear } from '../../utils/general-utils';
import * as Yup from 'yup';
import axios from "axios";
import { useState, useEffect } from 'react';
import { imagesBaseUrl } from '../../config';
import { MANUFACTURERS, getEngineSizes, getYearDecoderDict, extractRelevantData, } from '../../utils/vehicle-selection-utils';

import { Formik, Form, FieldArray } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';
import SelectInput from '../../form-components/SelectInput/SelectInput';
import RepairStepInput from '../../form-components/RepairStepInput/RepairStepInput';
import LoadingIndicator from '../../loaders/LoadingIndicator/LoadingIndicator';

const CreationForm = () => {
    const [isFetchingVinData, setIsFetchingVinData] = useState(false);
    const [vehicle, setVehicle] = useState({ year: '', make: '', model: '', engine: '' });
    const [yearError, setYearError] = useState('');
    const [makeError, setMakeError] = useState('');
    const [modelError, setModelError] = useState('');
    const [engineError, setEngineError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [steps, setSteps] = useState([{ img: '', text: '' }]);
    const yearDecoderDict = getYearDecoderDict();

    const vinFormValidation = Yup.object({
        vin: Yup.string()
            .length(17, "Must be 17 characters in length")
            .required('Required, if you want to decode VIN.')
    });

    const handleVinSubmit = async (values, { setSubmitting }) => {
        setIsFetchingVinData(true);
        const tenthDigit = values.vin[9];
        const year = yearDecoderDict[tenthDigit];
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${values.vin}?format=json&modelyear=${year}`)
            .then(function (response) {
                const decodedVehicle = extractRelevantData(response.data);
                setYearError('');
                setMakeError('');
                setModelError('');
                setEngineError('');
                setVehicle(decodedVehicle);
            })
            .catch(function (error) {
                alert(error);
            })
            .finally(function () {
                setIsFetchingVinData(false);
            });
        setSubmitting(false); // Formik requires this to be set manually in this onSubmit handler
    };

    useEffect(() => {
        let form = document.getElementById('repairForm');
        form.year.value = vehicle.year;
        form.make.value = vehicle.make;
        form.model.value = vehicle.model;
        form.engine.value = vehicle.engine;
    }, [vehicle]);

    const onSelectChange = (e) => {
        const target = e.currentTarget;
        if (target.name === 'year') {
            setYearError(target.value ? '' : 'Year is required');
        }
        if (target.name === 'make') {
            setMakeError(target.value ? '' : 'Make is required');
        }
        if (target.name === 'engine') {
            setEngineError(target.value ? '' : 'Engine is required');
        }
    };

    const onInputChange = (e) => {
        const target = e.currentTarget;
        if (target.name === 'model') {
            let model = target.value;
            if (!model) { setModelError('Model is required'); return; }
            if (model.length > 40) { setModelError('Must be 40 characters or less'); return; }
            setModelError('');
        }
        if (target.name === 'title') {
            let title = target.value;
            if (!title) { setTitleError('Title is required'); return; }
            if (title.length > 100) { setTitleError('Must be 100 characters or less'); return; }
            setTitleError('');
        }
        if (target.name.startsWith('tag')) {
            const tag = target.value;
            const errorSpan = target.parentElement.lastElementChild;
            if (tag.length > 20) { errorSpan.textContent = 'Must be 20 characters or less'; return; }
            errorSpan.textContent = '';
        }
    };

    const deleteStep = () => {
        // TODO: handle deleting a step
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

            <form id='repairForm' method="POST" encType="multipart/form-data">

                <div className="sub-body">

                    <div className="custom-form-group">
                        <label htmlFor='year' style={{ width: '3.4rem' }}>Year</label>
                        <div className="input-and-error-group">
                            <select onChange={onSelectChange} id='year' name='year' style={{ maxWidth: '24rem' }}>
                                <option value=""></option>
                                {range(1900, getCurrentYear() + 2)
                                    .reverse()
                                    .map((year, idx) => <option key={idx} value={year}>{year}</option>)}
                            </select>
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{yearError}</span>
                        </div>
                    </div>

                    <div className="custom-form-group">
                        <label htmlFor='make' style={{ width: '3.4rem' }}>Make</label>
                        <div className="input-and-error-group">
                            <select onChange={onSelectChange} id='make' name='make' style={{ maxWidth: '24rem' }}>
                                <option value=""></option>
                                {MANUFACTURERS.map((mfr, idx) => (
                                    <option key={idx} value={mfr.toLowerCase()}>{mfr}</option>
                                ))}                            </select>
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{makeError}</span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='model' style={{ width: '3.4rem' }}>Model</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='model' name='model' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{modelError}</span>
                        </div>
                    </div>

                    <div className="custom-form-group">
                        <label htmlFor='engine' style={{ width: '3.4rem' }}>Engine</label>
                        <div className="input-and-error-group">
                            <select onChange={onSelectChange} id='engine' name='engine' style={{ maxWidth: '24rem' }}>
                                <option value=""></option>
                                {getEngineSizes().map((engSize, idx) => (
                                    <option key={idx} value={engSize}>{engSize}</option>
                                ))}
                            </select>
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{engineError}</span>
                        </div>
                    </div>

                </div>

                <h3 className='sub-header'>Title and Tags:</h3>

                <div className='sub-body'>

                    <div className='custom-form-group'>
                        <label htmlFor='title' style={{ width: '3.4rem' }}>Title</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='title' name='title' />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{titleError}</span>
                        </div>
                    </div>

                    <p className='tags-p'>Give your post up to 5 tags (optional)</p>

                    <div className='custom-form-group'>
                        <label htmlFor='tag1' style={{ width: '3.4rem' }}>Tag 1</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='tag1' name='tag1' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag2' style={{ width: '3.4rem' }}>Tag 2</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='tag2' name='tag2' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag3' style={{ width: '3.4rem' }}>Tag 3</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='tag3' name='tag3' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag4' style={{ width: '3.4rem' }}>Tag 4</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='tag4' name='tag4' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag5' style={{ width: '3.4rem' }}>Tag 5</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} id='tag5' name='tag5' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                </div>

                <h3 className='sub-header'>Repair Instructions:</h3>

                <div className='steps-container'>
                    {
                        steps.map((step, idx) => (
                            <RepairStepInput
                                key={idx}
                                index={idx}
                                img={step.img}
                                text={step.text}
                                deleteClicked={deleteStep}
                                imgFieldName={`steps[${idx}].img`}
                                textFieldName={`steps[${idx}].text`}
                                style={{ backgroundImage: step.img ? `url(${imagesBaseUrl + step.img})` : '' }}
                            />
                        ))
                    }
                </div>

                <div className="btns-panel">
                    <button type="button" onClick={() => {
                        // arrayHelpers.push({ img: '', text: '' })
                    }}>Add Step</button>
                    <button type="button" onClick={() => {
                        // saveProgress(values)
                    }}>Save</button>
                    <button type="submit">Publish</button>
                    <button type="button">Delete</button>
                </div>

            </form>

            {/* <Formik
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
                                                        setImgField={setFieldValue}
                                                        imgFieldName={`steps[${idx}].img`}
                                                        textFieldName={`steps[${idx}].text`}
                                                    />
                                                ))
                                            }
                                        </div>
                                        <div className="btns-panel">
                                            <button type="button" onClick={() => arrayHelpers.push({ img: '', text: '' })}>Add Step</button>
                                            <button type="button" onClick={() => saveProgress(values)}>Save</button>
                                            <button type="submit">Publish</button>
                                            <button type="button">Delete</button>
                                        </div>
                                    </>
                                )}
                            />
                        </Form>
                    )
                }
            </Formik> */}
        </>
    );
};

export default CreationForm;