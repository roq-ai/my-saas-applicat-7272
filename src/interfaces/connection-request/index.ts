import { OrganizationInterface } from 'interfaces/organization';
import { FarmerInterface } from 'interfaces/farmer';
import { GetQueryInterface } from 'interfaces';

export interface ConnectionRequestInterface {
  id?: string;
  status: string;
  organization_id: string;
  farmer_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  farmer?: FarmerInterface;
  _count?: {};
}

export interface ConnectionRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  organization_id?: string;
  farmer_id?: string;
}
