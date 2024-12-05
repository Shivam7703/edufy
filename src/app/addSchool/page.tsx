'use client';
import Image from 'next/image';
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
    .matches(/^[0-9]{10}$/, 'Contact must be 10 digits')
    .required('Contact number is required'),
  email_id: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default function AddSchool() {
  const [currImage, setCurrImage] = useState("/schoolImages/sch.jpg");
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
    <div className="max-w-3xl mx-auto min-h-[calc(100vh-186px)] ">
      <h1 className="text-2xl font-bold mb-9 text-center text-black">Add New School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex sm:p-14 p-5 my-10 rounded-2xl shadow-xl shadow-zinc-400 flex-wrap items-stretch justify-between gap-y-6 bg-white">

        <div className="sm:w-[48%] w-full space-y-6">
          <div className="rounded-full h-44 w-44 mx-auto overflow-hidden border border-zinc-800 border-dashed">
            <Image 
              src={currImage} 
              width={600} 
              height={600} 
              className="w-full object-cover h-full" 
              alt="school preview" 
            />
          </div>

          <label className="block text-sm !-mb-4 font-bold text-gray-700">
            Upload School Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const file = e.target.files[0];

                if (file.size > 2 * 1024 * 1024) {
                  alert('File size exceeds 2MB');
                  return;
                }

                setImageFile(file);
                setCurrImage(URL.createObjectURL(file));
              }
            }}
            className="mt-2 block w-full border border-gray-300 rounded-md"
          />
          <FormInput 
            label="School Name" 
            name="name" 
            register={register} 
            errors={errors} 
          />
        </div>

        <div className="sm:w-[48%] w-full space-y-6">
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
        </div>

        <div className="w-full">
          <FormInput 
            label="Address" 
            name="address" 
            register={register} 
            errors={errors} 
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
