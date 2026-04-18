"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, Film, ImageIcon } from "lucide-react";
import Image from "next/image";
import { uploadFiles } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
}

export default function FileUpload({ value, onChange, multiple = true, accept = "image/*,video/*", label = "Ảnh / Video" }: Props) {
  const token = useAuthStore((s) => s.token) || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const results = await uploadFiles(token, files);
      const newUrls = results.map((r) => r.url);
      onChange(multiple ? [...value, ...newUrls] : newUrls.slice(0, 1));
    } catch (err: any) {
      alert("Upload thất bại: " + err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url);
  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3031";
  const fullUrl = (url: string) => url.startsWith("http") ? url : `${apiBase}${url}`;

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label}</label>

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {value.map((url, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden bg-muted aspect-square">
              {isVideo(url) ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <Film className="h-8 w-8 text-muted-foreground" />
                </div>
              ) : (
                <Image src={fullUrl(url)} alt="" fill className="object-cover" />
              )}
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full border-2 border-dashed border-border/50 rounded-xl p-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-50"
      >
        {uploading ? (
          <><Loader2 className="h-6 w-6 animate-spin text-primary" /><span className="text-sm">Đang tải lên...</span></>
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span className="text-sm font-medium">Nhấn để chọn file</span>
            <span className="text-xs">Hỗ trợ ảnh (JPG, PNG, WEBP) và video (MP4, WEBM)</span>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFiles}
        className="hidden"
      />
    </div>
  );
}
