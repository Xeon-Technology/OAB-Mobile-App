import { IUserModel } from './UserModel';

export interface ModuleRoute {
  moduleId: string;
  navigator: string;
  route: string;
  roles: string[];
}

export interface ClientModule {
  id: number;
  module: ERPModule;
  moduleId: number;
  moduleCode?: string;
  moduleTitle: string;
}

export interface ClientModuleCodeResponse {
  id: number;
  moduleId: number;
  code?: string;
  name: string;
}

export interface ERPModule {
  id: number;
  globalId: string;
  code: string;
}

export interface IAuthData {
  expiration?: string;
  me?: IUserModel;
  refreshToken?: string;
  requestToken?: string;
  requestTokenHeader?: string;
  roles?: string[];
  token?: string;
  hasRole(role: string): boolean;
  clientModules: ClientModule[] | undefined;
}

export class AuthData implements IAuthData {
  clientModules: ClientModule[] | undefined;
  expiration?: string;
  me?: IUserModel;
  refreshToken?: string;
  requestToken?: string;
  requestTokenHeader?: string;
  roles?: string[];
  token?: string;

  hasRole(role: string): boolean {
    let a = this.roles?.includes(role);
    if (a === undefined) return false;
    return a;
  }
}

const SuperAdmin = ['super_admin'];
const Admin = ['super_admin', 'admin'];
const Specialized = ['super_admin', 'admin', 'executive', 'specialized'];

const StoreAdmin = ['super_admin', 'store_admin'];
const OperationAdmin = ['super_admin', 'operator'];
const Supplier = ['admin', 'supplier'];

export const UserRole = {
  SuperAdmin,
  Admin,
  Specialized,
};
