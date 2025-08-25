import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface VideoUploadProps {
  videos: string[];
  onChange: (urls: string[]) => void;
  maxVideos?: number;
}

export default function VideoUpload({
  videos = [],
  onChange,
  maxVideos = 2,
}: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the maximum
    if (videos.length + files.length > maxVideos) {
      toast({
        variant: "destructive",
        title: "Too many videos",
        description: `You can only upload a maximum of ${maxVideos} videos.`,
      });
      return;
    }

    setIsUploading(true);

    try {
      const newVideoUrls = [...videos];

      for (let i = 0; i < files.length; i++) {
        // For demo purposes, we'll use sample videos
        const demoVideos = [
          "https://assets.mixkit.co/videos/preview/mixkit-tour-of-a-wooden-house-with-a-pool-32473-large.mp4",
          "https://assets.mixkit.co/videos/preview/mixkit-modern-house-with-pool-32472-large.mp4",
        ];

        newVideoUrls.push(
          demoVideos[Math.floor(Math.random() * demoVideos.length)],
        );
      }

      onChange(newVideoUrls);
      toast({
        title: "Videos uploaded",
        description: `Successfully uploaded ${files.length} video${files.length > 1 ? "s" : ""}.`,
      });
    } catch (error) {
      console.error("Error uploading videos:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description:
          "There was an error uploading your videos. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    onChange(newVideos);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {videos.map((url, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="aspect-video w-full">
              <video
                src={url}
                controls
                className="h-full w-full object-cover"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 rounded-full"
              onClick={() => handleRemoveVideo(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}

        {videos.length < maxVideos && (
          <Card className="flex aspect-video w-full items-center justify-center border-dashed">
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload video</p>
                  <p className="text-xs text-muted-foreground">
                    {maxVideos - videos.length} video
                    {maxVideos - videos.length !== 1 ? "s" : ""} remaining
                  </p>
                </div>
              </div>
              <input
                type="file"
                accept="video/*"
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
