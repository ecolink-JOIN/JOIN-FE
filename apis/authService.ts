// import { AxiosResponse } from 'axios';

// import { API, setAccess, storeAccess, useSignUpStore, useCompanyStore } from '@/shared';

// export const AuthService = () => {
//   const userStore = useSignUpStore((state) => state);
//   const setCompany = useCompanyStore((state) => state.setCompany);

//   const signin = async (body: Company.SignInReqDto) => {
//     const { data } = (await API.post('/login', body)) as AxiosResponse<Company.SignInResDto>;
//     setAccess(data.result.access_token);
//     storeAccess(data.result.access_token);
//     setCompany(data.result);
//     return data;
//   };

//   const signup = async (body: Company.SignUpReqDto) => {
//     const { data } = (await API.post('/signup', body)) as AxiosResponse<Company.SignUpResDto>;
//     return data;
//   };
//   return { signin, signup };
// };
