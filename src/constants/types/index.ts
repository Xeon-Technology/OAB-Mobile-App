import i18n from 'i18n-js';
import { ITheme } from './theme';
import { IAuthData } from '../../core/data/models/AuthData';

export * from './components';
export * from './theme';

export interface IUser {
  id: number | string;
  name?: string;
  department?: string;
  avatar?: string;
  about?: string;
}

export interface IAccount {
  id: number;
  name: string;
  code: string;
  createDate: string;
  createdUser: {
    id: number;
    fullName: string;
  },
  assets: [],
  contact: {
    person: string;
    place: string;
    type: string;
    number: string;
    number2: string;
    number3: string;
    notes: null
  }
}

export interface ILocation {
  id?: number;
  city?: string;
  country?: string;
}
export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  user: IUser;
  users: IUser[];
  handleUser: (data?: IUser) => void;
  handleUsers: (data?: IUser[]) => void;
  handleNotifications: (data?: INotification[]) => void;

  authData: IAuthData | null;
  currentUserAccountId: Number | null;
  currentUserId: Number | null;
  currentUserAccountName: String | null;
  currentUserAccountAddress: String | null;
  currentUser: String | null;
  handleAuthData: (data?: IAuthData) => void;
  getAuthData: () => IAuthData,
  logout: (callback?: () => void) => void;
  roles: string[]

}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}

export interface INotification {
  id?: number;
  subject?: string;
  message?: string;
  read?: boolean;
  business?: boolean;
  createdAt?: number | Date;
  type:
  | 'document'
  | 'documentation'
  | 'payment'
  | 'notification'
  | 'profile'
  | 'extras'
  | 'office';
}

export interface AreaType {
  value: number;
  label: string;
  areaTypeId: number;
  areaType: string;
}