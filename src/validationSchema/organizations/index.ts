import * as yup from 'yup';
import { connectionRequestValidationSchema } from 'validationSchema/connection-requests';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  connection_request: yup.array().of(connectionRequestValidationSchema),
});
