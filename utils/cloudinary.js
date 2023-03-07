const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dfmieogdm",
  api_key: "828293999971529",
  api_secret: "B7LvLx52czrWfAlWRcN40ujUInA",
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = {
  cloudinaryUploadImg,
};

// Upload

// const res = cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }
// );

// res
//   .then((data) => {
//     console.log(data);
//     console.log(data.secure_url);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Generate
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: "fill",
// });

// // The output url
// console.log(url);
// // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
