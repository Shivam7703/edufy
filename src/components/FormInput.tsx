// src/components/FormInput.tsx
import React from 'react';
import { FormInputProps } from '../types';

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  errors,
 
  type = 'text',
  ...rest
}) => {
  return (
    <div className={` mb-4 text-gray-700`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={label}
        {...register(name)}
        className={`w-full px-3 py-2 border text-black placeholder:text-zinc-400 rounded-md shadow-sm 
          ${errors && errors[name] 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-600 focus:ring-blue-500'
          }`}
        {...rest}
      />
      {errors && errors[name] && (
        <p className="mt-1 text-xs text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
