import Link from "next/link";
import { auth } from "@cms/lib/auth";
import { prisma } from "@cms/lib/prisma";
import { Button } from "@cms/components/ui/button";
import { Card, CardContent } from "@cms/components/ui/card";
import { formatAdminDate } from "@cms/lib/utils";
import { SubmissionRow } from "@cms/pages/admin/form-submissions/SubmissionRow";

const PAGE_SIZE = 50;
const VALID_STATUSES = ["NEW", "CONTACTED", "ARCHIVED"] as const;

export default async function FormSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; formId?: string }>;
}) {
  const session = await auth();
  const userRole = (session?.user as any)?.role;

  if (userRole !== "ADMIN") {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">You don&apos;t have permission to access this page.</p>
      </div>
    );
  }

  const {
    page: pageParam,
    status: statusParam,
    formId: formIdParam,
  } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1));
  const skip = (page - 1) * PAGE_SIZE;

  const where: Record<string, unknown> = {};
  if (statusParam && (VALID_STATUSES as readonly string[]).includes(statusParam)) {
    where.status = statusParam;
  }
  if (formIdParam) where.formId = formIdParam;

  const [submissions, total, formGroups] = await Promise.all([
    (prisma as any).formSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    (prisma as any).formSubmission.count({ where }),
    // Form versions coexist in this table, so the filter is built from the data.
    (prisma as any).formSubmission.groupBy({
      by: ["formId"],
      _count: { _all: true },
      orderBy: { formId: "asc" },
    }),
  ]);

  const formIds: string[] = formGroups.map((g: any) => g.formId);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasFilters = !!statusParam || !!formIdParam;

  function buildPageUrl(p: number) {
    const params = new URLSearchParams();
    if (statusParam) params.set("status", statusParam);
    if (formIdParam) params.set("formId", formIdParam);
    params.set("page", String(p));
    return `/admin/form-submissions?${params.toString()}`;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Form Submissions</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{total} total</span>
          {/* Exports every submission, not just the current page or filter. */}
          <Button asChild variant="outline" size="sm">
            <a href="/api/form-submissions/export" download>
              Export all (CSV)
            </a>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <form method="GET" className="flex items-center gap-3">
        <select
          name="status"
          defaultValue={statusParam ?? ""}
          className="border border-border rounded-[var(--radius)] px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All statuses</option>
          {VALID_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          name="formId"
          defaultValue={formIdParam ?? ""}
          className="border border-border rounded-[var(--radius)] px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All forms</option>
          {formIds.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <Button type="submit" variant="outline" size="sm">Filter</Button>
        {hasFilters && (
          <Link href="/admin/form-submissions" className="text-sm text-muted-foreground hover:text-foreground transition">
            Clear
          </Link>
        )}
      </form>

      <Card>
        {submissions.length === 0 ? (
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">No submissions yet.</p>
          </CardContent>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-6 py-3 text-left font-medium text-sm">Date</th>
                    <th className="px-6 py-3 text-left font-medium text-sm">Contact</th>
                    <th className="px-6 py-3 text-left font-medium text-sm">Company / Domain</th>
                    <th className="px-6 py-3 text-left font-medium text-sm">Email</th>
                    <th className="px-6 py-3 text-left font-medium text-sm">Status</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub: any) => (
                    <SubmissionRow
                      key={sub.id}
                      sub={sub}
                      formattedDate={formatAdminDate(sub.createdAt)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
                <div className="flex gap-2">
                  {page > 1 && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={buildPageUrl(page - 1)}>← Previous</Link>
                    </Button>
                  )}
                  {page < totalPages && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={buildPageUrl(page + 1)}>Next →</Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
