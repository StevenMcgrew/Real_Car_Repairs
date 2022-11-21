import './CreationForm.scoped.css';
import { getCurrentYear } from '../../utils/vehicle-selection-utils';

import TextInput from '../form-components/TextInput/TextInput';

const CreationForm = () => {

  const handleSubmit = () => {
    // TODO: handle submit
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput label={`(USA ${(getCurrentYear() - 27)}-present)`} />
      </form>
    </>
  );
};

export default CreationForm;