export interface IUser {
  userName: string;
  userId: string;
  accessToken?: string;
  displayName?: string;
  tokenExpiration?: string;
  selectedRole?: string;
  roles?: string[];
  fieldIds?: number[];
}
