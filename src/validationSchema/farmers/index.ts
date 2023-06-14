import * as yup from 'yup';
import { connectionRequestValidationSchema } from 'validationSchema/connection-requests';

export const farmerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  connection_request: yup.array().of(connectionRequestValidationSchema),
});
