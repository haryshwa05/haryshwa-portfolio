import Callout from "@/components/blog/mdx/Callout";
import MathBlock from "@/components/blog/mdx/MathBlock";
import CompareTable from "@/components/blog/mdx/CompareTable";
import Insight from "@/components/blog/mdx/Insight";
import Divider from "@/components/blog/mdx/Divider";

interface Props {
  content: string;
  accentColor?: string;
}

// ----- Tiny MDX block parser -----
// Splits content into logical blocks and renders each one.

type Block =
  | { type: "custom"; tag: string; props: Record<string, string>; children: string }
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "blockquote"; text: string }
  | { type: "codeblock"; lang: string; code: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "p"; text: string }
  | { type: "blank" };

function parseProps(attrStr: string): Record<string, string> {
  const props: Record<string, string> = {};
  // match key="value" or key='value' pairs
  const re = /(\w+)=["']([^"']*)["']/g;
  let m;
  while ((m = re.exec(attrStr)) !== null) {
    props[m[1]] = m[2];
  }
  return props;
}

function parseTableProps(attrStr: string): {
  labelA: string;
  labelB: string;
  rows: { label: string; a: string; b: string }[];
} {
  const labelA = (attrStr.match(/labelA=["']([^"']*)["']/) ?? [])[1] ?? "";
  const labelB = (attrStr.match(/labelB=["']([^"']*)["']/) ?? [])[1] ?? "";
  const title = (attrStr.match(/title=["']([^"']*)["']/) ?? [])[1] ?? "";
  const rowMatches = attrStr.matchAll(/\{\s*label:\s*["']([^"']*)["'],\s*a:\s*["']([^"']*)["'],\s*b:\s*["']([^"']*)["']\s*\}/g);
  const rows: { label: string; a: string; b: string }[] = [];
  for (const m of rowMatches) {
    rows.push({ label: m[1], a: m[2], b: m[3] });
  }
  return { labelA, labelB, rows };
}

function tokenizeBlocks(raw: string): Block[] {
  const blocks: Block[] = [];
  const lines = raw.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") { i++; continue; }

    // JSX-style block components (multi-line or self-closing)
    const customMatch = line.match(/^<(\w+)(\s[^>]*)?>$/);
    const selfClosingMatch = line.match(/^<(\w+)(\s[^>]*)?\/\s*>$/);

    if (selfClosingMatch) {
      const tag = selfClosingMatch[1];
      const props = parseProps(selfClosingMatch[2] ?? "");
      blocks.push({ type: "custom", tag, props, children: "" });
      i++; continue;
    }

    if (customMatch) {
      const tag = customMatch[1];
      const props = parseProps(customMatch[2] ?? "");
      // collect children until closing tag
      const childLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(`</${tag}`)) {
        childLines.push(lines[i]);
        i++;
      }
      i++; // skip closing tag
      blocks.push({ type: "custom", tag, props, children: childLines.join("\n") });
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "codeblock", lang, code: codeLines.join("\n") });
      continue;
    }

    // Headings
    if (line.startsWith("## ")) { blocks.push({ type: "h2", text: line.slice(3) }); i++; continue; }
    if (line.startsWith("### ")) { blocks.push({ type: "h3", text: line.slice(4) }); i++; continue; }
    if (line.startsWith("# ")) { blocks.push({ type: "h1", text: line.slice(2) }); i++; continue; }

    // HR
    if (line.match(/^---+$/)) { blocks.push({ type: "hr" }); i++; continue; }

    // Blockquote
    if (line.startsWith("> ")) { blocks.push({ type: "blockquote", text: line.slice(2) }); i++; continue; }

    // Unordered list — collect all consecutive list items
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraph — collect until blank line
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("```") && !lines[i].startsWith(">") && !lines[i].match(/^[-*] /) && !lines[i].match(/^\d+\. /) && !lines[i].startsWith("<")) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join(" ") });
    } else {
      i++;
    }
  }

  return blocks;
}

/** Apply inline markdown: **bold**, *italic*, `code`, [link](url) */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Combined regex for all inline patterns
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={key++} style={{ color: "var(--text)", fontWeight: 600 }}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++} style={{ color: "var(--accent-bright)", fontStyle: "italic" }}>{match[4]}</em>);
    } else if (match[5]) {
      parts.push(
        <code key={key++} style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.875em",
          background: "var(--code-bg)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "0.1em 0.4em",
          color: "var(--accent-bright)",
        }}>
          {match[6]}
        </code>
      );
    } else if (match[7]) {
      parts.push(
        <a key={key++} href={match[9]} style={{
          color: "var(--accent-bright)",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}>
          {match[8]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function renderBlock(block: Block, idx: number): React.ReactNode {
  switch (block.type) {
    case "h1":
      return (
        <h1 key={idx} style={{
          fontFamily: "var(--font-instrument)",
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          fontStyle: "italic",
          color: "var(--text)",
          lineHeight: 1.2,
          marginTop: "3rem",
          marginBottom: "1rem",
        }}>
          {renderInline(block.text)}
        </h1>
      );

    case "h2":
      return (
        <h2 key={idx} style={{
          fontFamily: "var(--font-instrument)",
          fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
          fontStyle: "italic",
          color: "var(--text)",
          lineHeight: 1.25,
          marginTop: "2.5rem",
          marginBottom: "0.875rem",
          paddingTop: "1rem",
          borderTop: "1px solid var(--border)",
        }}>
          {renderInline(block.text)}
        </h2>
      );

    case "h3":
      return (
        <h3 key={idx} style={{
          fontFamily: "var(--font-syne)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--text)",
          lineHeight: 1.3,
          marginTop: "2rem",
          marginBottom: "0.625rem",
          letterSpacing: "0.02em",
        }}>
          {renderInline(block.text)}
        </h3>
      );

    case "hr":
      return <Divider key={idx} />;

    case "blockquote":
      return (
        <blockquote key={idx} style={{
          borderLeft: "2px solid var(--accent)",
          paddingLeft: "1.25rem",
          margin: "1.5rem 0",
          color: "var(--text-muted)",
          fontStyle: "italic",
          fontFamily: "var(--font-instrument)",
          fontSize: "1.0625rem",
          lineHeight: 1.7,
        }}>
          {renderInline(block.text)}
        </blockquote>
      );

    case "codeblock":
      return (
        <pre key={idx} style={{
          background: "var(--code-bg)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          overflowX: "auto",
          padding: "1.25rem",
          margin: "1.5rem 0",
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "var(--text-muted)",
        }}>
          {block.lang && (
            <div style={{
              fontFamily: "var(--font-syne)",
              fontSize: "0.5625rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              marginBottom: "0.75rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border)",
            }}>
              {block.lang}
            </div>
          )}
          <code style={{ color: "var(--text-muted)" }}>{block.code}</code>
        </pre>
      );

    case "ul":
      return (
        <ul key={idx} style={{
          listStyle: "none",
          padding: 0,
          margin: "1rem 0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {block.items.map((item, j) => (
            <li key={j} style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.9375rem",
              color: "var(--text-muted)",
              lineHeight: 1.75,
              display: "flex",
              gap: "0.6rem",
              alignItems: "flex-start",
            }}>
              <span style={{ color: "var(--accent2)", flexShrink: 0, marginTop: "0.2em" }}>→</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={idx} style={{
          paddingLeft: "1.5rem",
          margin: "1rem 0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {block.items.map((item, j) => (
            <li key={j} style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.9375rem",
              color: "var(--text-muted)",
              lineHeight: 1.75,
            }}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );

    case "p":
      return (
        <p key={idx} style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.9375rem",
          color: "var(--text-muted)",
          lineHeight: 1.85,
          marginBottom: "1.4rem",
        }}>
          {renderInline(block.text)}
        </p>
      );

    case "custom":
      return renderCustomComponent(block, idx);

    default:
      return null;
  }
}

function renderCustomComponent(
  block: { tag: string; props: Record<string, string>; children: string },
  idx: number
): React.ReactNode {
  const { tag, props, children } = block;

  switch (tag) {
    case "Callout":
      return (
        <Callout
          key={idx}
          type={(props.type as "info" | "warning" | "success" | "error") ?? "info"}
          title={props.title}
        >
          {children.trim() || null}
        </Callout>
      );

    case "MathBlock":
      return (
        <MathBlock key={idx} label={props.label}>
          {children.trim()}
        </MathBlock>
      );

    case "Insight":
      return <Insight key={idx}>{children.trim()}</Insight>;

    case "Divider":
      return <Divider key={idx} label={props.label} />;

    case "CompareTable": {
      const { labelA, labelB, rows } = parseTableProps(
        Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(" ") +
        "\n" + children
      );
      return (
        <CompareTable
          key={idx}
          labelA={labelA}
          labelB={labelB}
          rows={rows}
          title={props.title}
        />
      );
    }

    default:
      return null;
  }
}

export default function BlogContent({ content }: Props) {
  const blocks = tokenizeBlocks(content);

  return (
    <div style={{ maxWidth: "100%" }}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}
