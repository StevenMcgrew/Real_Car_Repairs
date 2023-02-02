import {
    setPostId,
    setYear,
    setMake,
    setModel,
    setEngine,
    setTitle,
    setTag,
    setThumbnail,
    setIsPublished,
    addStep,
    resetPost,
} from './creationFormSlice';

import {
    MANUFACTURERS,
    getEngineSizes,
    getYearDecoderDict,
    extractRelevantData,
    getYearValidationError,
    getMakeValidationError,
    getModelValidationError,
    getEngineValidationError
} from '../../utils/vehicle-selection-utils';

import {
    range,
    getCurrentYear,
    scrollToBottom,
    formatAxiosError,
    getTitleValidationError,
    getTagValidationError
} from '../../utils/general-utils';

import './CreationForm.scoped.css';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../../components/Toast/toastSlice.js';
import { showModal } from '../../components/Modal/modalSlice';
import { showLoader, hideLoader } from '../../loaders/LoadingIndicator/loadingIndicatorSlice';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';


import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';
import RepairStepInput from '../../form-components/RepairStepInput/RepairStepInput';

const CreationForm = () => {
    const SILENT = true;
    const PUBLISH = true;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(state => state.creationForm.post);
    const [yearError, setYearError] = useState('');
    const [makeError, setMakeError] = useState('');
    const [modelError, setModelError] = useState('');
    const [engineError, setEngineError] = useState('');
    const [titleError, setTitleError] = useState('');
    const yearDecoderDict = getYearDecoderDict();

    const vinFormValidation = Yup.object({
        vin: Yup.string().length(17, "Must be 17 characters in length")
    });

    const handleVinSubmit = async (values, { setSubmitting }) => {
        dispatch(showLoader('Fetching VIN data...'));
        const tenthDigit = values.vin[9];
        const year = yearDecoderDict[tenthDigit];

        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${values.vin}?format=json&modelyear=${year}`)
            .then(function (response) {
                const decodedVehicle = extractRelevantData(response.data);
                setYearError('');
                setMakeError('');
                setModelError('');
                setEngineError('');
                dispatch(setYear(decodedVehicle.year));
                dispatch(setMake(decodedVehicle.make));
                dispatch(setModel(decodedVehicle.model));
                dispatch(setEngine(decodedVehicle.engine));
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            })
            .finally(function () {
                dispatch(hideLoader());
            });
        setSubmitting(false); // Formik requires this to be set manually in this onSubmit handler
    };

    const onSelectChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'year') {
            dispatch(setYear(value));
            setYearError(getYearValidationError(value));
        }
        if (name === 'make') {
            dispatch(setMake(value));
            setMakeError(getMakeValidationError(value));
        }
        if (name === 'engine') {
            dispatch(setEngine(value));
            setEngineError(getEngineValidationError(value));
        }
    };

    const onInputChange = (e) => {
        const target = e.currentTarget;
        const name = target.name;
        const value = target.value;

        if (name === 'model') {
            dispatch(setModel(value));
            setModelError(getModelValidationError(value));
        }
        if (name === 'title') {
            dispatch(setTitle(value));
            setTitleError(getTitleValidationError(value));
        }
        if (name.startsWith('tag')) {
            const tagIndex = (target.id.slice(target.id.length - 1)) - 1;
            dispatch(setTag({ index: tagIndex, newTag: value }));
            const errorSpan = target.parentElement.lastElementChild;
            errorSpan.textContent = getTagValidationError(value);
        }
    };

    const getAllValidationErrors = (post) => {
        let errors = '';
        errors += getYearValidationError(post.year);
        errors += getMakeValidationError(post.make);
        errors += getModelValidationError(post.model);
        errors += getEngineValidationError(post.engine);
        errors += getTitleValidationError(post.title);
        for (const tag of post.tags) {
            let tagError = getTagValidationError(tag);
            if (tagError) {
                errors += getTagValidationError(tag);
                break;
            }
        }
        return errors;
    };

    const saveProgress = (isSilent = false, isPublish = false) => {
        if (!isSilent) {
            let validationErrors = getAllValidationErrors(post);
            if (validationErrors) {
                dispatch(showModal({ title: 'Please fix your inputs', content: validationErrors }));
                return;
            }
            dispatch(showLoader('Saving...'));
        }

        let url = apiBaseUrl + '/posts';
        axios.post(url, post, { withCredentials: true })
            .then((response) => {
                if (!post.id) {
                    dispatch(setPostId(response.data.id));
                }
                if (!isSilent) {
                    dispatch(showToast({ content: 'Progress saved' }));
                    setTimeout(() => {
                        // Wait a split second for DOM elements to load, then scroll to bottom
                        scrollToBottom();
                    }, 300);
                }
                if (isPublish) {
                    dispatch(resetPost());
                    dispatch(showToast({ content: 'Published!' }));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            })
            .finally(function () {
                dispatch(hideLoader());
            });
    };

    const addAnotherStep = () => {
        dispatch(addStep());
        saveProgress(SILENT);
    };

    const publishRepair = () => {
        // Form validation
        let validationErrors = getAllValidationErrors(post);
        if (validationErrors) {
            dispatch(showModal({ title: 'Please fix your inputs', content: validationErrors }));
        }
        if (!post.steps.length) {
            dispatch(showModal({ title: 'Cannot publish', content: 'There must be at least one repair step specified.' }));
        }
        if (!post.steps[0].text) {
            dispatch(showModal({ title: 'Cannot publish', content: 'There must be at least one repair step, and it must have some text to describe that step.' }));
        }

        // Set remaining post values
        dispatch(setIsPublished(true));
        for (const step of post.steps) {
            if (step.img) {
                dispatch(setThumbnail(step.img));
                break;
            }
        }

        // Save
        saveProgress(SILENT, PUBLISH);
    };

    const askToDeletePost = () => {
        dispatch(showModal({ title: 'Confirm', content: 'VerifyPostDelete' }));
    };

    useEffect(() => {
        if (post.is_published) {
            saveProgress(SILENT, PUBLISH);
        }
    }, [post.is_published]);

    return (
        <div style={{ position: 'relative' }}>
            <h1 className='page-title'>Create Post</h1>
            <h3 className='sub-header'>Vehicle Selection:</h3>

            <div style={{ position: 'relative' }}>
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
            </div>

            <div className='decode-options'>
                <p>or enter vehicle manually...</p>
            </div>

            <form id='repairForm' method="POST" encType="multipart/form-data">

                <div className="sub-body">

                    <div className="custom-form-group">
                        <label htmlFor='year' style={{ width: '3.4rem' }}>Year</label>
                        <div className="input-and-error-group">
                            <select onChange={onSelectChange} value={post.year} id='year' name='year' style={{ maxWidth: '24rem' }}>
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
                            <select onChange={onSelectChange} value={post.make} id='make' name='make' style={{ maxWidth: '24rem' }}>
                                <option value=""></option>
                                {MANUFACTURERS.map((mfr, idx) => (
                                    <option key={idx} value={mfr}>{mfr}</option>
                                ))}
                            </select>
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{makeError}</span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='model' style={{ width: '3.4rem' }}>Model</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={post.model} id='model' name='model' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{modelError}</span>
                        </div>
                    </div>

                    <div className="custom-form-group">
                        <label htmlFor='engine' style={{ width: '3.4rem' }}>Engine</label>
                        <div className="input-and-error-group">
                            <select onChange={onSelectChange} value={post.engine} id='engine' name='engine' style={{ maxWidth: '24rem' }}>
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
                            <input onChange={onInputChange} value={post.title} id='title' name='title' />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{titleError}</span>
                        </div>
                    </div>

                    <p className='tags-p'>Give your post up to 5 tags (optional)</p>

                    <div className='custom-form-group'>
                        <label htmlFor='tag1' style={{ width: '3.4rem' }}>Tag 1</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={post.tags.length ? post.tags[0] : ''} id='tag1' name='tag1' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag2' style={{ width: '3.4rem' }}>Tag 2</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={post.tags.length > 1 ? post.tags[1] : ''} id='tag2' name='tag2' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag3' style={{ width: '3.4rem' }}>Tag 3</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={post.tags.length > 2 ? post.tags[2] : ''} id='tag3' name='tag3' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag4' style={{ width: '3.4rem' }}>Tag 4</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={post.tags.length > 3 ? post.tags[3] : ''} id='tag4' name='tag4' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag5' style={{ width: '3.4rem' }}>Tag 5</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={post.tags.length === 5 ? post.tags[4] : ''} id='tag5' name='tag5' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                </div>

                {post.id
                    ?
                    <>
                        <h3 className='sub-header'>Repair Instructions:</h3>
                        <div className='steps-container'>
                            {post.steps.map((step, idx) => (
                                <RepairStepInput
                                    key={idx}
                                    stepNum={idx + 1}
                                    img={step.img}
                                    text={step.text}
                                    textFieldName={`steps[${idx}].text`}
                                />
                            ))}
                        </div>
                        <div className="btns-panel">
                            <button type="button" onClick={() => addAnotherStep()}>Add Step</button>
                            <button type="button" onClick={() => saveProgress()}>Save</button>
                            <button type="button" onClick={() => publishRepair()}>Publish</button>
                            <button type="button" onClick={() => askToDeletePost()}>Delete</button>
                        </div>
                    </>
                    :
                    <div className='save-and-continue'>
                        <button type="button" onClick={() => saveProgress()}>Save and Continue</button>
                    </div>
                }

            </form>
        </div>
    );
};

export default CreationForm;