# Markdown-It Plugin Command

一个用于解析命令语法的 markdown-it 插件。

[English Documentation](README.md)

> 本插件90%工作由AIGC贡献，[协同过程分享](https://expert.matrixspace.ai/share#/5859fabbf29b4fe3af1e3e87831f1bf9]


## 安装

```bash
npm install markdown-it-plugin-command
```

## 使用方法

```javascript
const MarkdownIt = require('markdown-it');
const commandPlugin = require('markdown-it-plugin-command');

const md = new MarkdownIt();
md.use(commandPlugin);

const result = md.render('[点击我]{!command param1=value1 param2="value 2"}');
console.log(result);
```

上面的代码将输出：

```html
<span class="command-link command-button" data-command="command" data-params="param1=value1&param2=value%202">点击我</span>
```

## 语法

插件识别以下语法：

```
[描述]{!命令名 参数1=值1 参数2="值 2"}
```

- `描述`：要显示的文本
- `命令名`：命令的名称
- `参数1`、`参数2` 等：命令的可选参数

## API

### commandPlugin(md)

将命令解析功能添加到 markdown-it 实例中。

## 许可证

MIT
