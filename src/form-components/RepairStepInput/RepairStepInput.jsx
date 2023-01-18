import './RepairStepInput.scoped.css';
import { imagesBaseUrl, apiBaseUrl } from '../../config';
import { formatAxiosError } from '../../utils/general-utils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../components/Modal/modalSlice';
import { showLoader, hideLoader } from '../../loaders/LoadingIndicator/loadingIndicatorSlice';
import { deleteStep, setImgStepNum, setStepText, setStepImg, addStepAt, moveStep } from '../../forms/CreationForm/creationFormSlice.js';
import classNames from 'classnames';
import axios from 'axios';

import { DotsVerticalIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


const RepairStepInput = (props) => {
    const { stepNum, img, text, textFieldName } = props;
    // const [previewBgSize, setPreviewBgSize] = useState('contain');
    // const [previewBgImage, setPreviewBgImage] = useState('');
    const [moveTo, setMoveTo] = useState('');
    const post = useSelector(state => state.creationForm.post);
    const dispatch = useDispatch();
    const SILENT = true;

    const showImageUploader = () => {
        dispatch(setImgStepNum(stepNum));
        dispatch(showModal({ title: 'Image Uploader', content: 'ImageUploader' }));
    };

    const removeImage = () => {
        dispatch(showLoader('Deleting image...'));

        let url = `${apiBaseUrl}/images?postId=${post.id}&stepNum=${stepNum}`;
        axios.delete(url)
            .then(function (response) {
                dispatch(setStepImg({ stepNum: stepNum, newImg: '' }));
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            })
            .finally(function () {
                dispatch(hideLoader());
            });
    };

    const onTextChange = (e) => {
        dispatch(setStepText({ stepNum: stepNum, newText: e.currentTarget.value }));
    };

    const onDeleteStepClick = (e) => {
        dispatch(showLoader('Deleting step...'));
        dispatch(deleteStep(stepNum));

        // If no img for this step, return
        if (!post.steps[stepNum - 1].img) {
            dispatch(hideLoader());
            return;
        }

        // Delete image on server
        let url = `${apiBaseUrl}/images?postId=${post.id}&stepNum=${stepNum}`;
        axios.delete(url)
            .then(function (response) {
                console.log('Successfully deleted image on server during step deletion.');
            })
            .catch(function (error) {
                console.log(error);
                const msg = formatAxiosError(error);
                dispatch(showModal({ title: 'Error', content: msg }));
            })
            .finally(function () {
                dispatch(hideLoader());
            });
    };

    const determineMoveTo = (inputValue) => {
        inputValue = Math.round(inputValue);
        return (stepNum > inputValue) ? inputValue + 1 : inputValue;
    };

    return (
        <div className='card step-root'>

            <div className='step-header'>
                <span className='step-header-text'>{`Repair Step ${stepNum}`}</span>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <div className="options-icon-container">
                            <DotsVerticalIcon className='options-icon' />
                        </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className='DropdownMenuContent'>
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                                    Move to
                                    <div className="RightSlot">
                                        <ChevronRightIcon />
                                    </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(moveStep({ from: stepNum, to: 1 }))}>
                                            Beginning
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(moveStep({ from: stepNum, to: post.steps.length }))}>
                                            End
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Sub>
                                            <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                                                After step #
                                                <div className="RightSlot">
                                                    <ChevronRightIcon />
                                                </div>
                                            </DropdownMenu.SubTrigger>
                                            <DropdownMenu.Portal>
                                                <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                                    {post.steps.map((step, idx) => (
                                                        <DropdownMenu.Item className='DropdownMenuItem'
                                                            key={idx}
                                                            onSelect={() => dispatch(moveStep({ from: stepNum, to: determineMoveTo(idx + 1) }))}>
                                                            {idx + 1}
                                                        </DropdownMenu.Item>
                                                    ))}
                                                </DropdownMenu.SubContent>
                                            </DropdownMenu.Portal>
                                        </DropdownMenu.Sub>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>

                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                                    Insert step
                                    <div className="RightSlot">
                                        <ChevronRightIcon />
                                    </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(addStepAt(stepNum - 1))}>
                                            Before
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(addStepAt(stepNum))}>
                                            After
                                        </DropdownMenu.Item>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>

                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger delete-option">
                                    Delete Step
                                    <div className="RightSlot">
                                        <ChevronRightIcon />
                                    </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                        <DropdownMenu.Item className='DropdownMenuItem delete-option'
                                            onSelect={() => onDeleteStepClick()}>
                                            Click here to confirm
                                        </DropdownMenu.Item>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>


                            <DropdownMenu.Arrow className='DropdownMenuArrow' />
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root >

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