import React from 'react';

interface TextInputProps {
    id: string;
    name: string;
    value: string;
    label: string;
    error?: string;
    onChange( event: React.ChangeEvent<HTMLInputElement> );
}

export default function TextInput( props: TextInputProps ) {
    let wrapper = ( props.error && props.error.length > 0 ) ? 'form-group has-error' : 'form-group';

    return (
        <div className={wrapper}>
            <label htmlFor={props.id}>{props.label}</label>
            <div>
                <input
                    className='form-control'
                    id={props.id}
                    type='text'
                    onChange={props.onChange}
                    name={props.name}
                    value={props.value}
                />
            </div>
            {props.error && <div className='alert alert-danger'>{props.error}</div>}
        </div>
    );
}
