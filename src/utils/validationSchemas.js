import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //   'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  // ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Confirmation is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

export const addRecipeSchema = Yup.object({
  name: Yup.string()
    .max(64, 'Maximum 64 characters')
    .required('Name is required'),
  description: Yup.string()
    .max(200, 'Maximum 200 characters')
    .required('Description is required'),
  cookingTime: Yup.number()
    .typeError('Must be a number')
    .min(1, 'Minimum 1 minute')
    .max(360, 'Maximum 360 minutes')
    .required('Cooking time is required'),
  calories: Yup.number()
    .typeError('Must be a number')
    .min(1, 'Minimum 1 calorie')
    .max(10000, 'Maximum 10000 calories')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  category: Yup.string().required('Category is required'),
  ingredient: Yup.string().required('Ingredient is required'),
  ingredientAmount: Yup.number()
    .typeError('Must be a number')
    .min(2, 'Minimum amount is 2')
    .max(16, 'Maximum amount is 16')
    .required('Ingredient amount is required'),
  instruction: Yup.string()
    .max(1200, 'Maximum 1200 characters')
    .required('Instruction is required'),
  recipeImg: Yup.mixed()
    .test('fileSize', 'Image size must be less than 2MB', value => {
      if (!value) return true; // not required
      return value.size <= 2 * 1024 * 1024;
    })
    .nullable(),
});
