let gold = 0;
let gem = 0;

let attackPower = 1;
let autoDamage = 0;

let attackUpgradeCost = 50;

let currentStage = 1;
let highestUnlockedStage = 1;

let stageKills = {};
let clearedStages = {};

let monsterHp = 30;
let monsterMaxHp = 30;
let totalKill = 0;

let bossTimeLeft = 30;
let bossTimerId = null;

let allies = {
    warrior: {
        name: "전사",
        image: "allies/warrior.png",
        owned: false,
        level: 0,
        baseDps: 2,
        buyCost: 100,
        buyCurrency: "gold",
        upgradeCost: 120
    },
    archer: {
        name: "궁수",
        image: "allies/archer.png",
        owned: false,
        level: 0,
        baseDps: 5,
        buyCost: 500,
        buyCurrency: "gold",
        upgradeCost: 600
    },
    mage: {
        name: "마법사",
        image: "allies/mage.png",
        owned: false,
        level: 0,
        baseDps: 15,
        buyCost: 2000,
        buyCurrency: "gold",
        upgradeCost: 2500
    },
    knight: {
        name: "기사",
        image: "allies/knight.png",
        owned: false,
        level: 0,
        baseDps: 40,
        buyCost: 8000,
        buyCurrency: "gold",
        upgradeCost: 10000
    },
    dragon: {
        name: "드래곤",
        image: "allies/dragon_ally.png",
        owned: false,
        level: 0,
        baseDps: 100,
        buyCost: 10,
        buyCurrency: "gem",
        upgradeCost: 18000
    },
    angel: {
        name: "천사",
        image: "allies/angel.png",
        owned: false,
        level: 0,
        baseDps: 250,
        buyCost: 30,
        buyCurrency: "gem",
        upgradeCost: 40000
    },
    demon: {
        name: "마왕 동료",
        image: "allies/demon_ally.png",
        owned: false,
        level: 0,
        baseDps: 600,
        buyCost: 80,
        buyCurrency: "gem",
        upgradeCost: 90000
    }
};

let passives = {
    attackBoost: {
        name: "공격력 증폭",
        desc: "현재 공격력을 2배 증가",
        cost: 20,
        bought: false
    },
    allyBoost: {
        name: "동료 강화",
        desc: "모든 동료 DPS 50% 증가",
        cost: 35,
        bought: false
    },
    bossTimeBoost: {
        name: "보스 시간 확장",
        desc: "보스 제한 시간 +10초",
        cost: 50,
        bought: false
    }
};

let achievements = {
    achFirstKill: false,
    achStage5: false,
    achKill50: false,
    achStage10: false,
    achStage20: false
};

let claimedRewards = {
    achFirstKill: false,
    achStage5: false,
    achKill50: false,
    achStage10: false,
    achStage20: false
};

const stageText = document.getElementById("stage");
const stageTypeText = document.getElementById("stageType");
const monsterName = document.getElementById("monsterName");
const monster = document.getElementById("monster");
const monsterHpText = document.getElementById("monsterHp");
const monsterMaxHpText = document.getElementById("monsterMaxHp");
const monsterHpFill = document.getElementById("monsterHpFill");

const stageKillText = document.getElementById("stageKill");
const stageNeedText = document.getElementById("stageNeed");
const bossTimerBox = document.getElementById("bossTimer");
const timeLeftText = document.getElementById("timeLeft");

const goldText = document.getElementById("gold");
const gemText = document.getElementById("gem");
const attackPowerText = document.getElementById("attackPower");
const autoDamageText = document.getElementById("autoDamage");
const highestStageText = document.getElementById("highestStage");
const totalKillText = document.getElementById("totalKill");

const attackUpgradeCostText = document.getElementById("attackUpgradeCost");
const stageButtons = document.getElementById("stageButtons");

const battleCard = document.querySelector(".battle-card");

battleCard.addEventListener("pointerdown", function(event) {
    if (
        event.target.tagName === "BUTTON" ||
        event.target.closest(".stage-select-bottom")
    ) {
        return;
    }

    attackMonster(getAttackPower());
    showPlusText(event.clientX, event.clientY, "-" + getAttackPower());
});

function getAttackPower() {
    return attackPower;
}

function calculateAutoDamage() {
    let total = 0;

    for (let key in allies) {
        const ally = allies[key];

        if (ally.owned) {
            total += ally.baseDps * ally.level;
        }
    }

    if (passives.allyBoost.bought) {
        total = Math.floor(total * 1.5);
    }

    autoDamage = total;
}

function isBossStage(stage) {
    return stage % 5 === 0;
}

function getStageKillCount(stage) {
    return stageKills[stage] || 0;
}

function setStageKillCount(stage, count) {
    stageKills[stage] = count;
}

function startStage(stage) {
    if (stage > highestUnlockedStage) {
        showNotice("아직 해금되지 않은 스테이지입니다.");
        return;
    }

    currentStage = stage;
    stopBossTimer();
    createMonster();

    if (isBossStage(currentStage) && !clearedStages[currentStage]) {
        startBossTimer();
    }

    updateScreen();
}

function createMonster() {
    if (isBossStage(currentStage)) {
        monsterMaxHp = Math.floor(300 * Math.pow(1.35, currentStage / 5 - 1));
        monsterHp = monsterMaxHp;
    } else {
        monsterMaxHp = Math.floor(30 * Math.pow(1.18, currentStage - 1));
        monsterHp = monsterMaxHp;
    }

    if (currentStage === 5) {
        monsterName.textContent = "킹 슬라임";
        monster.src = "images/king_slime.png";
    } else if (currentStage === 10) {
        monsterName.textContent = "고블린 족장";
        monster.src = "images/goblin_chief.png";
    } else if (currentStage === 15) {
        monsterName.textContent = "오크 워로드";
        monster.src = "images/orc_warlord.png";
    } else if (currentStage === 20) {
        monsterName.textContent = "데스 나이트";
        monster.src = "images/death_knight.png";
    } else if (currentStage === 30) {
        monsterName.textContent = "고대 드래곤";
        monster.src = "images/ancient_dragon.png";
    } else if (currentStage >= 31) {
        monsterName.textContent = "마왕";
        monster.src = "images/demon_lord.png";
    } else if (currentStage < 5) {
        monsterName.textContent = "슬라임";
        monster.src = "images/slime.png";
    } else if (currentStage < 10) {
        monsterName.textContent = "고블린";
        monster.src = "images/goblin.png";
    } else if (currentStage < 15) {
        monsterName.textContent = "오크";
        monster.src = "images/orc.png";
    } else if (currentStage < 20) {
        monsterName.textContent = "스켈레톤 나이트";
        monster.src = "images/skeleton_knight.png";
    } else if (currentStage < 30) {
        monsterName.textContent = "드래곤";
        monster.src = "images/dragon.png";
    }
}

function attackMonster(damage) {
    monsterHp -= damage;

    monster.classList.remove("hit");
    void monster.offsetWidth;
    monster.classList.add("hit");

    if (monsterHp <= 0) {
        defeatMonster();
        return;
    }

    updateScreen();
}

function defeatMonster() {
    const boss = isBossStage(currentStage);

    totalKill++;

    if (boss) {
        clearedStages[currentStage] = true;
        gold += currentStage * 100;
        gem += Math.floor(currentStage / 5);

        stopBossTimer();
        unlockNextStage();

        showStageClear("BOSS CLEAR!");

        currentStage++;
        startStage(currentStage);
        return;
    }

    let count = getStageKillCount(currentStage);
    count++;
    setStageKillCount(currentStage, count);

    gold += currentStage * 15;

    if (count >= 10) {
        clearedStages[currentStage] = true;
        unlockNextStage();

        showStageClear("STAGE CLEAR!");

        currentStage++;
        startStage(currentStage);
        return;
    }

    createMonster();
    updateScreen();
}

function unlockNextStage() {
    if (highestUnlockedStage <= currentStage) {
        highestUnlockedStage = currentStage + 1;
    }
}

function startBossTimer() {
    bossTimeLeft = passives.bossTimeBoost.bought ? 40 : 30;
    timeLeftText.textContent = bossTimeLeft;
    bossTimerBox.classList.remove("hidden");

    bossTimerId = setInterval(function() {
        bossTimeLeft--;
        timeLeftText.textContent = bossTimeLeft;

        if (bossTimeLeft <= 0) {
            stopBossTimer();
            showStageClear("BOSS FAILED!");
            createMonster();
            startBossTimer();
            updateScreen();
        }
    }, 1000);
}

function stopBossTimer() {
    if (bossTimerId !== null) {
        clearInterval(bossTimerId);
        bossTimerId = null;
    }

    bossTimerBox.classList.add("hidden");
}

function buyAttackUpgrade() {
    if (gold >= attackUpgradeCost) {
        gold -= attackUpgradeCost;
        attackPower += 3;
        attackUpgradeCost = Math.floor(attackUpgradeCost * 1.7);
        showNotice("공격력이 증가했습니다!");
        updateScreen();
    } else {
        showNotice("Gold가 부족합니다.");
    }
}

function buyAlly(key) {
    const ally = allies[key];

    if (ally.owned) {
        showNotice("이미 고용한 동료입니다.");
        return;
    }

    if (ally.buyCurrency === "gold") {
        if (gold < ally.buyCost) {
            showNotice("Gold가 부족합니다.");
            return;
        }

        gold -= ally.buyCost;
    } else {
        if (gem < ally.buyCost) {
            showNotice("Gem이 부족합니다.");
            return;
        }

        gem -= ally.buyCost;
    }

    ally.owned = true;
    ally.level = 1;

    calculateAutoDamage();
    renderAllies();
    updateScreen();
    showNotice(ally.name + " 고용 완료!");
}

function upgradeAlly(key) {
    const ally = allies[key];

    if (!ally.owned) {
        showNotice("먼저 고용해야 합니다.");
        return;
    }

    if (gold < ally.upgradeCost) {
        showNotice("Gold가 부족합니다.");
        return;
    }

    gold -= ally.upgradeCost;
    ally.level++;
    ally.upgradeCost = Math.floor(ally.upgradeCost * 1.6);

    calculateAutoDamage();
    renderAllies();
    updateScreen();
    showNotice(ally.name + " 레벨업!");
}

function openSkill(key) {
    const ally = allies[key];

    if (!ally.owned) {
        showNotice("먼저 고용해야 합니다.");
        return;
    }

    showNotice(ally.name + " 스킬은 이후 추가 예정입니다.");
}

function buyPassive(key) {
    const passive = passives[key];

    if (passive.bought) {
        showNotice("이미 구매한 패시브입니다.");
        return;
    }

    if (gem < passive.cost) {
        showNotice("Gem이 부족합니다.");
        return;
    }

    gem -= passive.cost;
    passive.bought = true;

    if (key === "attackBoost") {
        attackPower *= 2;
    }

    calculateAutoDamage();
    renderPassives();
    updateScreen();
    showNotice(passive.name + " 구매 완료!");
}

function openAllyModal() {
    renderAllies();
    document.getElementById("allyModal").classList.remove("hidden");
}

function closeAllyModal() {
    document.getElementById("allyModal").classList.add("hidden");
}

function openPassiveModal() {
    renderPassives();
    document.getElementById("passiveModal").classList.remove("hidden");
}

function closePassiveModal() {
    document.getElementById("passiveModal").classList.add("hidden");
}

function openAchievementModal() {
    document.getElementById("achievementModal").classList.remove("hidden");
}

function closeAchievementModal() {
    document.getElementById("achievementModal").classList.add("hidden");
}

function renderAllies() {
    const allyList = document.getElementById("allyList");
    allyList.innerHTML = "";

    for (let key in allies) {
        const ally = allies[key];
        const card = document.createElement("div");

        card.className = "ally-card";

        const currencyText = ally.buyCurrency === "gem" ? "Gem" : "Gold";

        card.innerHTML = `
            <div class="ally-left">
                <img src="${ally.image}" class="ally-icon" alt="${ally.name}">
                <div class="ally-name">${ally.name}</div>
            </div>

            <div class="ally-center">
                <p>상태 : ${ally.owned ? "고용 완료" : "미고용"}</p>
                <p>Level : ${ally.level}</p>
                <p>DPS : ${ally.owned ? ally.baseDps * ally.level : ally.baseDps}</p>
            </div>

            <div class="ally-right">
                <button
                    class="ally-btn"
                    onclick="${ally.owned ? `upgradeAlly('${key}')` : `buyAlly('${key}')`}"
                >
                    ${
                        ally.owned
                            ? `레벨업 (${ally.upgradeCost} Gold)`
                            : `고용 (${ally.buyCost} ${currencyText})`
                    }
                </button>

                <button
                    class="ally-btn skill-btn"
                    onclick="openSkill('${key}')"
                    ${ally.owned ? "" : "disabled"}
                >
                    스킬
                </button>
            </div>
        `;

        allyList.appendChild(card);
    }
}

function renderPassives() {
    const passiveList = document.getElementById("passiveList");
    passiveList.innerHTML = "";

    for (let key in passives) {
        const passive = passives[key];
        const card = document.createElement("div");

        card.className = "passive-card";

        card.innerHTML = `
            <h3>💎 ${passive.name}</h3>
            <p>${passive.desc}</p>
            <p>비용 : <span class="gem-cost">${passive.cost} Gem</span></p>
            <p>상태 : ${passive.bought ? "구매 완료" : "미구매"}</p>
            <button onclick="buyPassive('${key}')" ${passive.bought ? "disabled" : ""}>
                ${passive.bought ? "구매 완료" : "구매하기"}
            </button>
        `;

        passiveList.appendChild(card);
    }
}

function toggleStageMenu() {
    stageButtons.classList.toggle("show");
}

function updateScreen() {
    calculateAutoDamage();

    const boss = isBossStage(currentStage);

    stageText.textContent = currentStage;
    stageTypeText.textContent = boss ? "Boss Stage" : "Normal Stage";

    if (boss) {
        stageKillText.textContent = clearedStages[currentStage] ? "CLEAR" : "BOSS";
        stageNeedText.textContent = "1";
        bossTimerBox.classList.toggle("hidden", clearedStages[currentStage] || bossTimerId === null);
    } else {
        stageKillText.textContent = Math.min(getStageKillCount(currentStage), 10);
        stageNeedText.textContent = "10";
    }

    monsterHpText.textContent = Math.max(0, monsterHp);
    monsterMaxHpText.textContent = monsterMaxHp;
    monsterHpFill.style.width = Math.max(0, monsterHp / monsterMaxHp * 100) + "%";

    goldText.textContent = gold;
    gemText.textContent = gem;
    attackPowerText.textContent = getAttackPower();
    autoDamageText.textContent = autoDamage;
    highestStageText.textContent = highestUnlockedStage;
    totalKillText.textContent = totalKill;

    attackUpgradeCostText.textContent = attackUpgradeCost;

    updateAchievements();
    renderStageButtons();
    autoSave();
}

function renderStageButtons() {
    const wasOpen = stageButtons.classList.contains("show");

    stageButtons.innerHTML = "";

    let start = Math.floor((currentStage - 1) / 5) * 5 + 1;
    let end = start + 4;

    for (let i = start; i <= end; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i > highestUnlockedStage) {
            btn.disabled = true;
        } else if (i === currentStage) {
            btn.classList.add("current");
        } else {
            btn.classList.add("unlocked");
        }

        btn.onclick = function() {
            startStage(i);
        };

        stageButtons.appendChild(btn);
    }

    if (wasOpen) {
        stageButtons.classList.add("show");
    }
}

function updateAchievements() {
    activateAchievement("achFirstKill", totalKill >= 1, "btnAchFirstKill");
    activateAchievement("achStage5", clearedStages[5], "btnAchStage5");
    activateAchievement("achKill50", totalKill >= 50, "btnAchKill50");
    activateAchievement("achStage10", clearedStages[10], "btnAchStage10");
    activateAchievement("achStage20", highestUnlockedStage >= 20, "btnAchStage20");
}

function activateAchievement(id, condition, buttonId) {
    const achievement = document.getElementById(id);
    const button = document.getElementById(buttonId);

    if (condition) {
        achievements[id] = true;
        achievement.classList.add("done");

        if (!claimedRewards[id]) {
            button.disabled = false;
            button.classList.add("active");
        }
    }

    if (claimedRewards[id]) {
        button.disabled = true;
        button.textContent = "수령 완료";
        button.classList.remove("active");
        button.classList.add("claimed");
    }
}

function claimReward(id, rewardGem) {
    if (!achievements[id] || claimedRewards[id]) {
        return;
    }

    gem += rewardGem;
    claimedRewards[id] = true;

    updateScreen();
    showNotice("Gem +" + rewardGem + " 수령 완료!");
}

function showPlusText(x, y, text) {
    const plus = document.createElement("div");
    plus.className = "plus-text";
    plus.textContent = text;
    plus.style.left = x + "px";
    plus.style.top = y + "px";

    document.body.appendChild(plus);

    setTimeout(() => {
        plus.remove();
    }, 800);
}

function showStageClear(text) {
    const div = document.createElement("div");

    div.className = "stage-clear";
    div.textContent = text;

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1500);
}

function showNotice(text) {
    const div = document.createElement("div");

    div.className = "notice";
    div.textContent = text;

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1200);
}

function getSaveData() {
    return {
        gold,
        gem,
        attackPower,
        autoDamage,
        attackUpgradeCost,
        currentStage,
        highestUnlockedStage,
        stageKills,
        clearedStages,
        monsterHp,
        monsterMaxHp,
        totalKill,
        allies,
        passives,
        achievements,
        claimedRewards
    };
}

function applySaveData(data) {
    gold = data.gold || 0;
    gem = data.gem || 0;
    attackPower = data.attackPower || 1;
    autoDamage = data.autoDamage || 0;
    attackUpgradeCost = data.attackUpgradeCost || 50;
    currentStage = data.currentStage || 1;
    highestUnlockedStage = data.highestUnlockedStage || 1;
    stageKills = data.stageKills || {};
    clearedStages = data.clearedStages || {};
    monsterHp = data.monsterHp || 30;
    monsterMaxHp = data.monsterMaxHp || 30;
    totalKill = data.totalKill || 0;
    allies = data.allies || allies;
    passives = data.passives || passives;
    achievements = data.achievements || achievements;
    claimedRewards = data.claimedRewards || claimedRewards;

    createMonster();
    monsterHp = data.monsterHp || monsterMaxHp;

    if (isBossStage(currentStage) && !clearedStages[currentStage]) {
        startBossTimer();
    }

    updateScreen();
}

function saveGame() {
    localStorage.setItem("monsterStageClickerSave", JSON.stringify(getSaveData()));
    showNotice("게임이 저장되었습니다.");
}

function loadGame() {
    const data = localStorage.getItem("monsterStageClickerSave");

    if (data) {
        stopBossTimer();
        applySaveData(JSON.parse(data));
        showNotice("저장된 게임을 불러왔습니다.");
    } else {
        showNotice("저장된 데이터가 없습니다.");
    }
}

function autoSave() {
    localStorage.setItem("monsterStageClickerAutoSave", JSON.stringify(getSaveData()));
}

function loadAutoSave() {
    const data = localStorage.getItem("monsterStageClickerAutoSave");

    if (data) {
        applySaveData(JSON.parse(data));
    }
}

function resetGame() {
    localStorage.removeItem("monsterStageClickerSave");
    localStorage.removeItem("monsterStageClickerAutoSave");
    location.reload();
}

setInterval(function() {
    if (autoDamage > 0) {
        attackMonster(autoDamage);
    }
}, 1000);

loadAutoSave();
createMonster();
updateScreen();