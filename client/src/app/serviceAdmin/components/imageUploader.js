import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    secretAccessKey: "Dxk4x3wV68vNRsvMlP2Ot/q4qI1PDC38M2bo/M9r",
    accessKeyId: "AKIARFBUMILQ6S3M63MX",
  },
});

export const imageUploader = async (images, existingImage = false) => {
  let imageURL = {};
  let promises = [];
  console.log(images, existingImage);

  for (const [imageName, file] of Object.entries(images)) {
    if (!file) continue;

    const Key = `${Date.now()}-${imageName}`;
    const command = new PutObjectCommand({
      Bucket: "mybucket-elice",
      Key,
      Body: file,
      ContentType: file.type,
    });

    promises.push(client.send(command));
    imageURL = {
      ...imageURL,
      [imageName]: `https://mybucket-elice.s3.ap-southeast-2.amazonaws.com/${Key}`,
    };

    if (existingImage) promises.push(deleteImageS3(existingImage[imageName]));
  }
  await Promise.all(promises);
  return imageURL;
};

export const deleteImageS3 = async (imageUrl) => {
  console.log("url to delete", imageUrl);
  const input = {
    Bucket: "mybucket-elice",
    Key: imageUrl.split("/").pop().toString(),
  };
  const command = new DeleteObjectCommand(input);
  const response = await client.send(command);
  console.log("delete response from s3", response);
  return response;
};

// export const imageUploader = async (images, existingImage=false) => {
//   let imageURL = {};
//   console.log(images, existingImage)

//   for (const [imageName, file] of Object.entries(images)) {
//     if (!file) continue;

//     const Key = `${Date.now()}-${imageName}`;
//     const command = new PutObjectCommand({
//       Bucket: "mybucket-elice",
//       Key,
//       Body: file,
//       ContentType: file.type,
//     });
//     await client.send(command);

//     imageURL = {
//       ...imageURL,
//       [imageName]: `https://mybucket-elice.s3.ap-southeast-2.amazonaws.com/${Key}`,
//     };

//     if (existingImage) await deleteImageS3(existingImage[imageName]);
//     console.log("image to delete", existingImage[imageName]);
//   }
//   return imageURL;
// };
