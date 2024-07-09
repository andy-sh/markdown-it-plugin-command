import MarkdownIt from 'markdown-it';
import { commandPlugin } from '../src/index';

describe('markdown-it-plugin-command', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(commandPlugin);
  });

  test('renders basic command without parameters', () => {
    const input = '[Click me]{!command}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="command">Click me</span></p>\n');
  });

  test('renders command with parameters', () => {
    const input = '[Open file]{!open file="example.txt" line=10}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="open" data-params="file=example.txt&line=10">Open file</span></p>\n');
  });

  test('renders command with quoted parameters', () => {
    const input = '[Search]{!search query="hello world" case="sensitive"}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="search" data-params="query=hello%20world&case=sensitive">Search</span></p>\n');
  });

  test('renders command without description', () => {
    const input = '[]{!command}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="command"></span></p>\n');
  });

  test('renders command with special characters in parameters', () => {
    const input = '[Special]{!command param="a&b" other="c=d"}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="command" data-params="param=a%26b&other=c%3Dd">Special</span></p>\n');
  });

  test('ignores invalid command syntax', () => {
    const input = '[Invalid]{command}';
    const output = md.render(input);
    expect(output).toBe('<p>[Invalid]{command}</p>\n');
  });

  test('renders multiple commands in the same paragraph', () => {
    const input = 'This is a [command1]{!cmd1} and this is [another]{!cmd2 param=value}';
    const output = md.render(input);
    expect(output).toBe('<p>This is a <span class="command-link command-button" data-command="cmd1">command1</span> and this is <span class="command-link command-button" data-command="cmd2" data-params="param=value">another</span></p>\n');
  });

  test('renders commands in different paragraphs', () => {
    const input = '[Command 1]{!cmd1}\n\n[Command 2]{!cmd2}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="cmd1">Command 1</span></p>\n<p><span class="command-link command-button" data-command="cmd2">Command 2</span></p>\n');
  });

  test('escapes HTML in command description', () => {
    const input = '[<script>alert("xss")</script>]{!command}';
    const output = md.render(input);
    expect(output).toBe('<p><span class="command-link command-button" data-command="command">&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</span></p>\n');
  });
});
