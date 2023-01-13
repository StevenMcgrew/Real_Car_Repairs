import './RepairStepInput.scoped.css';
import { imagesBaseUrl, apiBaseUrl } from '../../config';
import { formatAxiosError } from '../../utils/general-utils';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, showModal } from '../../components/Modal/modalSlice';
import { showLoader, hideLoader } from '../../loaders/LoadingIndicator/loadingIndicatorSlice';
import { deleteStep, setImgStepNum, setStepText, setStepImg } from '../../forms/CreationForm/creationFormSlice.js';
import { setDeleteStepNum } from '../../components/VerifyStepDelete/verifyStepDeleteSlice.js';
import classNames from 'classnames';
import axios from 'axios';

import { DotsVerticalIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


const RepairStepInput = (props) => {
    const { index, img, text, textFieldName } = props;
    // const [previewBgSize, setPreviewBgSize] = useState('contain');
    // const [previewBgImage, setPreviewBgImage] = useState('');
    const postId = useSelector(state => state.creationForm.post.id);
    const dispatch = useDispatch();
    const SILENT = true;

    const showImageUploader = () => {
        dispatch(setImgStepNum(index + 1));
        dispatch(showModal({ title: 'Image Uploader', content: 'ImageUploader' }));
    };

    const removeImage = () => {
        dispatch(showLoader('Deleting image...'));

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
                dispatch(hideLoader());
            });
    };

    const onTextChange = (e) => {
        dispatch(setStepText({ stepNum: (index + 1), newText: e.currentTarget.value }));
    };

    const askToDeleteStep = (e) => {
        dispatch(setDeleteStepNum(index + 1));
        dispatch(showModal({ title: 'Confirm', content: 'VerifyStepDelete' }));
    };

    return (
        <div className='card step-root'>

            <div className='step-header'>
                <span className='step-header-text'>{`Repair Step ${index + 1}`}</span>

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
                                    Move
                                    <div className="RightSlot">
                                        <ChevronRightIcon />
                                    </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
                                            To Beginning
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
                                            To End
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
                                            To Between _ and _
                                        </DropdownMenu.Item>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>

                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                                    Insert New
                                    <div className="RightSlot">
                                        <ChevronRightIcon />
                                    </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
                                            Before
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
                                            After
                                        </DropdownMenu.Item>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>

                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                                    Delete Step
                                    <div className="RightSlot">
                                        <ChevronRightIcon />
                                    </div>
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="DropdownMenuSubContent">
                                        <DropdownMenu.Item className='DropdownMenuItem'
                                            onSelect={() => dispatch(showModal({ title: 'Sign Up', content: 'SignUpForm' }))}>
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