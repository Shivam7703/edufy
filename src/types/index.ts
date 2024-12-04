// src/types/index.ts
export interface School {
    id?: number;
    name: string;
    address: string;
    city: string;
    state: string;
    contact: string;
    email_id: string;
    image?: string;
  }
  
  export interface SchoolFormData extends Omit<School, 'id' | 'image'> {
    image?: File | null;
  }
  
  export interface FormInputProps {
    label: string;
    name: string;
    register: any;
    errors?: any;
    type?: string;
  }