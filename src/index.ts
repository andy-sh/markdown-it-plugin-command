import MarkdownIt from "markdown-it";
import StateInline from "markdown-it/lib/rules_inline/state_inline";

interface CommandToken {
    type: string;
    tag: string;
    attrs: [string, string][];
    content: string;
    children?: CommandToken[];
    map: [number, number];
}

export function commandPlugin(md: MarkdownIt): void {
    const commandRegex =
        /\[(.*?)\]\{!(\w+)((?:\s+\w+(?:=(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\S+))?)*)\}/;

    function parseParams(paramsString: string): { [key: string]: string } {
        const params: { [key: string]: string } = {};
        const paramRegex = /(\w+)(?:=('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\S+))?/g;
        let match;

        while ((match = paramRegex.exec(paramsString)) !== null) {
            const [, key, value] = match;
            if (value) {
                // 如果有值，去除引号并解析转义字符
                params[key] = value.replace(/^['"]|['"]$/g, "").replace(/\\(['"\\])/g, "$1");
            } else {
                // 如果没有值，设置为空字符串或 true
                params[key] = "";
            }
        }

        return params;
    }

    function parseCommand(state: StateInline, silent: boolean): boolean {
        if (silent) return false;

        const start = state.pos;
        const match = commandRegex.exec(state.src.slice(start));

        if (!match) return false;

        const [fullMatch, description, commandName, paramsString] = match;

        const token = state.push("command", "span", 1) as CommandToken;
        token.attrs = [
            ["class", "command-link command-button"],
            ["data-command", commandName],
        ];

        if (paramsString) {
            const params = parseParams(paramsString.trim());
            const parsedParams = Object.entries(params).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );

            if (parsedParams.length > 0) {
                token.attrs.push(["data-params", parsedParams.join("&")]);
            }
        }

        const textToken = new state.Token("text", "", 0) as CommandToken;
        textToken.content = description || "";

        token.children = [textToken];

        token.map = [state.pos, state.pos + fullMatch.length];

        state.pos += fullMatch.length;
        return true;
    }

    md.inline.ruler.push("command", parseCommand);

    md.renderer.rules.command = function (tokens, idx) {
        const token = tokens[idx] as CommandToken;
        const attrs = token.attrs.map(([key, value]) => `${key}="${value}"`).join(" ");
        const description = token.children && token.children[0] ? token.children[0].content : "";
        return `<span ${attrs}>${md.utils.escapeHtml(description)}</span>`;
    };
}
