import './RepairStepInput.scoped.css';

import { CaretSortIcon } from '@radix-ui/react-icons';

const RepairStepInput = () => {

  const deleteStep = () => {
    // delete the step
  };

  return (
    <div className='card step-container'>

      <div className='step-header'>
        <div className='drag-handle'>
          <CaretSortIcon className='sort-icon' />
        </div>
        <span>Repair Step 1</span>
        <span className="close-btn" onClick={deleteStep}>&times;</span>
      </div>

      <div className='step-body'>
        <div className="img-preview">
          <p className="img-info">Image (optional)</p>
          <div className="img-btns-box">
            <label className='wrapping-label'>
              <span className="add-img-label">Add Image</span>
              <input className="hidden-img-input" type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" />
            </label>
            <button type="button" className="remove-img-btn">Remove</button>
          </div>
        </div>
        <label className="textarea-and-label">
          <span>Enter instructions for this step</span><br />
          <textarea className="step-textarea" maxLength="1000" spellCheck={true} wrap="hard" autoCapitalize="none"
            autoComplete="off" autoFocus={false}></textarea>
        </label>
      </div>

    </div>
  );
};

export default RepairStepInput;