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
  | { type: "table"; headers: string[]; rows: string[][] }
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
  const rowMatches = attrStr.matchAll(/\{\s*label:\s*["']([^"']*)["'],\s*a:\s*["']([^"']*)["'],\s*b:\s*["']([^"']*)["']\s*\}/g);
  const rows: { label: string; a: string; b: string }[] = [];
  for (const m of rowMatches) {
    rows.push({ label: m[1], a: m[2], b: m[3] });
  }
  return { labelA, labelB, rows };
}

function splitMarkdownTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isMarkdownTableSeparator(line: string): boolean {
  const cells = splitMarkdownTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
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

    // Markdown table
    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      lines[i + 1].trim().startsWith("|") &&
      isMarkdownTableSeparator(lines[i + 1])
    ) {
      const headers = splitMarkdownTableRow(line);
      i += 2;

      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitMarkdownTableRow(lines[i]));
        i++;
      }

      blocks.push({ type: "table", headers, rows });
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
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("```") && !lines[i].startsWith(">") && !lines[i].match(/^[-*] /) && !lines[i].match(/^\d+\. /) && !lines[i].startsWith("<") && !lines[i].trim().startsWith("|")) {
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

type CodeTokenType =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "function"
  | "decorator"
  | "operator";

interface CodeToken {
  type: CodeTokenType;
  value: string;
}

function tokenizeCode(code: string, lang: string): CodeToken[] {
  const supportedLangs = new Set(["python", "py", "javascript", "js", "typescript", "ts", "tsx", "jsx"]);
  const language = lang.toLowerCase();

  if (!supportedLangs.has(language)) {
    return [{ type: "plain", value: code }];
  }

  const keywordSet = new Set(
    language === "python"
      ? ["False", "None", "True", "and", "as", "break", "class", "continue", "def", "elif", "else", "except", "finally", "for", "from", "if", "import", "in", "is", "lambda", "not", "or", "pass", "return", "try", "while", "with", "yield"]
      : ["async", "await", "break", "case", "catch", "class", "const", "continue", "default", "else", "export", "extends", "false", "finally", "for", "from", "function", "if", "import", "in", "let", "new", "null", "return", "static", "switch", "throw", "true", "try", "typeof", "var", "while"]
  );

  const tokens: CodeToken[] = [];
  let i = 0;

  while (i < code.length) {
    const ch = code[i];

    if (ch === "#" && (language === "python" || language === "py")) {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      tokens.push({ type: "comment", value: code.slice(i, j) });
      i = j;
      continue;
    }

    if (ch === "/" && code[i + 1] === "/") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      tokens.push({ type: "comment", value: code.slice(i, j) });
      i = j;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\" && j + 1 < code.length) {
          j += 2;
          continue;
        }
        if (code[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ type: "string", value: code.slice(i, j) });
      i = j;
      continue;
    }

    if ((language === "python" || language === "py") && ch === "@") {
      let j = i + 1;
      while (j < code.length && /[\w.]/.test(code[j])) j++;
      tokens.push({ type: "decorator", value: code.slice(i, j) });
      i = j;
      continue;
    }

    if (/\d/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[\d._]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[\w]/.test(code[j])) j++;
      const word = code.slice(i, j);

      let k = j;
      while (k < code.length && /\s/.test(code[k]) && code[k] !== "\n") k++;
      const isFunction = code[k] === "(";

      if (keywordSet.has(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (isFunction) {
        tokens.push({ type: "function", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }
      i = j;
      continue;
    }

    if (/[=+\-*/<>!%|&^~.:]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[=+\-*/<>!%|&^~.:]/.test(code[j])) j++;
      tokens.push({ type: "operator", value: code.slice(i, j) });
      i = j;
      continue;
    }

    tokens.push({ type: "plain", value: ch });
    i++;
  }

  return tokens;
}

function getCodeTokenColor(type: CodeTokenType): string {
  switch (type) {
    case "comment":
      return "#7a6f61";
    case "string":
      return "#0f766e";
    case "keyword":
      return "#b42318";
    case "number":
      return "#7c3aed";
    case "function":
      return "#0057ff";
    case "decorator":
      return "#c2410c";
    case "operator":
      return "#111827";
    default:
      return "var(--text)";
  }
}

function renderCode(code: string, lang: string): React.ReactNode {
  return tokenizeCode(code, lang).map((token, idx) => (
    <span key={idx} style={{ color: getCodeTokenColor(token.type) }}>
      {token.value}
    </span>
  ));
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
          marginTop: "0.75rem",
          marginBottom: "0.75rem",
          paddingTop: "0.45rem",
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
          background: "var(--surface-alt)",
          border: "2px solid var(--line)",
          borderRadius: "8px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "1rem 1.1rem",
          margin: "1.5rem 0",
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "var(--text)",
          boxSizing: "border-box",
          maxWidth: "100%",
          boxShadow: "var(--shadow)",
        }}>
          {block.lang && (
            <div style={{
              fontFamily: "var(--font-syne)",
              fontSize: "0.5625rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-soft)",
              marginBottom: "0.75rem",
              paddingBottom: "0.65rem",
              borderBottom: "2px solid rgba(23, 23, 23, 0.12)",
            }}>
              {block.lang}
            </div>
          )}
          <code style={{
            display: "block",
            width: "max-content",
            minWidth: "100%",
            whiteSpace: "pre",
            paddingRight: "1rem",
          }}>
            {renderCode(block.code, block.lang)}
          </code>
        </pre>
      );

    case "table":
      return (
        <div key={idx} style={{ margin: "1.5rem 0", overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid var(--line)",
              background: "var(--surface)",
              minWidth: "420px",
            }}
          >
            <thead>
              <tr style={{ background: "var(--surface-alt)" }}>
                {block.headers.map((header, headerIdx) => (
                  <th
                    key={headerIdx}
                    style={{
                      padding: "0.75rem 0.9rem",
                      textAlign: "left",
                      fontFamily: "var(--font-syne)",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text)",
                      borderBottom: "2px solid var(--line)",
                    }}
                  >
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      style={{
                        padding: "0.75rem 0.9rem",
                        fontFamily: "var(--font-dm-mono)",
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                        color: "var(--text-soft)",
                        borderTop: "2px solid var(--line)",
                      }}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
