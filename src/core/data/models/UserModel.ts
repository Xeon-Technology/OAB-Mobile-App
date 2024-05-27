

export interface OrgUnit {
  remarks?: string;
  id: number;
  name: string;
  type: string;
  address: string;
  phone?: string;
}
export interface IUserAccount {
  id: number;
  userId: number;
  accountId: number;
}
export interface UserContact {
  id: number;
  contactNo: string;
  email: string;
  emergencyContactNo: string;
  spouseContactNo: string;
}
export interface IUserModel {
  firstName?: string;
  fullName?: string;
  address?: string;
  id?: number;
  email: string;
  lastName?: string;
  orgUnitId?: number;
  orgUnit?: OrgUnit;
  phoneNumber?: string;
  sex?: string;
  type?: string;
  userName?: string;
  userAccounts: IUserAccount[];
  userContacts: UserContact[];
}

export interface IReport {
  tenentId: string;
  numberOfInvoice: number;
  invoicesAmount: number
}