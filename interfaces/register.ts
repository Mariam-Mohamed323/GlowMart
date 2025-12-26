export interface RegisterUserResponse {
    name: string,
    email: string,
    password: string,
    rePassword: string,
    phone: string
}

export interface SuccessRegisterResponse{
    message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}


export interface RegisterFailureResponse {
  message: string;
  errors: {
    value: string;
    msg: string;
    param: string;
    location: string;
  };
}

export interface GenericResponse {
  message: string;
  statusMsg?: string; 
}

export type SignUpResult = {
  message: string;
  statusMsg?: string;
  user?: SuccessRegisterResponse["user"];
  token?: string;
  errors?: RegisterFailureResponse["errors"];
} & Partial<{ networkError: string }>;
