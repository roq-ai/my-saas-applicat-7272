import { ConnectionRequestInterface } from 'interfaces/connection-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FarmerInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  connection_request?: ConnectionRequestInterface[];
  user?: UserInterface;
  _count?: {
    connection_request?: number;
  };
}

export interface FarmerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
}
