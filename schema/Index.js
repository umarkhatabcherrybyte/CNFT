import * as yup from "yup";

export const addSingleListingSchema = yup.object({
  name: yup.string().required("Please enter Name"),
  description: yup.string(),
  policy_id: yup.string().required("Please enter Policy ID"),
  collection_name: yup.string().required("Please enter Policy ID"),
  file: yup.mixed().nullable().required("File is required"),
  // .test(
  //   "fileSize",
  //   "File Size is too large",
  //   (value) => value && value.size <= FILE_SIZE
  // )
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // ),
});
export const addCollectioneListingSchema = yup.object({
  name: yup.string().required("Please enter Name"),
  description: yup.string(),
  logo_image: yup.mixed().nullable().required("Logo image is required"),
  feature_image: yup.mixed().nullable().required("Feature image is required"),
  banner_image: yup.mixed().nullable().required("Banner image is required"),
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
