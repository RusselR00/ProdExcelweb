import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unresponded" | "responded" | "closed";
  createdAt: string;
}

const statusColors: Record<string, string> = {
  unresponded: "bg-red-100 text-red-800 hover:bg-red-200",
  responded: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  closed: "bg-green-100 text-green-800 hover:bg-green-200",
};

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/messages", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setLocation("/admin/login");
          return;
        }
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setLocation("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async function handleStatusChange(messageId: string, newStatus: "unresponded" | "responded" | "closed") {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Update local state
      setMessages(messages.map(msg => msg.id === messageId ? { ...msg, status: newStatus } : msg));
      toast({
        title: "Status Updated",
        description: `Message marked as ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Contact Messages</h1>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            Logout
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading messages...</div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-slate-500">
              No messages yet
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Received Messages ({messages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow key={msg.id} data-testid={`row-message-${msg.id}`}>
                        <TableCell className="font-medium" data-testid={`text-name-${msg.id}`}>
                          {msg.name}
                        </TableCell>
                        <TableCell data-testid={`text-email-${msg.id}`}>{msg.email}</TableCell>
                        <TableCell className="font-medium" data-testid={`text-subject-${msg.id}`}>
                          {msg.subject}
                        </TableCell>
                        <TableCell className="max-w-2xl whitespace-pre-wrap" data-testid={`text-message-${msg.id}`}>
                          {msg.message}
                        </TableCell>
                        <TableCell data-testid={`cell-status-${msg.id}`}>
                          <div className="flex gap-2 flex-wrap">
                            {(["unresponded", "responded", "closed"] as const).map((s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(msg.id, s)}
                                className={`px-3 py-1 rounded text-sm font-medium cursor-pointer transition-colors ${
                                  msg.status === s ? statusColors[s] : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                data-testid={`button-status-${s}-${msg.id}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell data-testid={`text-date-${msg.id}`}>
                          {format(new Date(msg.createdAt), "MMM dd, yyyy HH:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
