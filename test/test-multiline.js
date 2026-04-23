/**
 * 多行表达式测试
 */

const { ExpressRunner, execute } = require('../dist/index');

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
    console.log(`   Stack: ${error.stack}`);
  }
}

console.log('\n========================================');
console.log('   多行表达式测试');
console.log('========================================\n');

// 创建测试用的 runner
const runner = new ExpressRunner();

// ============ 多行表达式测试 ============

test('简单的多行加法', () => {
  const expression = `1 + 
2 + 
3`;
  const result = runner.execute(expression);
  console.log(`   表达式：${JSON.stringify(expression)}`);
  console.log(`   结果：${result.value}`);
  if (result.value !== 6) {
    throw new Error(`期望 6，实际 ${result.value}`);
  }
});

test('带变量的多行表达式', () => {
  const expression = `价格 - 
饭卡商家承担 + 
平台补贴`;
  const result = runner.execute(expression, {
    价格: 100,
    饭卡商家承担: 10,
    平台补贴: 5,
  });
  console.log(`   表达式：${JSON.stringify(expression)}`);
  console.log(`   结果：${result.value}`);
  if (result.value !== 95) {
    throw new Error(`期望 95，实际 ${result.value}`);
  }
});

test('带赋值的多行表达式', () => {
  const expression = `商家应收 = 
    价格
   - 饭卡商家承担
   + 平台补贴`;
  const result = runner.execute(expression, {
    价格: 100,
    饭卡商家承担: 10,
    平台补贴: 5,
  });
  console.log(`   表达式：${JSON.stringify(expression)}`);
  console.log(`   结果：${result.value}`);
  if (result.value !== 95) {
    throw new Error(`期望 95，实际 ${result.value}`);
  }
});

test('中文操作符的多行表达式', () => {
  const expression = `如果 价格 > 100
    则 价格 * 0.9
    否则 价格 * 0.95`;
  const result = runner.execute(expression, {
    价格: 120,
  });
  console.log(`   表达式：${JSON.stringify(expression)}`);
  console.log(`   结果：${result.value}`);
  if (result.value !== 114) {
    // 120 * 0.95 = 114
    throw new Error(`期望 114，实际 ${result.value}`);
  }
});

test('多行函数调用', () => {
  const expression = `max(
    10,
    20,
    30
  )`;
  const result = runner.execute(expression);
  console.log(`   表达式：${JSON.stringify(expression)}`);
  console.log(`   结果：${result.value}`);
  if (result.value !== 30) {
    throw new Error(`期望 30，实际 ${result.value}`);
  }
});

test('复杂的多行表达式', () => {
  const expression = `IF(价格 > 100) THEN 
    价格 * 0.9 + 平台补贴
ELSE 
    价格 * 0.95 + 平台补贴`;
  const result = runner.execute(expression, {
    价格: 120,
    平台补贴: 5,
  });
  console.log(`   表达式：${JSON.stringify(expression)}`);
  console.log(`   结果：${result.value}`);
  if (result.value !== 113) {
    throw new Error(`期望 113，实际 ${result.value}`);
  }
});

console.log('\n========================================');
console.log(`   测试完成: ${testCount} 个测试`);
console.log(`   ✅ 通过: ${passCount}`);
console.log(`   ❌ 失败: ${failCount}`);
console.log('========================================\n');

// 返回退出码
if (failCount > 0) {
  process.exit(1);
}
