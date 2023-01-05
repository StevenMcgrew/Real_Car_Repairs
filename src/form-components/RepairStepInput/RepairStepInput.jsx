import './RepairStepInput.scoped.css';
import { imagesBaseUrl, apiBaseUrl } from '../../config';
import { formatAxiosError } from '../../utils/general-utils';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../components/Modal/modalSlice';
import { deleteStep, setStepNum, setStepText, setStepImg } from '../../forms/CreationForm/creationFormSlice.js';
import classNames from 'classnames';
import axios from 'axios';

import { CaretSortIcon } from '@radix-ui/react-icons';

const RepairStepInput = (props) => {
    const { index, img, text, textFieldName, saveProgress } = props;
    // const [previewBgSize, setPreviewBgSize] = useState('contain');
    // const [previewBgImage, setPreviewBgImage] = useState('');
    const [repairText, setRepairText] = useState('');
    const postId = useSelector(state => state.creationForm.postId);
    const dispatch = useDispatch();

    const showImageUploader = () => {
        dispatch(setStepNum(index + 1));
        dispatch(showModal({ title: 'Image Uploader', content: 'ImageUploader' }));
    };

    const removeImage = () => {
        // TODO: show Loading indicator

        let url = `${apiBaseUrl}/images?postId=${postId}&stepNum=${index + 1}`;
        axios.delete(url)
            .then(function (response) {
                dispatch(setStepImg({ stepNum: (index + 1), newImg: '' }));
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            })
            .finally(function () {
                // TODO: hide Loading indicator
            });
    };

    const onTextChange = (e) => {
        dispatch(setStepText({ stepNum: (index + 1), newText: e.currentTarget.value }));
    };

    const removeStep = (e) => {
        //
    };

    useEffect(() => {
        if (text === repairText) {
            return;
        }
        setRepairText(text);
        const timerId = setTimeout(() => {
            saveProgress(true);
        }, 3000);
        return () => clearTimeout(timerId);
    }, [text]);

    return (
        <div className='card step-root'>

            <div className='step-header'>
                <div className='drag-handle'>
                    <CaretSortIcon className='sort-icon' />
                </div>

                <span>{`Repair Step ${index + 1}`}</span>

                <span className="close-btn" onClick={removeStep}>&times;</span>
            </div>

            <div className='step-body'>
                <div>
                    <span className="img-info">Image (optional)</span>
                    <div
                        id='imgPreview'
                        className="img-preview"
                        style={{
                            backgroundSize: 'contain',
                            backgroundImage: img ? `url(${imagesBaseUrl}/${img})` : 'none',
                        }}
                    >
                        <div className="img-btns-box">
                            <button
                                type="button"
                                className={classNames({
                                    'transparent-btn': img,
                                    'add-img-btn': !img
                                })}
                                onClick={showImageUploader}
                            >
                                {img ? 'Change' : 'Add Image'}
                            </button>
                            {img ? <button type="button" className="transparent-btn" onClick={removeImage}>Remove</button> : null}
                        </div>
                    </div>
                </div>

                <div className="textarea-and-label">
                    <label htmlFor={textFieldName} className='step-text-label'>Enter instructions for this step</label>
                    <textarea
                        id={textFieldName}
                        name={textFieldName}
                        className="step-textarea"
                        maxLength="1000"
                        spellCheck={true}
                        wrap="hard"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoFocus={false}
                        value={text}
                        onChange={onTextChange}
                    >
                    </textarea>
                    <span className='form-error-text-spacer'>&nbsp;</span>
                    <span className='form-error-text'></span>
                </div>
            </div>

        </div>
    );
};

export default RepairStepInput;