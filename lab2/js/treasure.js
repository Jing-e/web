/* ============================================================
   寻宝大冒险 · 失落的星辰宝藏 —— 核心逻辑
   ------------------------------------------------------------
   原 lab1 版本使用 Promise 链式调用（.then / .catch）完成寻宝，
   本作业将整个寻宝过程使用 async/await 重写，并新增更多有趣的
   寻宝情节：扬帆远航（随机风暴）、破解机关、躲避守卫等。
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 工具函数：延时（返回 Promise） ---------------- */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ---------------- 阶段配置（驱动进度 UI 与故事顺序） ---------------- */
  const STAGES = [
    { icon: '📜', name: '获取航海图' },
    { icon: '🔍', name: '破译古文字' },
    { icon: '⛵', name: '扬帆远航' },
    { icon: '🧩', name: '破解机关' },
    { icon: '🗡️', name: '躲避守卫' },
    { icon: '🎁', name: '打开宝箱' },
    { icon: '💰', name: '宝藏现身' },
  ];

  /* ---------------- 模拟宝藏地图 API（全部为 async 方法） ---------------- */
  class TreasureMap {
    // 阶段 1：在古籍馆找到航海图
    static async getInitialClue() {
      await delay(1000);
      return '你在古籍馆的角落里，翻出一张泛黄的航海图…';
    }

    // 阶段 2：破译航海图上的古文字
    static async decodeAncientScript(clue) {
      await delay(1500);
      if (!clue) throw new Error('没有线索可以解码!');
      return '航海图指向大海深处一座被迷雾笼罩的失落岛屿…';
    }

    // 阶段 3：扬帆远航（随机遭遇风暴，可重试）
    static async sailTheSea() {
      await delay(2000);
      if (Math.random() < 0.5) throw new Error('糟糕!海面突然掀起狂风巨浪!');
      return '历经风浪，你终于登上了那座神秘岛屿…';
    }

    // 阶段 4：破解神庙大门机关
    static async solveMechanism() {
      await delay(1800);
      return '你转动铜制齿轮，破解了神庙大门上的古老机关…';
    }

    // 阶段 5：躲避神庙守卫（随机遭遇守卫，可重试）
    static async dodgeGuards() {
      await delay(2000);
      if (Math.random() < 0.5) throw new Error('糟糕!昏暗的走廊里迎面撞上了神庙守卫!');
      return '你屏住呼吸，从守卫身后悄悄溜了过去…';
    }

    // 阶段 6：打开宝藏箱
    static async openTreasureBox() {
      await delay(1500);
      return '你终于找到了那只尘封已久的宝藏箱…';
    }

    // 阶段 7：宝藏现身
    static async revealTreasure() {
      await delay(1200);
      return '箱盖缓缓打开，金光四射——失落的星辰宝藏就在眼前!';
    }
  }

  /* ---------------- UI 元素 ---------------- */
  const els = {
    stageList: document.getElementById('stageList'),
    progressBar: document.getElementById('progressBar'),
    log: document.getElementById('log'),
    result: document.getElementById('result'),
    resultTitle: document.getElementById('resultTitle'),
    resultText: document.getElementById('resultText'),
    chest: document.getElementById('chest'),
    startBtn: document.getElementById('startBtn'),
    compass: document.getElementById('compass'),
  };

  let currentStage = -1;

  /* ---------------- 渲染阶段进度列表 ---------------- */
  function renderStages() {
    els.stageList.innerHTML = '';
    STAGES.forEach((stage) => {
      const li = document.createElement('li');
      li.className = 'stage-item';
      li.innerHTML =
        `<span class="stage-icon">${stage.icon}</span>` +
        `<span class="stage-name">${stage.name}</span>`;
      els.stageList.appendChild(li);
    });
  }

  /* ---------------- 更新阶段高亮与进度条 ---------------- */
  function markStage(state) {
    const items = els.stageList.querySelectorAll('.stage-item');
    items.forEach((item, i) => {
      item.classList.remove('active', 'failed');
      item.classList.toggle('done', i < currentStage);
    });

    if (currentStage >= 0 && currentStage < items.length) {
      const node = items[currentStage];
      node.classList.add(state);
      if (state === 'done') node.classList.add('done');
    }

    const doneCount = els.stageList.querySelectorAll('.stage-item.done').length;
    els.progressBar.style.width = `${(doneCount / STAGES.length) * 100}%`;
  }

  /* ---------------- 逐条输出冒险日志 ---------------- */
  async function log(message, type = 'info', icon = '') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML =
      `<span class="log-icon">${icon}</span>` +
      `<span class="log-text">${message}</span>`;
    els.log.appendChild(entry);
    els.log.scrollTop = els.log.scrollHeight;
    await delay(220); // 让日志逐行出现，营造节奏感
  }

  function setWorking(on) {
    els.compass.classList.toggle('working', on);
  }

  function setButton(running) {
    els.startBtn.disabled = running;
    els.startBtn.textContent = running ? '🕯️ 冒险进行中…' : '⚓ 开始寻宝';
  }

  /* ---------------- 带重试的异步任务包装 ---------------- */
  async function withRetry(task, label, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await task();
      } catch (err) {
        await log(err.message, 'danger', '💥');
        if (attempt < maxAttempts) {
          await log(`第 ${attempt} 次尝试失败，重整旗鼓，准备再次出发…`, 'wait', '⏳');
        }
      }
    }
    throw new Error(`${label} 屡试屡败，本次冒险被迫中止`);
  }

  /* ---------------- 寻宝主流程（async/await 重写） ---------------- */
  async function findTreasure() {
    els.log.innerHTML = '';
    els.result.hidden = true;
    els.chest.classList.remove('open');
    els.chest.textContent = '🎁';
    currentStage = -1;
    setButton(true);

    try {
      await log('寻宝之旅正式开始!祝你好运，勇敢的探险家!', 'title', '🏴‍☠️');

      // 阶段 1：获取航海图
      currentStage = 0; markStage('active'); setWorking(true);
      const clue = await TreasureMap.getInitialClue();
      setWorking(false);
      await log(clue, 'ok', '📜'); markStage('done');

      // 阶段 2：破译古文字
      currentStage = 1; markStage('active'); setWorking(true);
      const location = await TreasureMap.decodeAncientScript(clue);
      setWorking(false);
      await log(location, 'ok', '🔍'); markStage('done');

      // 阶段 3：扬帆远航（随机风暴，可重试）
      currentStage = 2; markStage('active'); setWorking(true);
      const land = await withRetry(() => TreasureMap.sailTheSea(), '扬帆远航');
      setWorking(false);
      await log(land, 'ok', '⛵'); markStage('done');

      // 阶段 4：破解机关
      currentStage = 3; markStage('active'); setWorking(true);
      const door = await TreasureMap.solveMechanism();
      setWorking(false);
      await log(door, 'ok', '🧩'); markStage('done');

      // 阶段 5：躲避守卫（随机遭遇，可重试）
      currentStage = 4; markStage('active'); setWorking(true);
      const pass = await withRetry(() => TreasureMap.dodgeGuards(), '躲避守卫');
      setWorking(false);
      await log(pass, 'ok', '🗡️'); markStage('done');

      // 阶段 6：打开宝箱
      currentStage = 5; markStage('active'); setWorking(true);
      const box = await TreasureMap.openTreasureBox();
      setWorking(false);
      await log(box, 'ok', '🎁'); markStage('done');

      // 阶段 7：宝藏现身
      currentStage = 6; markStage('active'); setWorking(true);
      const treasure = await TreasureMap.revealTreasure();
      setWorking(false);
      await log(treasure, 'success', '💰'); markStage('done');

      // 成功收尾
      els.resultTitle.textContent = '🎉 寻宝成功!';
      els.resultText.textContent = '你凭借智慧与勇气，穿越风浪、破解机关，最终找到了失落的星辰宝藏。';
      els.chest.textContent = '💎';
      els.chest.classList.add('open');
      els.result.hidden = false;
    } catch (err) {
      setWorking(false);
      if (currentStage >= 0) markStage('failed');
      await log(`任务失败：${err.message}`, 'danger', '☠️');
      els.resultTitle.textContent = '😵 冒险失败';
      els.resultText.textContent = err.message;
      els.result.hidden = false;
    } finally {
      setWorking(false);
      setButton(false);
      els.startBtn.textContent = '🔄 再来一次';
    }
  }

  /* ---------------- 事件绑定与初始化 ---------------- */
  els.startBtn.addEventListener('click', findTreasure);

  renderStages();
})();
