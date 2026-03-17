import React, { useCallback, useEffect, useState } from "react";
import { Mail, Loader2, CheckCircle2, Trash2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { contactsService, ContactQuery } from "@/services/api";

const formatDate = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleString();
};

const ContactsAdmin: React.FC = () => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchQueries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contactsService.getAllContactQueries();
      setQueries(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contact queries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  const withUpdating = async (id: string, action: () => Promise<void>) => {
    setUpdatingIds((prev) => [...prev, id]);
    try {
      await action();
    } finally {
      setUpdatingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const markRead = async (id: string) => {
    await withUpdating(id, async () => {
      await contactsService.markContactQueryRead(id);
      setQueries((prev) =>
        prev.map((query) => (query._id === id ? { ...query, isRead: true } : query))
      );
      toast({
        title: "Updated",
        description: "Marked query as read",
      });
    });
  };

  const deleteQuery = async (id: string) => {
    if (!window.confirm("Delete this contact query?")) return;

    await withUpdating(id, async () => {
      await contactsService.deleteContactQuery(id);
      setQueries((prev) => prev.filter((query) => query._id !== id));
      toast({
        title: "Deleted",
        description: "Contact query removed",
      });
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Contact Queries ({queries.length})</CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={fetchQueries}
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                Loading contact queries...
              </span>
            </div>
          ) : queries.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No contact queries yet</h3>
              <p className="text-muted-foreground">
                New messages from the Contact form will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {queries.map((query) => {
                const isUpdating = updatingIds.includes(query._id);

                return (
                  <div
                    key={query._id}
                    className="rounded-lg border border-border p-4 sm:p-5 bg-card/40"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-semibold">{query.name}</h4>
                          <Badge variant={query.isRead ? "secondary" : "default"}>
                            {query.isRead ? "Read" : "New"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{query.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(query.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!query.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isUpdating}
                            className="gap-2"
                            onClick={() => markRead(query._id)}
                          >
                            <CheckCircle2 size={14} />
                            Mark read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isUpdating}
                          className="gap-2"
                          onClick={() => deleteQuery(query._id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                      {query.message}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsAdmin;
