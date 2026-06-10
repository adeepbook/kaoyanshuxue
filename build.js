// build.js —— 唯一内容源。运行 `node build.js` 生成每个科目独立的 HTML + 首页 index.html
const fs = require('fs');
const path = require('path');

let _c = 0;
const _id = () => 'n' + (_c++);
const L = (name, desc, key, exam) => ({ id: _id(), name, desc: desc || '', status: 0, key: key || undefined, exam: exam || undefined });
const N = (name, desc, children, exam) => ({ id: _id(), name, desc: desc || '', open: false, children, exam: exam || undefined });

function gaoshu() {
  _c = 0;
  const modules = [
    N('函数、极限、连续', '微积分的地基', [
      N('函数的概念与性质', null, [N('函数的定义', null, [L('定义域'), L('值域'), L('对应法则')]), N('函数的表示法', null, [L('解析法'), L('表格法'), L('图象法'), L('分段函数')]), N('函数的四种特性', null, [L('单调性'), L('奇偶性'), L('周期性'), L('有界性')]), L('反函数'), L('复合函数'), N('基本初等函数', null, [L('常数函数'), L('幂函数'), L('指数函数'), L('对数函数'), L('三角函数', '正弦余弦正切', 'trig'), L('反三角函数')]), L('初等函数')]),
      N('极限', null, [N('数列的极限', null, [L('数列极限的定义（ε-N）'), L('收敛数列的性质')]), N('函数的极限', null, [L('x→x₀ 的极限'), L('x→∞ 的极限'), L('左右极限')]), N('无穷小与无穷大', null, [L('无穷小的概念'), L('无穷小的比较'), L('无穷大与无穷小的关系')]), N('极限运算法则', null, [L('四则运算'), L('复合函数的极限')]), N('两个重要极限', null, [L('sin x / x'), L('(1+1/x)^x（e）')]), L('等价无穷小替换')]),
      N('连续性', null, [L('函数连续的概念'), N('间断点及其分类', null, [L('第一类间断点'), L('第二类间断点')]), L('连续函数的运算'), N('闭区间上连续函数的性质', null, [L('最值定理'), L('介值定理'), L('零点定理')])])]),
    N('一元函数微分学', null, [
      N('导数与微分', null, [N('导数的概念', null, [L('导数的定义'), L('几何意义（切线斜率）'), L('可导与连续的关系')]), N('求导法则', null, [L('四则运算求导'), L('复合函数求导（链式法则）'), L('反函数求导')]), L('基本初等函数求导公式'), L('高阶导数'), L('隐函数与参数方程求导'), L('微分的概念与运算')]),
      N('微分中值定理', null, [L('罗尔定理'), L('拉格朗日中值定理'), L('柯西中值定理'), L('泰勒公式')]),
      N('导数的应用', null, [L('洛必达法则'), N('单调性与极值', null, [L('单调性判定'), L('极值的必要与充分条件')]), L('最大值与最小值'), L('凹凸性与拐点'), L('函数图形的描绘'), N('经济应用', null, [L('边际分析'), L('弹性分析')], '3')])]),
    N('一元函数积分学', null, [
      N('不定积分', null, [L('原函数与不定积分'), L('基本积分公式'), N('换元积分法', null, [L('第一类换元（凑微分）'), L('第二类换元')]), L('分部积分法'), L('有理函数的积分')]),
      N('定积分', null, [L('定积分的概念与性质'), L('微积分基本定理'), L('定积分的计算'), N('反常积分', null, [L('无穷区间'), L('无界函数')])]),
      N('定积分的应用', null, [L('几何应用（面积、体积）'), L('经济应用', null, null, '3')])]),
    N('向量代数与空间解析几何', '数一专属：空间中的向量与图形', [L('向量及其线性运算'), N('向量的乘积', null, [L('数量积'), L('向量积'), L('混合积')]), L('平面及其方程'), L('空间直线及其方程'), N('曲面与空间曲线', null, [L('旋转曲面'), L('柱面'), L('二次曲面'), L('空间曲线')])], '1'),
    N('多元函数微分学', null, [L('多元函数的极限与连续'), N('偏导数与全微分', null, [L('偏导数'), L('全微分'), L('多元复合函数求导'), L('隐函数求导')]), L('方向导数与梯度', null, null, '1'), N('多元函数的极值', null, [L('无条件极值'), L('条件极值与拉格朗日乘数法'), L('经济应用', null, null, '3')])]),
    N('二重积分', null, [L('二重积分的概念与性质'), N('二重积分的计算', null, [L('直角坐标'), L('极坐标'), L('交换积分次序')])]),
    N('三重积分', '数一专属', [L('三重积分的概念与性质'), L('直角坐标计算'), L('柱面坐标计算'), L('球面坐标计算')], '1'),
    N('曲线积分与曲面积分', '数一专属', [N('曲线积分', null, [L('第一类曲线积分'), L('第二类曲线积分')]), N('曲面积分', null, [L('第一类曲面积分'), L('第二类曲面积分')]), L('格林公式'), L('高斯公式'), L('斯托克斯公式'), L('场论初步（梯度散度旋度）')], '1'),
    N('无穷级数', null, [N('常数项级数', null, [L('级数的概念与性质'), N('正项级数判别法', null, [L('比较判别法'), L('比值判别法'), L('根值判别法')]), L('交错级数与莱布尼茨'), L('绝对收敛与条件收敛')]), N('幂级数', null, [L('收敛半径与收敛域'), L('幂级数的运算'), L('展开成幂级数')]), L('傅里叶级数', null, null, '1')]),
    N('微分方程与差分方程', null, [N('一阶微分方程', null, [L('可分离变量'), L('齐次方程'), L('一阶线性')]), N('高阶微分方程', null, [L('可降阶高阶'), L('二阶常系数齐次'), L('二阶常系数非齐次')]), L('全微分方程', null, null, '1'), L('欧拉方程', null, null, '1'), L('差分方程', null, null, '3'), L('微分方程的经济应用', null, null, '3')])
  ];
  modules[0].open = true; modules[0].children[0].open = true; modules[0].children[0].children[5].open = true;
  return { id: 'gaoshu', name: '高等数学', modules };
}
function linear() {
  _c = 0;
  const modules = [
    N('行列式', null, [L('行列式的概念与性质'), L('按行（列）展开'), L('余子式与代数余子式'), L('特殊行列式'), L('克拉默法则')]),
    N('矩阵', null, [L('矩阵的概念与类型'), N('矩阵的运算', null, [L('加法与数乘'), L('矩阵乘法'), L('转置')]), L('逆矩阵'), L('伴随矩阵'), L('初等变换与初等矩阵'), L('矩阵的秩'), L('分块矩阵')]),
    N('向量', null, [L('向量的概念与运算'), L('线性组合与线性表示'), L('线性相关与线性无关'), L('向量组的秩与极大无关组'), N('向量空间', '数一专属', [L('基与维数'), L('坐标'), L('基变换与过渡矩阵')], '1')]),
    N('线性方程组', null, [N('齐次线性方程组', null, [L('解的结构'), L('基础解系')]), N('非齐次线性方程组', null, [L('解的结构'), L('通解')]), L('解的判定（秩与解的关系）')]),
    N('特征值与特征向量', null, [L('概念与求法'), L('特征值的性质'), L('相似矩阵'), L('可对角化的条件'), L('实对称矩阵的对角化')]),
    N('二次型', null, [L('二次型及其矩阵表示'), L('标准形与规范形'), N('化标准形', null, [L('配方法'), L('正交变换法')]), L('惯性定理'), L('正定二次型与正定矩阵')])
  ];
  modules[0].open = true;
  return { id: 'linear', name: '线性代数', modules };
}
function prob() {
  _c = 0;
  const modules = [
    N('随机事件与概率', null, [L('随机事件与样本空间'), L('事件的关系与运算'), L('概率的定义与性质'), N('古典与几何概型', null, [L('古典概型'), L('几何概型')]), L('条件概率'), N('三大公式', null, [L('乘法公式'), L('全概率公式'), L('贝叶斯公式')]), L('事件的独立性')]),
    N('随机变量及其分布', null, [L('随机变量的概念'), L('分布函数'), L('离散型（分布律）'), L('连续型（概率密度）'), N('常见分布', null, [L('0-1分布与二项分布'), L('泊松分布'), L('均匀分布'), L('指数分布'), L('正态分布')]), L('随机变量函数的分布')]),
    N('多维随机变量', null, [L('二维随机变量与联合分布'), L('边缘分布与条件分布'), L('随机变量的独立性'), L('二维随机变量函数的分布')]),
    N('随机变量的数字特征', null, [L('数学期望'), L('方差'), L('协方差与相关系数'), L('矩与协方差矩阵')]),
    N('大数定律与中心极限定理', null, [L('切比雪夫不等式'), L('大数定律'), L('中心极限定理')]),
    N('数理统计的基本概念', null, [L('总体与样本'), L('统计量'), N('三大抽样分布', null, [L('χ² 分布'), L('t 分布'), L('F 分布')])]),
    N('参数估计', null, [N('点估计', null, [L('矩估计'), L('最大似然估计')]), L('估计量的评价标准', null, null, '1'), N('区间估计', null, [L('单个正态总体'), L('两个正态总体')], '1')]),
    N('假设检验', '数一专属', [L('假设检验的基本思想'), L('单个正态总体的检验'), L('两个正态总体的检验'), L('两类错误')], '1')
  ];
  modules[0].open = true;
  return { id: 'prob', name: '概率论与数理统计', modules };
}

const subjects = [gaoshu(), linear(), prob()];
const fileFor = s => s.name + '.html';

const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
subjects.forEach(s => {
  const html = tpl.split('__SUBJECT_JSON__').join(JSON.stringify(s)).split('__SUBJECT_NAME__').join(s.name);
  fs.writeFileSync(path.join(__dirname, fileFor(s)), html, 'utf8');
  console.log('生成', fileFor(s));
});

// 首页 index.html（科目入口，显示各科进度）
const cards = subjects.map(s => `    {id:'${s.id}',name:'${s.name}',file:'${encodeURIComponent(fileFor(s))}'}`).join(',\n');
const index = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>考研 · 学习进度地图</title>
<style>
:root{--paper:#F4F6F1;--surface:#fff;--ink:#1E241C;--muted:#6E7566;--faint:#9AA191;--hair:#E5E9DF;--accent:#2E5E3D;--accent-soft:#EAF1E9;--font:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;--num:ui-monospace,Menlo,monospace;}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font);}
.wrap{max-width:760px;margin:0 auto;padding:56px 22px 60px}
h1{font-size:27px;margin:0 0 6px;letter-spacing:-.5px}.lead{color:var(--muted);font-size:14px;margin:0 0 30px}
.grid{display:grid;gap:14px}
.card{display:flex;align-items:center;gap:18px;background:var(--surface);border:1px solid var(--hair);border-radius:16px;padding:20px 22px;text-decoration:none;color:inherit;transition:.14s}
.card:hover{border-color:var(--accent);transform:translateY(-1px);box-shadow:0 6px 20px rgba(30,36,28,.06)}
.ring{flex:0 0 auto;position:relative;width:64px;height:64px}.ring svg{transform:rotate(-90deg)}
.ring span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--num);font-size:15px;font-weight:600;color:var(--accent)}
.c-main{flex:1 1 auto}.c-name{font-size:18px;font-weight:700}.c-sub{font-size:12.5px;color:var(--faint);margin-top:3px}
.arrow{flex:0 0 auto;color:var(--faint);font-size:20px}
.foot{margin-top:34px;color:var(--faint);font-size:12px;text-align:center;line-height:1.7}
</style></head><body><div class="wrap">
<h1>考研 · 学习进度地图</h1>
<p class="lead">每个科目是独立的一份，进度与笔记互不干扰。点进去学习、追溯前置、导出复盘资料。</p>
<div class="grid" id="grid"></div>
<p class="foot">进度保存在本机 · 各科目可单独使用与分发</p>
</div><script>
const SUBJECTS=[
${cards}
];
const C=2*Math.PI*26;
function readP(id){try{const v=localStorage.getItem('km-'+id+'-progress');if(v){const o=JSON.parse(v);return o;}}catch(e){}return {done:0,total:0};}
document.getElementById('grid').innerHTML=SUBJECTS.map(s=>{const p=readP(s.id);const pct=p.total?Math.round(p.done/p.total*100):0;const len=p.total?p.done/p.total*C:0;
return '<a class="card" href="'+s.file+'"><div class="ring"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#E5E9DF" stroke-width="6"/><circle cx="32" cy="32" r="26" fill="none" stroke="#3F7A4E" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+len+' 999"/></svg><span>'+pct+'%</span></div><div class="c-main"><div class="c-name">'+s.name+'</div><div class="c-sub">已掌握 '+p.done+' / '+p.total+' 个知识点</div></div><div class="arrow">→</div></a>';}).join('');
</script></body></html>`;
fs.writeFileSync(path.join(__dirname, 'index.html'), index, 'utf8');
console.log('生成 index.html（首页）');
console.log('完成。');
