import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, Image, Video, X, Brain } from "lucide-react";
import loaderWebM from "../assets/animationv1.webm";
import { useNavigate } from "react-router";
import BASE_URL from "../utils/helper";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // Set playback rate for the loader animation
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, [videoRef]);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFiles([file]);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setIsAnalyzed(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "video/*": [".mp4", ".webm"],
    },
    maxFiles: 1,
  });

  // Remove the selected file
  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFiles([]);
    setPreview(null);
    setIsAnalyzed(false);
  };

  // Handle analysis
  const handleAnalysis = () => {
    if (files.length === 0) {
      console.error("No file selected.");
      return;
    }

    const file = files[0];

    setLoading(true);

    // Simulate loading state
    setTimeout(() => {
      setLoading(false);
      setIsAnalyzed(true);
    }, 3600);

    try {
      const formData = new FormData();
      formData.append("fileName", file.name);
      formData.append("file", file);
      formData.append("fileSize", file.size.toString());

      // Send the file to the backend API
      fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to upload file.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    } catch (err) {
      console.error("Error while uploading file:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Upload Media for Analysis
          </h1>
          <p className="text-gray-400">
            Drop your image or video file to begin facial recognition
          </p>
        </div>

        <div className="mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-600 hover:border-blue-500 hover:bg-gray-800/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <UploadIcon className="w-12 h-12 text-gray-400" />
              <div className="text-gray-300">
                {isDragActive ? (
                  <p>Drop your file here...</p>
                ) : (
                  <div>
                    <p className="font-medium">Drag & drop your file here</p>
                    <p className="text-sm text-gray-400 mt-1">
                      or click to select a file
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Image className="w-4 h-4 mr-1" />
                  Images
                </span>
                <span className="flex items-center">
                  <Video className="w-4 h-4 mr-1" />
                  Videos
                </span>
              </div>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-6"
          >
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="flex flex-col items-center gap-3">
                  <video
                    ref={videoRef}
                    src={loaderWebM}
                    autoPlay
                    loop
                    muted
                    className="h-40"
                  />
                  <p className="text-md font-medium text-gray-300">
                    Analyzing...
                  </p>
                </div>
              </div>
            ) : isAnalyzed ? (
              <div className="flex flex-col items-center justify-center py-10">
                <p className="text-md font-semibold text-gray-300 mb-4">
                  Subscribe to Preview Results
                </p>
                <button
                  onClick={() => navigate("/pricing")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Selected File</h3>
                  <button
                    onClick={removeFile}
                    className="p-2 hover:bg-red-500/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  {preview &&
                    (files[0].type.startsWith("image") ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={preview}
                        controls
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                </div>

                <button
                  className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={handleAnalysis}
                >
                  <Brain className="w-5 h-5" />
                  <span>Start Analysis</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;
