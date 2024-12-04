// src/lib/validation.ts
import * as yup from 'yup';

export const schoolValidationSchema = yup.object().shape({
  name: yup.string()
    .required('School name is required')
    .min(3, 'Name must be at least 3 characters'),
  
  address: yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  
  city: yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),
  
  state: yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters'),
  
  contact: yup.string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact must be 10 digits'),
  
  email_id: yup.string()
    .required('Email is required')
    .email('Invalid email format')
});