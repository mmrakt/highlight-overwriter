export const languages = [
  "bash",
  "c",
  "css",
  "dart",
  "django",
  "elixir",
  "erlang",
  "go",
  "haskell",
  "hsp",
  "java",
  "javascript",
  "kotlin",
  "objectivec",
  "perl",
  "php",
  "python",
  "ruby",
  "rust",
  "scala",
  "sql",
  "swift",
  "typescript",
  "vbscript",
  "vim",
  "",
] as const;

export type Language = (typeof languages)[number];

export const snippets = [
  {
    language: "bash",
    code: "echo 'Hello, World!'\nfor i in {1..10}; do\n  echo \"Count: $i\"\ndone",
  },
  {
    language: "c",
    code: '#include <stdio.h>\n\nint main() {\n  for (int i = 1; i <= 10; ++i) {\n    printf("Count: %d\\n", i);\n  }\n  return 0;\n}',
  },
  {
    language: "css",
    code: "body {\n  font-size: 16px;\n  color: #333;\n  background-color: #f0f0f0;\n}",
  },
  {
    language: "dart",
    code: "void main() {\n  for (var i = 1; i <= 10; i++) {\n    print('Count: $i');\n  }\n}",
  },
  {
    language: "django",
    code: "from django.http import HttpResponse\n\ndef hello(request):\n    output = [f'Count: {i}' for i in range(1, 11)]\n    return HttpResponse('\\n'.join(output))",
  },
  {
    language: "elixir",
    code: '1..10 |> Enum.each(&IO.puts("Count: #{&1}"))',
  },
  {
    language: "erlang",
    code: '-module(hello).\n-export([hello/0]).\n\nhello() ->\n    lists:foreach(fun(I) -> io:fwrite("Count: ~p~n", [I]) end, lists:seq(1, 10)).',
  },
  {
    language: "go",
    code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  for i := 1; i <= 10; i++ {\n    fmt.Printf("Count: %d\\n", i)\n  }\n}',
  },
  {
    language: "haskell",
    code: 'main :: IO ()\nmain = mapM_ (putStrLn . ("Count: " ++) . show) [1..10]',
  },
  {
    language: "hsp",
    code: 'Repeat 10\n\tPrint "Count: " + i\nNext',
  },
  {
    language: "java",
    code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            System.out.println("Count: " + i);\n        }\n    }\n}',
  },
  {
    language: "javascript",
    code: "for (let i = 1; i <= 10; i++) {\n  console.log(`Count: ${i}`);\n}",
  },
  {
    language: "kotlin",
    code: 'fun main() {\n    repeat(10) {\n        println("Count: ${it + 1}")\n    }\n}',
  },
  {
    language: "objectivec",
    code: '#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        for (int i = 1; i <= 10; i++) {\n            NSLog(@"Count: %d", i);\n        }\n    }\n    return 0;\n}',
  },
  {
    language: "perl",
    code: 'foreach my $i (1..10) {\n  print "Count: $i\\n";\n}',
  },
  {
    language: "php",
    code: '<?php\nfor ($i = 1; $i <= 10; $i++) {\n    echo "Count: $i\\n";\n}',
  },
  {
    language: "python",
    code: "for i in range(1, 11):\n  print(f'Count: {i}')",
  },
  {
    language: "ruby",
    code: '1.upto(10) { |i| puts "Count: #{i}" }',
  },
  {
    language: "rust",
    code: 'fn main() {\n    for i in 1..=10 {\n        println!("Count: {{}}", i);\n    }\n}',
  },
  {
    language: "scala",
    code: '(1 to 10).foreach(i => println(s"Count: $i"))',
  },
  {
    language: "sql",
    code: "SELECT 'Count: ' || generate_series(1, 10);",
  },
  {
    language: "swift",
    code: 'for i in 1...10 {\n  print("Count: \\(i)")\n}',
  },
  {
    language: "typescript",
    code: "for (let i = 1; i <= 10; i++) {\n  console.log(`Count: ${i}`);\n}",
  },
  {
    language: "vbscript",
    code: 'For i = 1 To 10\n  MsgBox "Count: " & i\nNext',
  },
  {
    language: "vim",
    code: "echo 'Hello, World!'",
  },
];
