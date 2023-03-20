import * as yup from "yup";
const supportedFormats = [
  "video/mp4",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "audio/mp3",
  "audio/mpeg",
  "audio/mp4",
];
export const addSingleListingSchema = yup.object({
  name: yup.string().required("Please enter Name"),
  description: yup.string(),
  collection_name: yup.string(),
  file: yup
    .mixed()
    .nullable()
    .test("fileFormat", "Invalid file format", (value) => {
      if (!value) {
        return true; // allow null values
      }

      return supportedFormats.includes(value.type);
    })
    .required("File is required"),
  imageFile: yup
    .mixed()
    .nullable()
    .when("file", {
      is: (value) =>
        value && (value.type === "audio/mpeg" || value.type === "video/mp4"),
      then: yup
        .mixed()
        .test("fileFormat", "Invalid file format", (value) => {
          if (!value) {
            return true; // allow null values
          }
          const supportedFormats = ["image/png", "image/jpeg", "image/jpg"];
          return supportedFormats.includes(value.type);
        })
        .required("Image file is required"),
    }),
});
export const addCollectioneListingSchema = yup.object({
  name: yup.string().required("Please enter Name"),
  description: yup.string(),
  logo_image: yup.mixed().nullable().required("Logo image is required"),
  feature_image: yup.mixed().nullable().required("Feature image is required"),
  banner_image: yup.mixed().nullable().required("Banner image is required"),
});
export const saleMethodSchema = yup.object({
  asset_name: yup.string().required("Please enter asset name"),
  asset_id: yup.string().required("Please enter asset id"),
  policy_id: yup.string().required("Please enter policy id"),
  quantity: yup.string().required("Please enter quantity"),
  minted_on: yup.string().required("Please enter minted on"),
  creator: yup.string().required("Please enter creator"),
});
export const fixedPriceSchema = yup.object({
  price: yup
    .number()
    .typeError("That doesn't look like a positive number")
    .positive("A price number can't start with a minus")
    .required("Please enter price"),
});
export const auctionDealSchema = yup.object({
  sell_price: yup
    .number()
    .typeError("That doesn't look like a positive number")
    .positive("A price number can't start with a minus")
    .required("Please enter price"),
  base_price: yup.string(),
  days: yup
    .number()
    .typeError("you must specify a number")
    .min(1, "Min value 1.")
    .max(20, "Days should be maximum 20.")
    .required("Please enter days"),
  hours: yup
    .number()
    .typeError("you must specify a number")
    .min(0, "Hours should be minimum 0.")
    .max(23, "Hours should be maximum 23.")
    .required("Please enter hours"),
  minutes: yup
    .number()
    .typeError("you must specify a number")
    .min(0, "Minutes should be maximum 0.")
    .max(59, "Minutes should be maximum 59.")
    .required("Please enter minutes"),
});

export const placeYourBidSchema = yup.object({
  price: yup
    .number()
    .typeError("That doesn't look like a positive number")
    .positive("A price number can't start with a minus")
    .required("Please enter price"),
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
