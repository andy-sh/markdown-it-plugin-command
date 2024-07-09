# Markdown-It Plugin Command
A markdown-it plugin for parsing command syntax.

[中文文档](README.zh-CN.md)

> 90% of the work on this plugin was contributed by AIGC, [sharing the collaborative process](https://expert.matrixspace.ai/share#/5859fabbf29b4fe3af1e3e87831f1bf9)

## Installation

```bash
npm install markdown-it-plugin-command
```

## Usage

```javascript
const MarkdownIt = require('markdown-it');
const commandPlugin = require('markdown-it-plugin-command');

const md = new MarkdownIt();
md.use(commandPlugin);

const result = md.render('[Click me]{!command param1=value1 param2="value 2"}');
console.log(result);
```

The above code will output:

```html
<span class="command-link command-button" data-command="command" data-params="param1=value1&param2=value%202">Click me</span>
```

## Syntax

The plugin recognizes the following syntax:

```
[description]{!commandName param1=value1 param2="value 2"}
```

- `description`: The text to be displayed
- `commandName`: The name of the command
- `param1`, `param2`, etc.: Optional parameters for the command

## API

### commandPlugin(md)

Adds the command parsing functionality to the markdown-it instance.

## License

MIT
