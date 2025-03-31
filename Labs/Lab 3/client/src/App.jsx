import { useState } from "react";

const App = () => {
  // States to track file-related data
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayMultipleImages, setDisplayMultipleImages] = useState([]);
  const [message, setMessage] = useState("");
  const [dogImage, setDogImage] = useState(null);

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const handleMultipleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setMultipleFiles(Array.from(e.target.files)); // Convert FileList to Array
    }
  };

  // Fetch functions -> Fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const blob = await response.blob(); // We made a blob - Binary Large Object
      // Using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // Fetch functions -> Save single file
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Fetch functions -> Save multiple files
  const handleSubmitMultipleFiles = async (e) => {
    e.preventDefault();
    if (multipleFiles.length === 0) {
      setMessage("Please select files before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      multipleFiles.forEach((file) => formData.append("files", file)); // Append multiple files

      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      setMessage("Files uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("File upload failed.");
    }
  };

  // Fetch functions -> Fetch multiple images
  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json(); // Filename list in array

      console.log(data);

      // Create an array of promises for fetching file data
      const filePromises = data.map(async (filename) => {
        const fetchFileData = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const fileBlob = await fetchFileData.blob();
        console.log(fileBlob);
        const imageUrl = URL.createObjectURL(fileBlob);

        return imageUrl; // Return the image URL for each file
      });

      // Wait for all the fetch operations to finish
      const imageUrls = await Promise.all(filePromises);

      // Now you have all the image URLs
      setDisplayMultipleImages(imageUrls); // Update state with the array of URLs
    } catch (error) {
      console.error("Error fetching multiple files:", error);
    }
  };

  //Fetch random Dog Image
  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch dog image");
      }

      setDogImage(data.message); // The API returns the image URL in 'message'
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  // Upload dog image to backend
  const submitDogImage = async () => {
    if (!dogImage) {
      setMessage("No dog image to upload.");
      return;
    }

    try {
      const response = await fetch(dogImage); // Fetch the image
      const blob = await response.blob(); // Convert to blob

      const formData = new FormData();
      formData.append("file", blob, "dog-image.jpg"); // Append blob with name

      const uploadResponse = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const data = await uploadResponse.json();
      setMessage("Dog image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading dog image:", error);
      setMessage("Failed to upload dog image.");
    }
  };

  return (
    <div>
      <h2>Fetch Random Dog Image</h2>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
      {dogImage && (
        <div>
          <h3>Random Dog</h3>
          <img
            src={dogImage}
            alt="Random Dog"
            style={{ width: "300px", marginTop: "10px" }}
          />
          <button onClick={submitDogImage}>Upload Dog Image</button>
        </div>
      )}
      <form onSubmit={handleSubmitMultipleFiles}>
        <h2>Upload Multiple Files</h2>
        <input type="file" multiple onChange={handleMultipleFileChange} />
        <button type="submit">Upload Multiple Files</button>
      </form>

      <p>{message}</p>

      {/* Fetch and display a single random image */}
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}

      {/* Fetch and display multiple random images */}
      <h2>Fetch Multiple Random Images</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      {displayMultipleImages.length > 0 ? (
        displayMultipleImages.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: "200px", height: "200px", margin: "10px" }}
            />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}

      {/* Upload Single File Form */}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      <h2>Fetch Random Dog Image</h2>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
      {dogImage && (
        <div>
          <h3>Random Dog</h3>
          <img
            src={dogImage}
            alt="Random Dog"
            style={{ width: "300px", marginTop: "10px" }}
          />
          <button onClick={submitDogImage}>Upload Dog Image</button>
        </div>
      )}
    </div>
  );
};

export default App;
