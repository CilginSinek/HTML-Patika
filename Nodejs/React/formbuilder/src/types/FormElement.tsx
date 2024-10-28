import inputTypes from '../assets/inputTypes.json';

type InputTypes = typeof inputTypes[number];

interface FormType {
    type: InputTypes;
    id: string;
    header?: string;
    extentions:any;
}

export default FormType;