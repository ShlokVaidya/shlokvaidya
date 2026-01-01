import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Shlok Vaidya",
  description: "Open-source projects and experimental work. From Raspberry Pi clusters to full-stack applications.",
  openGraph: {
    title: "Projects | Shlok Vaidya",
    description: "Open-source projects and experimental work.",
    url: "https://shlokvaidya.com/project",
    type: "website",
  },
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
