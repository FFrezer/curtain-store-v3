// components/ImageDropzone.tsx
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFilesSelected: (files: File[]) => void;
}

export default function ImageDropzone({ onFilesSelected }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 cursor-pointer text-center transition-all
        ${isDragActive ? "bg-gray-200 border-gray-400" : "bg-white border-gray-300"}
      `}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">Drag & drop multiple images here, or click to select</p>
    </div>
  );
}
