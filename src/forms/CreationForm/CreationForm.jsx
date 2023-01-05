import Sortable from 'sortablejs';
import './CreationForm.scoped.css';
import { range, getCurrentYear, scrollToBottom, formatAxiosError } from '../../utils/general-utils';
import * as Yup from 'yup';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setPostId, deleteStep, addStep } from './creationFormSlice';
import { showToast } from '../../components/Toast/toastSlice.js';
import { showModal } from '../../components/Modal/modalSlice';
import { useState, useEffect } from 'react';
import { apiBaseUrl, imagesBaseUrl } from '../../config';
import { MANUFACTURERS, getEngineSizes, getYearDecoderDict, extractRelevantData, } from '../../utils/vehicle-selection-utils';

import { Formik, Form } from 'formik';
import TextInput from '../../form-components/TextInput/TextInput';
import RepairStepInput from '../../form-components/RepairStepInput/RepairStepInput';
import LoadingIndicator from '../../loaders/LoadingIndicator/LoadingIndicator';

const CreationForm = () => {
    const dispatch = useDispatch();
    const postId = useSelector(state => state.creationForm.postId);
    const steps = useSelector(state => state.creationForm.steps);
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [engine, setEngine] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState(['', '', '', '', '']);
    const [thumbnail, setThumbnail] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [yearError, setYearError] = useState('');
    const [makeError, setMakeError] = useState('');
    const [modelError, setModelError] = useState('');
    const [engineError, setEngineError] = useState('');
    const [titleError, setTitleError] = useState('');
    const yearDecoderDict = getYearDecoderDict();

    const vinFormValidation = Yup.object({
        vin: Yup.string()
            .length(17, "Must be 17 characters in length")
    });

    const handleVinSubmit = async (values, { setSubmitting }) => {
        setShowLoader(true);
        const tenthDigit = values.vin[9];
        const year = yearDecoderDict[tenthDigit];
        axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${values.vin}?format=json&modelyear=${year}`)
            .then(function (response) {
                const decodedVehicle = extractRelevantData(response.data);
                setYearError('');
                setMakeError('');
                setModelError('');
                setEngineError('');
                setYear(decodedVehicle.year);
                setMake(decodedVehicle.make);
                setModel(decodedVehicle.model);
                setEngine(decodedVehicle.engine);
            })
            .catch(function (error) {
                dispatch(showModal({ title: 'Oops!', content: `Error while fetching VIN data:  ${error}` }));
            })
            .finally(function () {
                setShowLoader(false);
            });
        setSubmitting(false); // Formik requires this to be set manually in this onSubmit handler
    };

    const onSelectChange = (e) => {
        const target = e.currentTarget;
        if (target.name === 'year') {
            setYear(target.value);
            setYearError(target.value ? '' : 'Year is required');
        }
        if (target.name === 'make') {
            setMake(target.value);
            setMakeError(target.value ? '' : 'Make is required');
        }
        if (target.name === 'engine') {
            setEngine(target.value);
            setEngineError(target.value ? '' : 'Engine is required');
        }
    };

    const onInputChange = (e) => {
        const target = e.currentTarget;
        if (target.name === 'model') {
            setModel(target.value);
            let model = target.value;
            if (!model) { setModelError('Model is required'); return; }
            if (model.length > 40) { setModelError('Must be 40 characters or less'); return; }
            setModelError('');
        }
        if (target.name === 'title') {
            setTitle(target.value);
            let title = target.value;
            if (!title) { setTitleError('Title is required'); return; }
            if (title.length > 100) { setTitleError('Must be 100 characters or less'); return; }
            setTitleError('');
        }
        if (target.name.startsWith('tag')) {
            const tagIndex = (target.id.slice(target.id.length - 1)) - 1;
            setTags(tags.map((tag, index) => index === tagIndex ? target.value : tag));
            const errorSpan = target.parentElement.lastElementChild;
            if (target.value.length > 20) { errorSpan.textContent = 'Must be 20 characters or less'; return; }
            errorSpan.textContent = '';
        }
    };

    const saveProgress = (isSilent = false) => {
        if (!isSilent) {
            setShowLoader(true);
        }

        let repair = {
            id: postId,
            year: year,
            make: make,
            model: model,
            engine: engine,
            title: title,
            tags: tags,
            steps: steps,
            thumbnail: thumbnail,
            is_published: isPublished,
        };
        let url = apiBaseUrl + '/posts';

        axios.post(url, repair)
            .then((response) => {
                if (!postId) {
                    console.log('setting postId');
                    dispatch(setPostId(response.data.id));
                }
                console.log('isSilent:  ', isSilent);
                if (!isSilent) {
                    dispatch(showToast({ content: 'Progress saved' }));
                    setTimeout(() => {
                        // Wait a second for DOM elements to load, then scroll to bottom
                        scrollToBottom();
                    }, 700);
                }
            })
            .catch((error) => {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: `Error while saving progress:  ${msg}` }));
            })
            .finally(function () {
                setShowLoader(false);
            });
    };

    const onImageChange = () => {
        // TODO
    };

    const onDeleteStepClick = () => {
        // TODO
    };

    const addAnotherStep = () => {
        dispatch(addStep());
    };

    const publishRepair = () => {
        // TODO
    };

    const deleteRepair = () => {
        // TODO
    };

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
                            <select onChange={onSelectChange} value={year} id='year' name='year' style={{ maxWidth: '24rem' }}>
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
                            <select onChange={onSelectChange} value={make} id='make' name='make' style={{ maxWidth: '24rem' }}>
                                <option value=""></option>
                                {MANUFACTURERS.map((mfr, idx) => (
                                    <option key={idx} value={mfr}>{mfr}</option>
                                ))}                            </select>
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{makeError}</span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='model' style={{ width: '3.4rem' }}>Model</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={model} id='model' name='model' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{modelError}</span>
                        </div>
                    </div>

                    <div className="custom-form-group">
                        <label htmlFor='engine' style={{ width: '3.4rem' }}>Engine</label>
                        <div className="input-and-error-group">
                            <select onChange={onSelectChange} value={engine} id='engine' name='engine' style={{ maxWidth: '24rem' }}>
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
                            <input onChange={onInputChange} value={title} id='title' name='title' />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'>{titleError}</span>
                        </div>
                    </div>

                    <p className='tags-p'>Give your post up to 5 tags (optional)</p>

                    <div className='custom-form-group'>
                        <label htmlFor='tag1' style={{ width: '3.4rem' }}>Tag 1</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={tags.length ? tags[0] : ''} id='tag1' name='tag1' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag2' style={{ width: '3.4rem' }}>Tag 2</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={tags.length > 1 ? tags[1] : ''} id='tag2' name='tag2' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag3' style={{ width: '3.4rem' }}>Tag 3</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={tags.length > 2 ? tags[2] : ''} id='tag3' name='tag3' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag4' style={{ width: '3.4rem' }}>Tag 4</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={tags.length > 3 ? tags[3] : ''} id='tag4' name='tag4' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                    <div className='custom-form-group'>
                        <label htmlFor='tag5' style={{ width: '3.4rem' }}>Tag 5</label>
                        <div className='input-and-error-group'>
                            <input onChange={onInputChange} value={tags.length === 5 ? tags[4] : ''} id='tag5' name='tag5' style={{ maxWidth: '24rem' }} />
                            <span className='form-error-text-spacer'>&nbsp;</span>
                            <span className='form-error-text'></span>
                        </div>
                    </div>

                </div>

                {postId
                    ?
                    <>
                        <h3 className='sub-header'>Repair Instructions:</h3>
                        <div className='steps-container'>
                            {
                                steps.map((step, idx) => (
                                    <RepairStepInput
                                        key={idx}
                                        index={idx}
                                        img={step.img}
                                        text={step.text}
                                        textFieldName={`steps[${idx}].text`}
                                        saveProgress={saveProgress}
                                    />
                                ))
                            }
                        </div>
                        <div className="btns-panel">
                            <button type="button" onClick={addAnotherStep}>Add Step</button>
                            <button type="button" onClick={() => saveProgress(true)}>Save</button>
                            <button type="button" onClick={publishRepair}>Publish</button>
                            <button type="button" onClick={deleteRepair}>Delete</button>
                        </div>

                    </>
                    :
                    <div className='save-and-continue'>
                        <button type="button" onClick={() => saveProgress()}>Save and Continue</button>
                    </div>
                }
            </form>
            {showLoader ? <LoadingIndicator msg='Please wait...' /> : null}
        </div>
    );
};

export default CreationForm;