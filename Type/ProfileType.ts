export interface ProfileDataType {
  banner: string[];
  greeting: string;
  name: string;
  point: number;
  qrcode: string;
  saldo: number;
}

export interface PayloadProfileType {
  result: ProfileDataType;
  status: string;
}
