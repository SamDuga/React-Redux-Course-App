import React from 'react';

interface SelectInputProps {
    options: Array<{ key: string, value: string; }>;
    id: string;
    name: string;
    value: string;
    label: string;
    error?: string;
    onChange( event: React.ChangeEvent<HTMLSelectElement> );
}

export default function SelectInput( props: SelectInputProps ) {
    let wrapperClass = ( props.error && props.error.length > 0 ) ? 'form-group has-error' : 'form-group';
    return (
        <div className={wrapperClass}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className='field'>
                <select
                    className='form-control'
                    id={props.id}
                    onChange={props.onChange}
                    name={props.name}
                    value={props.value}>
                    <option value='' style={{ background: 'light-grey' }} >Select Author</option>
                    {( props.options && props.options.length > 0 ) &&
                        props.options.map( opt => { return <option key={opt.key} value={opt.key}>{opt.value}</option>; } )}
                </select>

            </div>
            {( props.error && props.error.length > 2 ) && <div className='alert alert-danger'>{props.error}</div>}
        </div>
    );
}

