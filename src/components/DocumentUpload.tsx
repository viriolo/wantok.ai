
import { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FileUp, X, FileText, CheckCircle } from "lucide-react";

const DocumentUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.type === "application/pdf" || 
      file.type.startsWith("image/") ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    );
    
    if (newFiles.length !== files.length) {
      toast({
        title: "Unsupported file type",
        description: "Only PDF, images, and Excel files are supported",
        variant: "destructive",
      });
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const uploadFiles = async () => {
    if (uploadedFiles.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Documents uploaded successfully",
        description: `${uploadedFiles.length} files have been uploaded and are being processed`,
      });
      
      setUploadedFiles([]);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-4 w-4 text-png-red" />;
    } else if (file.type.startsWith("image/")) {
      return <FileText className="h-4 w-4 text-blue-500" />;
    } else {
      return <FileText className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <BlurCard className="p-6" variant="bordered">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Document Upload</h2>
          <p className="text-sm text-foreground/70">
            Upload your financial documents for AI-powered tax processing
          </p>
        </div>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 transition-colors text-center ${
            dragActive ? "border-png-red bg-png-red/5" : "border-gray-300 dark:border-gray-700"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileUp className="h-12 w-12 mx-auto mb-4 text-foreground/50" />
          <p className="text-foreground/80 mb-2">
            Drag and drop your files here, or click to browse
          </p>
          <p className="text-sm text-foreground/60 mb-4">
            Supports PDF, images, and Excel files
          </p>
          <Input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
          />
          <Label htmlFor="file-upload">
            <Button 
              type="button" 
              variant="outline"
              className="cursor-pointer"
            >
              Browse Files
            </Button>
          </Label>
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Files to upload ({uploadedFiles.length})</h3>
            <div className="space-y-2 max-h-60 overflow-auto pr-2">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-foreground/60">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-7 w-7"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button 
                className="w-full bg-png-red hover:bg-png-red/90"
                onClick={uploadFiles}
                disabled={uploading}
              >
                {uploading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading files...
                  </span>
                ) : (
                  "Upload Files"
                )}
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 space-y-2">
          <h3 className="font-medium">Upload Guidelines</h3>
          <div className="space-y-2 text-sm text-foreground/70">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-png-red mt-0.5 flex-shrink-0" />
              <p>Upload clear, legible documents for best results</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-png-red mt-0.5 flex-shrink-0" />
              <p>All data is encrypted and handled according to PNG data protection laws</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-png-red mt-0.5 flex-shrink-0" />
              <p>Our AI will automatically extract relevant tax information</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-png-red mt-0.5 flex-shrink-0" />
              <p>Maximum file size: 20MB per document</p>
            </div>
          </div>
        </div>
      </BlurCard>
    </div>
  );
};

export default DocumentUpload;
