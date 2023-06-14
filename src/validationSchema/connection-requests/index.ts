import * as yup from 'yup';

export const connectionRequestValidationSchema = yup.object().shape({
  status: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  farmer_id: yup.string().nullable().required(),
});
