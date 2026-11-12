
// ==============================
// 1. 圖片變數
// ==============================

// 宣告待機精靈圖
let stopImg;

// 宣告走路精靈圖
let walkImg;

// 宣告魔法精靈圖
let magicImg;

// 宣告魔法特效精靈圖
let effectImg;

// ==============================
// 2. 精靈圖資料
// ==============================

// 設定待機圖片影格數
const STOP_COUNT = 10;

// 設定走路圖片影格數
const WALK_COUNT = 9;

// 設定魔法圖片影格數
const MAGIC_COUNT = 4;

// 設定特效圖片影格數
const EFFECT_COUNT = 5;

// 設定待機精靈圖尺寸
const STOP_W = 1385;
const STOP_H = 212;

// 設定走路精靈圖尺寸
const WALK_W = 1246;
const WALK_H = 198;

// 設定魔法精靈圖尺寸
const MAGIC_W = 1039;
const MAGIC_H = 146;

// 設定特效精靈圖尺寸
const EFFECT_W = 740;
const EFFECT_H = 19;

// ==============================
// 3. 角色狀態
// ==============================

// 設定角色 X 軸位置
let playerX;

// 設定角色移動速度
let playerSpeed = 5;

// 設定角色移動方向
let moveDir = 0;

// 設定角色面向方向
let facing = 1;

// 設定角色動畫狀態
let playerState = "stop";

// 設定動畫播放速度
let animFPS = 10;

// 記錄動畫開始時間
let animStart = 0;

// 記錄魔法動畫影格
let magicFrame = 0;

// 設定天空藍背景
let skyColor;

// ==============================
// 4. 特效狀態
// ==============================

// 設定特效是否啟動
let effectActive = false;

// 設定特效 X 軸位置
let effectX = 0;

// 設定特效 Y 軸位置
let effectY = 0;

// 設定特效移動方向
let effectDir = 1;

// 設定特效移動速度
let effectSpeed = 12;

// 設定特效動畫開始時間
let effectStart = 0;

// ==============================
// 5. 載入圖片
// ==============================

function preload() {

  // 載入待機圖片
  stopImg = loadImage("./1/stop/stop.png");

  // 載入走路圖片
  walkImg = loadImage("./1/walk/walk.png");

  // 載入魔法圖片
  magicImg = loadImage("./1/magic/magic.png");

  // 載入魔法特效圖片
  effectImg = loadImage("./1/magic_effect/magic_effect.png");
}

// ==============================
// 6. 初始化畫布
// ==============================

function setup() {

  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 設定圖片以中心點繪製
  imageMode(CENTER);

  // 設定背景顏色
  skyColor = color(135, 206, 235);

  // 設定角色初始位置
  playerX = width * 2 / 3;

  // 設定畫面更新速度
  frameRate(60);
}

// ==============================
// 7. 主動畫
// ==============================

function draw() {

  // 清除畫面並繪製天空藍背景
  background(skyColor);

  // 計算角色顯示高度
  let playerH = height / 3;

  // 計算角色底部貼齊畫布的 Y 座標
  let playerY = height - playerH / 2;

  // 宣告目前使用的圖片
  let img;

  // 宣告目前影格數
  let count;

  // 宣告圖片原始高度
  let sourceH;

  // 宣告每張圖片的原始寬度
  let sourceFrameW;

  // ==============================
  // 8. 選擇角色動畫
  // ==============================

  // 判斷目前是否為待機狀態
  if (playerState === "stop") {

    // 使用待機圖片
    img = stopImg;

    // 設定待機影格數
    count = STOP_COUNT;

    // 設定待機圖片高度
    sourceH = STOP_H;

    // 設定待機圖片每張寬度
    sourceFrameW = STOP_W / STOP_COUNT;
  }

  // 判斷目前是否為走路狀態
  else if (playerState === "walk") {

    // 使用走路圖片
    img = walkImg;

    // 設定走路影格數
    count = WALK_COUNT;

    // 設定走路圖片高度
    sourceH = WALK_H;

    // 設定走路圖片每張寬度
    sourceFrameW = WALK_W / WALK_COUNT;
  }

  // 判斷目前是否為魔法狀態
  else {

    // 使用魔法圖片
    img = magicImg;

    // 設定魔法影格數
    count = MAGIC_COUNT;

    // 設定魔法圖片高度
    sourceH = MAGIC_H;

    // 設定魔法圖片每張寬度
    sourceFrameW = MAGIC_W / MAGIC_COUNT;
  }

  // ==============================
  // 9. 計算角色尺寸
  // ==============================

  // 計算角色顯示寬度
  let playerW = playerH * (sourceFrameW / sourceH);

  // 計算角色左側邊界
  let leftEdge = playerW / 2;

  // 計算角色右側邊界
  let rightEdge = width - playerW / 2;

  // ==============================
  // 10. 角色移動
  // ==============================

  // 只有走路狀態才允許移動
  if (playerState === "walk") {

    // 更新角色位置
    playerX += moveDir * playerSpeed;
  }

  // 限制角色不超出畫布
  if (leftEdge <= rightEdge) {

    // 限制角色在左右邊界內
    playerX = constrain(playerX, leftEdge, rightEdge);

  } else {

    // 畫布太窄時角色固定在中央
    playerX = width / 2;
  }

  // 到達左側停止移動
  if (playerX <= leftEdge && moveDir < 0) {
    moveDir = 0;
  }

  // 到達右側停止移動
  if (playerX >= rightEdge && moveDir > 0) {
    moveDir = 0;
  }

  // ==============================
  // 11. 計算動畫影格
  // ==============================

  // 計算目前動畫已經播放多久
  let elapsed = millis() - animStart;

  // 計算目前動畫影格
  let frameIndex = floor(elapsed / (1000 / animFPS));

  // 魔法動畫只播放一次
  if (playerState === "magic") {

    // 判斷魔法動畫是否播放完成
    if (frameIndex >= MAGIC_COUNT) {

      // 設定角色回到待機狀態
      playerState = "stop";

      // 重設動畫開始時間
      animStart = millis();

      // 發射魔法特效
      launchEffect();

      // 將影格重設為第一張
      frameIndex = 0;
    }
  }

  // 其他動畫持續循環播放
  if (playerState !== "magic") {

    // 循環計算目前影格
    frameIndex = floor((millis() - animStart) / (1000 / animFPS)) % count;
  }

  // 限制影格索引不超出範圍
  frameIndex = constrain(frameIndex, 0, count - 1);

  // 計算來源圖片 X 軸位置
  let sourceX = frameIndex * sourceFrameW;

  // ==============================
  // 12. 繪製角色
  // ==============================

  // 儲存目前繪圖狀態
  push();

  // 將繪圖中心移動到角色位置
  translate(playerX, playerY);

  // 根據面向方向水平翻轉
  scale(facing, 1);

  // 繪製角色目前影格
  image(
    img,
    0,
    0,
    playerW,
    playerH,
    sourceX,
    0,
    sourceFrameW,
    sourceH
  );

  // 還原繪圖狀態
  pop();

  // ==============================
  // 13. 更新魔法特效
  // ==============================

  // 如果特效已經啟動
  if (effectActive) {

    // 更新並繪製魔法特效
    drawEffect();
  }
}

// ==============================
// 14. 發射魔法特效
// ==============================

function launchEffect() {

  // 啟動魔法特效
  effectActive = true;

  // 設定特效從角色目前位置發射
  effectX = playerX;

  // 設定特效高度
  effectY = height - (height / 3) * 0.7;

  // 特效方向依照角色面向決定
  effectDir = facing;

  // 記錄特效動畫開始時間
  effectStart = millis();
}

// ==============================
// 15. 繪製魔法特效
// ==============================

function drawEffect() {

  // 設定特效顯示高度
  let effectH = (height / 3) * 0.25;

  // 根據原始比例計算特效寬度
  let effectDisplayW = effectH * ((EFFECT_W / EFFECT_COUNT) / EFFECT_H);

  // 計算特效目前播放影格
  let frameIndex = floor((millis() - effectStart) / (1000 / 12)) % EFFECT_COUNT;

  // 計算特效圖片來源位置
  let sourceX = frameIndex * (EFFECT_W / EFFECT_COUNT);

  // 更新特效移動位置
  effectX += effectDir * effectSpeed;

  // 儲存畫布狀態
  push();

  // 移動畫布至特效位置
  translate(effectX, effectY);

  // 依照方向翻轉特效
  scale(effectDir, 1);

  // 繪製特效圖片
  image(
    effectImg,
    0,
    0,
    effectDisplayW,
    effectH,
    sourceX,
    0,
    EFFECT_W / EFFECT_COUNT,
    EFFECT_H
  );

  // 還原畫布狀態
  pop();

  // 判斷特效是否超出右側
  if (effectDir === 1 && effectX - effectDisplayW / 2 > width) {

    // 關閉特效
    effectActive = false;
  }

  // 判斷特效是否超出左側
  if (effectDir === -1 && effectX + effectDisplayW / 2 < 0) {

    // 關閉特效
    effectActive = false;
  }
}

// ==============================
// 16. 鍵盤按下事件
// ==============================

function keyPressed() {

  // 魔法施展期間暫停其他角色控制
  if (playerState === "magic") {
    return false;
  }

  // 按下右方向鍵
  if (keyCode === RIGHT_ARROW) {

    // 設定角色面向右邊
    facing = 1;

    // 設定向右移動
    moveDir = 1;

    // 切換走路動畫
    playerState = "walk";

    // 重設動畫時間
    animStart = millis();

    // 阻止瀏覽器預設行為
    return false;
  }

  // 按下左方向鍵
  if (keyCode === LEFT_ARROW) {

    // 設定角色面向左邊
    facing = -1;

    // 設定向左移動
    moveDir = -1;

    // 切換走路動畫
    playerState = "walk";

    // 重設動畫時間
    animStart = millis();

    // 阻止瀏覽器預設行為
    return false;
  }

  // 按下空白鍵
  if (key === " ") {

    // 停止角色移動
    moveDir = 0;

    // 切換成魔法動畫
    playerState = "magic";

    // 設定魔法動畫開始時間
    animStart = millis();

    // 阻止網頁因空白鍵捲動
    return false;
  }
}

// ==============================
// 17. 鍵盤放開事件
// ==============================

function keyReleased() {

  // 放開左方向鍵或右方向鍵
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {

    // 停止角色移動
    moveDir = 0;

    // 如果角色目前正在走路
    if (playerState === "walk") {

      // 切換回待機動畫
      playerState = "stop";

      // 重設動畫開始時間
      animStart = millis();
    }

    // 阻止瀏覽器預設行為
    return false;
  }

  // 放開空白鍵時阻止網頁捲動
  if (key === " ") {
    return false;
  }
}

// ==============================
// 18. 畫布大小改變
// ==============================

function windowResized() {

  // 重新設定畫布尺寸
  resizeCanvas(windowWidth, windowHeight);

  // 限制角色位置在新畫布範圍
  playerX = constrain(playerX, 0, width);
}
