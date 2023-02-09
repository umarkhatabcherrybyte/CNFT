import * as yup from "yup";

export const addSingleListingSchema = yup.object({
  name: yup.string().required("Please enter Name"),
  description: yup.string(),
  policy_id: yup.string().required("Please enter Policy ID"),
  collection_name: yup.string(),
});
const validationSchema = yup.object({
  platform_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Please enter website"),
  platform_name: yup.string("").required("Game Name is required"),
});
