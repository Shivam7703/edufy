'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import FormInput from '@/components/FormInput';
import { SchoolFormData } from '@/types';

// Validation schema
const schoolSchema = yup.object().shape({
  name: yup.string().required('School name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  contact: yup.string()
    // .matches(/^[0-9]{10}$/, 'Contact must be 10 digits')
    .required('Contact number is required'),
  email_id: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default function AddSchool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SchoolFormData>({
    resolver: yupResolver(schoolSchema),
  });

  const onSubmit: SubmitHandler<SchoolFormData> = async (data) => {
    const formData = new FormData();

    // Append all fields from the form
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Append the image file, if any
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/showSchools'); // Redirect on success
      } else {
        alert('Failed to add school'); // Handle server error
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput 
          label="School Name" 
          name="name" 
          register={register} 
          errors={errors} 
        />
        <FormInput 
          label="Address" 
          name="address" 
          register={register} 
          errors={errors} 
        />
        <FormInput 
          label="City" 
          name="city" 
          register={register} 
          errors={errors} 
        />
        <FormInput 
          label="State" 
          name="state" 
          register={register} 
          errors={errors} 
        />
        <FormInput 
          label="Contact Number" 
          name="contact" 
          type="tel"
          register={register} 
          errors={errors} 
        />
        <FormInput 
          label="Email" 
          name="email_id" 
          type="email"
          register={register} 
          errors={errors} 
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            School Image
          </label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add School
        </button>
      </form>
    </div>
  );
}
