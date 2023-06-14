import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createConnectionRequest } from 'apiSdk/connection-requests';
import { Error } from 'components/error';
import { connectionRequestValidationSchema } from 'validationSchema/connection-requests';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { FarmerInterface } from 'interfaces/farmer';
import { getOrganizations } from 'apiSdk/organizations';
import { getFarmers } from 'apiSdk/farmers';
import { ConnectionRequestInterface } from 'interfaces/connection-request';

function ConnectionRequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ConnectionRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createConnectionRequest(values);
      resetForm();
      router.push('/connection-requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ConnectionRequestInterface>({
    initialValues: {
      status: '',
      organization_id: (router.query.organization_id as string) ?? null,
      farmer_id: (router.query.farmer_id as string) ?? null,
    },
    validationSchema: connectionRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Connection Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<FarmerInterface>
            formik={formik}
            name={'farmer_id'}
            label={'Select Farmer'}
            placeholder={'Select Farmer'}
            fetcher={getFarmers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'connection_request',
  operation: AccessOperationEnum.CREATE,
})(ConnectionRequestCreatePage);
