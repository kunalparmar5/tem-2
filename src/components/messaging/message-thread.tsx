import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";

// Mock data - will be replaced with API calls
const mockThreads = [
  {
    id: "1",
    propertyId: "1",
    propertyTitle: "Modern Apartment with City View",
    otherUser: {
      id: "user2",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    messages: [
      {
        id: "msg1",
        senderId: "user2",
        content: "Hi, I'm interested in your apartment. Is it still available?",
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        id: "msg2",
        senderId: "user1",
        content:
          "Yes, it's still available. Would you like to schedule a viewing?",
        timestamp: "2023-06-15T11:15:00Z",
      },
      {
        id: "msg3",
        senderId: "user2",
        content:
          "That would be great! I'm available this weekend, either Saturday or Sunday afternoon.",
        timestamp: "2023-06-15T11:45:00Z",
      },
      {
        id: "msg4",
        senderId: "user1",
        content:
          "Saturday at 2 PM works for me. I'll send you the address details.",
        timestamp: "2023-06-15T12:30:00Z",
      },
    ],
  },
  {
    id: "2",
    propertyId: "3",
    propertyTitle: "Luxury Villa with Pool",
    otherUser: {
      id: "user3",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    messages: [
      {
        id: "msg5",
        senderId: "user1",
        content:
          "Hello, I'm interested in your villa. Is the price negotiable?",
        timestamp: "2023-06-14T15:45:00Z",
      },
      {
        id: "msg6",
        senderId: "user3",
        content:
          "Hi there! The price is slightly negotiable depending on the terms. What did you have in mind?",
        timestamp: "2023-06-14T16:20:00Z",
      },
    ],
  },
];

export default function MessageThread() {
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState("");

  // Find the thread with the matching ID
  const thread = mockThreads.find((t) => t.id === id);

  if (!thread) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4 py-8 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Conversation Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The conversation you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
    // Add the new message to the thread
  };

  // For demo purposes, we'll assume the current user is user1
  const currentUserId = "user1";

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            Conversation with {thread.otherUser.name}
          </h1>
          <p className="text-muted-foreground">
            Regarding: {thread.propertyTitle}
          </p>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {thread.messages.map((message) => {
              const isCurrentUser = message.senderId === currentUserId;

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] gap-3 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          isCurrentUser
                            ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
                            : thread.otherUser.avatar
                        }
                        alt={isCurrentUser ? "You" : thread.otherUser.name}
                      />
                      <AvatarFallback>
                        {isCurrentUser
                          ? "You"
                          : thread.otherUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p>{message.content}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="self-end"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
