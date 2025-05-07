const cloudinary = require('../helpers/cloudinary');
  // Function to upload an image
  exports.uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
  
      // If you need to store the Cloudinary image ID in your database, you can do it here.
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };