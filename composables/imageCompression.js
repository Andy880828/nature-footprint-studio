import imageCompression from 'browser-image-compression';
export default async function (file) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
}
