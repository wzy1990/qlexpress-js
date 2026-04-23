/**
 * QLExpress-JS 测试用例
 */

const { ExpressRunner, execute, createDefaultContext } = require('../dist/index');

// 测试工具函数
let testCount = 0;
let passCount = 0;
let failCount = 0;

function test(name, fn) {
  testCount++;
  try {
    fn();
    passCount++;
    console.log(`✅ ${name}`);
  } catch (error) {
    failCount++;
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
  }
}

function assertEqual(actual, expected, message = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`,
    );
  }
}

function assertThrows(fn, expectedMessage = '') {
  let thrown = false;
  try {
    fn();
  } catch (error) {
    thrown = true;
    if (expectedMessage && !error.message.includes(expectedMessage)) {
      throw new Error(
        `Expected error message to include "${expectedMessage}", got "${error.message}"`,
      );
    }
  }
  if (!thrown) {
    throw new Error('Expected function to throw an error');
  }
}

// 创建测试用的runner
const runner = new ExpressRunner();

console.log('\n========================================');
console.log('   QLExpress-JS 测试套件');
console.log('========================================\n');

// ============ 基础运算测试 ============
console.log('--- 基础运算测试 ---\n');

test('数字字面量', () => {
  assertEqual(runner.execute('42').value, 42);
  assertEqual(runner.execute('3.14').value, 3.14);
  assertEqual(runner.execute('-10').value, -10);
  assertEqual(runner.execute('0xFF').value, 255); // 十六进制
  assertEqual(runner.execute('0b1010').value, 10); // 二进制
  assertEqual(runner.execute('0o755').value, 493); // 八进制
});

test('字符串字面量', () => {
  assertEqual(runner.execute('"hello"').value, 'hello');
  assertEqual(runner.execute("'world'").value, 'world');
  assertEqual(runner.execute('"hello\\nworld"').value, 'hello\nworld');
  assertEqual(runner.execute('"tab\\there"').value, 'tab\there');
});

test('布尔和null字面量', () => {
  assertEqual(runner.execute('true').value, true);
  assertEqual(runner.execute('false').value, false);
  assertEqual(runner.execute('null').value, null);
  assertEqual(runner.execute('undefined').value, undefined);
});

test('加法运算', () => {
  assertEqual(runner.execute('1 + 2').value, 3);
  assertEqual(runner.execute('1.5 + 2.5').value, 4);
  assertEqual(runner.execute('"hello" + " world"').value, 'hello world');
  assertEqual(runner.execute('1 + "2"').value, '12'); // 字符串拼接
});

test('减法运算', () => {
  assertEqual(runner.execute('5 - 3').value, 2);
  assertEqual(runner.execute('10 - 5.5').value, 4.5);
  assertEqual(runner.execute('-5 - 3').value, -8);
});

test('乘法运算', () => {
  assertEqual(runner.execute('3 * 4').value, 12);
  assertEqual(runner.execute('2.5 * 2').value, 5);
});

test('除法运算', () => {
  assertEqual(runner.execute('10 / 2').value, 5);
  assertEqual(runner.execute('7 / 2').value, 3.5);
});

test('取模运算', () => {
  assertEqual(runner.execute('10 % 3').value, 1);
  assertEqual(runner.execute('10 mod 3').value, 1); // mod 关键字
});

test('复杂表达式', () => {
  assertEqual(runner.execute('2 + 3 * 4').value, 14);
  assertEqual(runner.execute('(2 + 3) * 4').value, 20);
  assertEqual(runner.execute('10 - 2 * 3 + 4').value, 8);
});

test('多行表达式 - 加减法', () => {
  const expression = '商家应收=\n    价格\n   - 饭卡商家承担\n   + 平台补贴';
  const context = { 价格: 100, 饭卡商家承担: 10, 平台补贴: 5 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, 95);
});

test('多行表达式 - 乘除法', () => {
  const expression = 'result =\n    a\n   * b\n   / c';
  const context = { a: 12, b: 3, c: 2 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, 18);
});

test('多行表达式 - 混合运算', () => {
  const expression = 'total =\n    价格\n   * 数量\n   - 折扣\n   + 税费';
  const context = { 价格: 100, 数量: 2, 折扣: 20, 税费: 10 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, 190);
});

test('多行表达式 - 逻辑运算', () => {
  const expression = 'result =\n    条件1\n   && 条件2\n   || 条件3';
  const context = { 条件1: true, 条件2: false, 条件3: true };
  const result = runner.execute(expression, context);
  assertEqual(result.value, true);
});

test('多行表达式 - 比较运算', () => {
  const expression = 'result =\n    数值1\n   > 数值2\n   && 数值1\n   < 数值3';
  const context = { 数值1: 50, 数值2: 30, 数值3: 100 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, true);
});

test('多行表达式 - 复杂嵌套', () => {
  const expression = 'final =\n    (a + b)\n   * (c - d)\n   / e';
  const context = { a: 10, b: 20, c: 30, d: 5, e: 5 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, 150);
});

test('多行表达式 - 带空格和缩进', () => {
  const expression = '  计算  =\n      值1\n    + 值2\n    - 值3\n  ';
  const context = { 值1: 100, 值2: 50, 值3: 30 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, 120);
});

test('多行表达式 - 中文变量名', () => {
  const expression = '总收入=\n    销售额\n   + 服务费\n   - 成本';
  const context = { 销售额: 1000, 服务费: 200, 成本: 500 };
  const result = runner.execute(expression, context);
  assertEqual(result.value, 700);
});

// ============ 比较运算测试 ============
console.log('\n--- 比较运算测试 ---\n');

test('相等比较', () => {
  assertEqual(runner.execute('1 == 1').value, true);
  assertEqual(runner.execute('1 == 2').value, false);
  assertEqual(runner.execute('"a" == "a"').value, true);
  assertEqual(runner.execute('1 == "1"').value, true); // 弱类型比较
});

test('严格相等比较', () => {
  assertEqual(runner.execute('1 === 1').value, true);
  assertEqual(runner.execute('1 === "1"').value, false);
});

test('不等比较', () => {
  assertEqual(runner.execute('1 != 2').value, true);
  assertEqual(runner.execute('1 != 1').value, false);
  assertEqual(runner.execute('1 <> 2').value, true); // <> 语法
});

test('大小比较', () => {
  assertEqual(runner.execute('3 > 2').value, true);
  assertEqual(runner.execute('2 > 3').value, false);
  assertEqual(runner.execute('3 >= 3').value, true);
  assertEqual(runner.execute('2 < 3').value, true);
  assertEqual(runner.execute('3 <= 3').value, true);
});

// ============ 逻辑运算测试 ============
console.log('\n--- 逻辑运算测试 ---\n');

test('逻辑与', () => {
  assertEqual(runner.execute('true && true').value, true);
  assertEqual(runner.execute('true && false').value, false);
  assertEqual(runner.execute('false && true').value, false);
});

test('逻辑或', () => {
  assertEqual(runner.execute('true || false').value, true);
  assertEqual(runner.execute('false || true').value, true);
  assertEqual(runner.execute('false || false').value, false);
});

test('逻辑非', () => {
  assertEqual(runner.execute('!true').value, false);
  assertEqual(runner.execute('!false').value, true);
  assertEqual(runner.execute('!!true').value, true);
});

test('短路求值', () => {
  // 测试短路求值不会执行不必要部分
  const result = runner.execute('false && (1/0 > 0)');
  assertEqual(result.value, false);
});

// ============ 三元运算符测试 ============
console.log('\n--- 三元运算符测试 ---\n');

test('三元运算符', () => {
  assertEqual(runner.execute('1 > 0 ? "yes" : "no"').value, 'yes');
  assertEqual(runner.execute('1 < 0 ? "yes" : "no"').value, 'no');
  assertEqual(runner.execute('true ? 1 : 2').value, 1);
});

// ============ 变量和上下文测试 ============
console.log('\n--- 变量和上下文测试 ---\n');

test('变量访问', () => {
  const result = runner.execute('a + b', { a: 10, b: 20 });
  assertEqual(result.value, 30);
});

test('变量赋值', () => {
  const result = runner.execute('x = 100; return x', {});
  assertEqual(result.value, 100);
});

test('复合赋值', () => {
  const result = runner.execute('a = 10; a += 5; return a', {});
  assertEqual(result.value, 15);
});

test('自增自减', () => {
  const result1 = runner.execute('i = 0; i++; return i', {});
  assertEqual(result1.value, 1);

  const result2 = runner.execute('i = 0; ++i; return i', {});
  assertEqual(result2.value, 1);

  const result3 = runner.execute('i = 10; i--; return i', {});
  assertEqual(result3.value, 9);
});

// ============ 数组和对象测试 ============
console.log('\n--- 数组和对象测试 ---\n');

test('数组字面量', () => {
  const result = runner.execute('[1, 2, 3]');
  assertEqual(result.value, [1, 2, 3]);
});

test('数组访问', () => {
  const result = runner.execute('arr[0]', { arr: [10, 20, 30] });
  assertEqual(result.value, 10);
});

test('数组长度', () => {
  const result = runner.execute('arr.length', { arr: [1, 2, 3, 4, 5] });
  assertEqual(result.value, 5);
});

test('对象字面量', () => {
  const result = runner.execute('{ name: "test", value: 123 }');
  assertEqual(result.value.name, 'test');
  assertEqual(result.value.value, 123);
});

test('对象属性访问', () => {
  const result = runner.execute('obj.name', { obj: { name: 'John', age: 30 } });
  assertEqual(result.value, 'John');
});

test('动态属性访问', () => {
  const result = runner.execute('obj["name"]', { obj: { name: 'John' } });
  assertEqual(result.value, 'John');
});

// ============ 控制流测试 ============
console.log('\n--- 控制流测试 ---\n');

test('if语句', () => {
  const result1 = runner.execute(
    'if (1 > 0) then { return "positive" } else { return "negative" }',
  );
  assertEqual(result1.value, 'positive');

  const result2 = runner.execute(
    'if (1 < 0) then { return "positive" } else { return "negative" }',
  );
  assertEqual(result2.value, 'negative');
});

test('for循环', () => {
  const result = runner.execute(`
    sum = 0;
    for (i = 0; i < 10; i++) {
      sum = sum + i;
    }
    return sum;
  `);
  assertEqual(result.value, 45);
});

test('while循环', () => {
  const result = runner.execute(`
    i = 0;
    sum = 0;
    while (i < 5) {
      sum = sum + i;
      i++;
    }
    return sum;
  `);
  assertEqual(result.value, 10);
});

test('break语句', () => {
  const result = runner.execute(`
    for (i = 0; i < 10; i++) {
      if (i == 5) {
        break;
      }
    }
    return i;
  `);
  assertEqual(result.value, 5);
});

test('continue语句', () => {
  const result = runner.execute(`
    sum = 0;
    for (i = 0; i < 5; i++) {
      if (i == 2) {
        continue;
      }
      sum = sum + i;
    }
    return sum;
  `);
  assertEqual(result.value, 8); // 0 + 1 + 3 + 4 = 8
});

// ============ 函数测试 ============
console.log('\n--- 函数测试 ---\n');

test('函数定义和调用', () => {
  const result = runner.execute(`
    function add(a, b) {
      return a + b;
    }
    return add(10, 20);
  `);
  assertEqual(result.value, 30);
});

test('嵌套函数调用', () => {
  const result = runner.execute(`
    function double(x) {
      return x * 2;
    }
    function add(a, b) {
      return a + b;
    }
    return double(add(5, 3));
  `);
  assertEqual(result.value, 16);
});

test('递归函数', () => {
  const result = runner.execute(`
    function factorial(n) {
      if (n <= 1) {
        return 1;
      }
      return n * factorial(n - 1);
    }
    return factorial(5);
  `);
  assertEqual(result.value, 120);
});

// ============ 内置函数测试 ============
console.log('\n--- 内置函数测试 ---\n');

test('数学函数', () => {
  assertEqual(runner.execute('abs(-10)').value, 10);
  assertEqual(runner.execute('ceil(3.2)').value, 4);
  assertEqual(runner.execute('floor(3.8)').value, 3);
  assertEqual(runner.execute('round(3.5)').value, 4);
  assertEqual(runner.execute('sqrt(16)').value, 4);
  assertEqual(runner.execute('pow(2, 3)').value, 8);
});

test('聚合函数', () => {
  assertEqual(runner.execute('min(1, 2, 3)').value, 1);
  assertEqual(runner.execute('max(1, 2, 3)').value, 3);
  assertEqual(runner.execute('sum(1, 2, 3, 4, 5)').value, 15);
  assertEqual(runner.execute('avg(10, 20, 30)').value, 20);
});

test('字符串函数', () => {
  assertEqual(runner.execute('strlen("hello")').value, 5);
  assertEqual(runner.execute('substr("hello", 0, 3)').value, 'hel');
  assertEqual(runner.execute('toUpperCase("hello")').value, 'HELLO');
  assertEqual(runner.execute('toLowerCase("HELLO")').value, 'hello');
  assertEqual(runner.execute('trim("  hello  ")').value, 'hello');
  assertEqual(runner.execute('replace("hello world", "world", "JS")').value, 'hello JS');
  assertEqual(runner.execute('split("a,b,c", ",")').value, ['a', 'b', 'c']);
});

test('数组函数', () => {
  assertEqual(runner.execute('size([1, 2, 3])').value, 3);
  assertEqual(runner.execute('first([1, 2, 3])').value, 1);
  assertEqual(runner.execute('last([1, 2, 3])').value, 3);
  assertEqual(runner.execute('range(0, 5)').value, [0, 1, 2, 3, 4]);
});

test('类型检查函数', () => {
  assertEqual(runner.execute('isArray([1, 2, 3])').value, true);
  assertEqual(runner.execute('isString("hello")').value, true);
  assertEqual(runner.execute('isNumber(123)').value, true);
  assertEqual(runner.execute('isNull(null)').value, true);
  assertEqual(runner.execute('isEmpty("")').value, true);
  assertEqual(runner.execute('isEmpty([])').value, true);
});

test('条件函数', () => {
  assertEqual(runner.execute('iif(true, 1, 2)').value, 1);
  assertEqual(runner.execute('iif(false, 1, 2)').value, 2);
  assertEqual(runner.execute('coalesce(null, undefined, "hello")').value, 'hello');
  assertEqual(runner.execute('defaultIfEmpty("", "default")').value, 'default');
});

// ============ IN/LIKE/BETWEEN 测试 ============
console.log('\n--- IN/LIKE/BETWEEN 测试 ---\n');

test('IN表达式', () => {
  assertEqual(runner.execute('1 in [1, 2, 3]').value, true);
  assertEqual(runner.execute('4 in [1, 2, 3]').value, false);
  assertEqual(runner.execute('"a" in "abc"').value, true);
});

test('LIKE表达式', () => {
  assertEqual(runner.execute('"hello" like "hel%"').value, true);
  assertEqual(runner.execute('"hello" like "%llo"').value, true);
  assertEqual(runner.execute('"hello" like "h_llo"').value, true);
  assertEqual(runner.execute('"hello" like "world"').value, false);
});

test('BETWEEN表达式', () => {
  assertEqual(runner.execute('5 between 1 and 10').value, true);
  assertEqual(runner.execute('15 between 1 and 10').value, false);
});

// ============ 自定义函数和操作符测试 ============
console.log('\n--- 自定义函数和操作符测试 ---\n');

test('添加自定义函数', () => {
  const customRunner = new ExpressRunner();
  customRunner.addFunction('cube', x => x * x * x);
  assertEqual(customRunner.execute('cube(3)').value, 27);
});

test('添加自定义操作符', () => {
  const customRunner = new ExpressRunner();
  customRunner.addOperator('<>', args => {
    return Math.abs(args[0] - args[1]);
  });
  assertEqual(customRunner.execute('10 <> 3').value, 7);
});

test('操作符别名', () => {
  const customRunner = new ExpressRunner();
  // 使用宏来模拟中文操作符
  customRunner.addMacro('加', '+');
  customRunner.addMacro('减', '-');
  assertEqual(customRunner.execute('1 加 2').value, 3);
  assertEqual(customRunner.execute('5 减 3').value, 2);
});

// ============ 宏定义测试 ============
console.log('\n--- 宏定义测试 ---\n');

test('宏定义和展开', () => {
  const customRunner = new ExpressRunner();
  customRunner.addMacro('计算平均成绩', '(语文 + 数学 + 英语) / 3');
  customRunner.addMacro('是否优秀', '计算平均成绩 > 90');

  const result = customRunner.execute('是否优秀', { 语文: 95, 数学: 92, 英语: 88 });
  assertEqual(result.value, true);
});

test('中文变量名', () => {
  const customRunner = new ExpressRunner();
  const result = customRunner.execute('语文 + 数学', { 语文: 90, 数学: 80 });
  assertEqual(result.value, 170);
});

// ============ 安全控制测试 ============
console.log('\n--- 安全控制测试 ---\n');

test('超时控制', () => {
  const customRunner = new ExpressRunner({
    security: { timeout: 100 },
  });

  assertThrows(() => {
    customRunner.execute(`
      i = 0;
      while (true) {
        i++;
      }
    `);
  }, 'timeout');
});

test('循环次数限制', () => {
  const customRunner = new ExpressRunner({
    security: { maxLoopCount: 100 },
  });

  assertThrows(() => {
    customRunner.execute(`
      for (i = 0; i < 1000; i++) {}
    `);
  }, 'Maximum loop count');
});

test('沙箱模式', () => {
  const customRunner = new ExpressRunner({
    security: { sandbox: true },
  });

  // 沙箱模式下禁止new操作
  assertThrows(() => {
    customRunner.execute('new Date()');
  }, 'sandbox');
});

// ============ 语法分析API测试 ============
console.log('\n--- 语法分析API测试 ---\n');

test('获取外部变量列表', () => {
  const vars = runner.getOutVarNames('a + b * c');
  assertEqual(vars.sort(), ['a', 'b', 'c'].sort());
});

test('获取函数列表', () => {
  const funcs = runner.getOutFunctionNames('sum(a, b) + max(c, d)');
  assertEqual(funcs.sort(), ['sum', 'max'].sort());
});

test('语法校验', () => {
  const valid1 = runner.validate('1 + 2 * 3');
  assertEqual(valid1.valid, true);

  const valid2 = runner.validate('1 + * 3');
  assertEqual(valid2.valid, false);
});

// ============ 缓存测试 ============
console.log('\n--- 缓存测试 ---\n');

test('指令缓存', () => {
  const customRunner = new ExpressRunner();

  // 第一次执行，编译并缓存
  const result1 = customRunner.execute('1 + 2', {}, { isCache: true });
  assertEqual(result1.value, 3);
  assertEqual(customRunner.getCacheSize(), 1);

  // 第二次执行，使用缓存
  const result2 = customRunner.execute('1 + 2', {}, { isCache: true });
  assertEqual(result2.value, 3);

  // 清除缓存
  customRunner.clearExpressCache();
  assertEqual(customRunner.getCacheSize(), 0);
});

// ============ 快速执行API测试 ============
console.log('\n--- 快速执行API测试 ---\n');

test('execute函数', () => {
  const result = execute('a + b', { a: 10, b: 20 });
  assertEqual(result, 30);
});

// ============ 打印输出测试 ============
console.log('\n--- 打印输出测试 ---\n');

test('print函数', () => {
  const result = runner.execute('print("Hello, World!")');
  assertEqual(result.value, 'Hello, World!');
});

test('println函数', () => {
  const result = runner.execute('println("Test output")');
  assertEqual(result.value, 'Test output');
});

// ============ 输出测试结果 ============
console.log('\n========================================');
console.log(`   测试完成: ${testCount} 个测试`);
console.log(`   ✅ 通过: ${passCount}`);
console.log(`   ❌ 失败: ${failCount}`);
console.log('========================================\n');

// 返回退出码
process.exit(failCount > 0 ? 1 : 0);
