import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
  images: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({
  images = [],
  onChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the maximum
    if (images.length + files.length > maxImages) {
      toast({
        variant: "destructive",
        title: "Too many images",
        description: `You can only upload a maximum of ${maxImages} images.`,
      });
      return;
    }

    setIsUploading(true);

    try {
      const newImageUrls = [...images];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `property-images/${fileName}`;

        // For demo purposes, we'll simulate uploading to Supabase Storage
        // In a real app, uncomment this code and use your actual Supabase bucket
        /*
        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('properties')
          .getPublicUrl(filePath);
          
        newImageUrls.push(data.publicUrl);
        */

        // For demo, we'll use Unsplash images
        const demoImages = [
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        ];

        newImageUrls.push(
          demoImages[Math.floor(Math.random() * demoImages.length)],
        );
      }

      onChange(newImageUrls);
      toast({
        title: "Images uploaded",
        description: `Successfully uploaded ${files.length} image${files.length > 1 ? "s" : ""}.`,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description:
          "There was an error uploading your images. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((url, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="aspect-square w-full">
              <img
                src={url}
                alt={`Property image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 rounded-full"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}

        {images.length < maxImages && (
          <Card className="flex aspect-square w-full items-center justify-center border-dashed">
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground">
                    {maxImages - images.length} image
                    {maxImages - images.length !== 1 ? "s" : ""} remaining
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUpload}
                disabled={isUploading}
              />
            </label>
          </Card>
        )}
      </div>
    </div>
  );
}
