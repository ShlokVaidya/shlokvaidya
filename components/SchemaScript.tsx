import Script from "next/script";

export default function SchemaScript() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shlok Vaidya",
    description: "High school developer and builder",
    url: "https://shlokvaidya.com",
    image: "https://shlokvaidya.com/profile.jpg",
    sameAs: [
      "https://github.com/ShlokVaidya",
      "https://twitter.com/shlokvaidya",
    ],
    knowsAbout: ["Web Development", "Raspberry Pi", "Full-Stack Development", "Open Source"],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
