import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type BlogNavProps = {
  prev?: {
    title: string;
    summary: string;
    slug: string;
  };
  next?: {
    title: string;
    summary: string;
    slug: string;
  };
};

export function Navigator({ prev, next }: BlogNavProps) {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev && (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col justify-between border border-muted rounded-2xl p-5 hover:bg-muted/20 transition-all duration-200"
        >
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Previous Post
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary">
              {prev.title}
            </h4>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {prev.summary}
            </p>
          </div>
        </Link>
      )}

      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col justify-between border border-muted rounded-2xl p-5 hover:bg-muted/20 transition-all duration-200 text-right"
        >
          <div className="flex items-center justify-end text-sm text-muted-foreground mb-2">
            Next Post
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary">
              {next.title}
            </h4>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {next.summary}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
