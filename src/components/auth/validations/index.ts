import * as Yup from "yup";

export const canAuthenticate = async (data: object): Promise<void> => {
  const schema = Yup.object().shape({
    token: Yup.string().required("Token is required"),
    email: Yup.string().required("Email is required"),
  });

  await schema.validate(data, {
    abortEarly: false,
  });
};
