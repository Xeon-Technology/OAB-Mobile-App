import React, { useCallback, useContext, useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';

import {
  IUser,
  IUseData,
  ITheme,
} from '../constants/types';

import {
  USERS,

} from '../constants/mocks';
import { light } from '../constants';
import { IAuthData } from '../core/data/models/AuthData';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [users, setUsers] = useState<IUser[]>(USERS);

  const [authData, setAuthData] = useState<IAuthData | null>(null);
  const [currentUserAccountId, setClientId] = useState<Number | null>(null);
  const [currentUserId, setUserId] = useState<Number | null>(null);
  const [currentUserAccountName, setClientName] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentUserAccountAddress, setClientAddress] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);

  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preferance gtom storage
    const isDarkJSON = await Storage.getItem('isDark');

    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark],
  );

  const getAuthData = () => {
    return authData;
  }

  // handle users / profiles
  const handleUsers = useCallback(
    (payload: IUser[]) => {
      // set users / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(users)) {
        setUsers({ ...users, ...payload });
      }
    },
    [users, setUsers],
  );

  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? light : light);
  }, [isDark]);

  const logout = useCallback((callback?: () => void) => {

    Storage.removeItem("authData");
    setAuthData(null);
    setClientId(null)
    setUserId(null);
    setClientName(null);
    setCurrentUser(null);
    setClientAddress(null);
    setRoles([]);

    setTimeout(() => callback && callback(), 0);
  }, [setAuthData, setClientId, setUserId, setClientName, setCurrentUser, setClientAddress]);

  const handleAuthData = useCallback(
    (payload: IAuthData) => {
      if (JSON.stringify(payload) !== JSON.stringify(authData)) {
        Storage.setItem('authData', JSON.stringify(payload));
        setAuthData(payload);
        if (payload?.me?.userAccounts[0]?.accountId) setClientId(payload?.me?.userAccounts[0]?.accountId);
        if (payload?.me) setUserId(payload?.me?.id || null);
        if (payload?.me) setClientName(payload?.me?.fullName);
        if (payload?.me) setCurrentUser(payload?.me?.userName);
        if (payload?.me) setClientAddress(payload?.me?.address);
        if (payload?.roles) setRoles(payload?.roles || []);
      }
    },
    [authData, setAuthData],
  );

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    users,
    handleUsers,
    handleUser,
    logout,
    authData,
    currentUserAccountId,
    currentUserId,
    currentUserAccountName,
    handleAuthData,
    currentUserAccountAddress,
    currentUser,
    getAuthData,
    roles

  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
