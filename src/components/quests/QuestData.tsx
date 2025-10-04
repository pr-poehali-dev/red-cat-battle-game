import type { Quest, Achievement } from './QuestTypes'

// Генерация ежедневных квестов
export const generateDailyQuests = (): Quest[] => [
  {
    id: 'daily_battles',
    title: '⚔️ Ежедневный Воин',
    description: 'Побеждай врагов в боях и зарабатывай опыт! Выиграй 3 битвы сегодня, чтобы получить награды. Сражайся на главном экране, нажимая на кота.',
    type: 'daily',
    category: 'battle',
    objectives: [
      {
        id: 'win_3_battles',
        description: 'Победы в битвах',
        type: 'win_battles',
        targetValue: 3,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 500, amount: 500, description: '500 монет' },
      { type: 'experience', value: 100, amount: 100, description: '100 опыта' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 3,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    rarity: 'common',
    icon: '⚔️'
  },
  {
    id: 'daily_coins',
    title: '💰 Сборщик Монет',
    description: 'Собирай богатства космоса! Заработай 2000 монет за день, побеждая врагов и проходя турниры. Монеты начисляются за каждую победу.',
    type: 'daily',
    category: 'progression',
    objectives: [
      {
        id: 'earn_2000_coins',
        description: 'Монеты заработаны',
        type: 'earn_coins',
        targetValue: 2000,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 800, amount: 800, description: '800 бонусных монет' },
      { type: 'item', value: 'power_boost', amount: 1, description: 'Усилитель силы' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 2000,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    rarity: 'common',
    icon: '💰'
  },
  {
    id: 'daily_cat_upgrade',
    title: '⭐ Тренировка Котов',
    description: 'Делай своих котов сильнее! Улучши характеристики или уровень 2 котов сегодня. Заходи во вкладку "Коты" и прокачивай их атаку, защиту, здоровье или скорость.',
    type: 'daily',
    category: 'collection',
    objectives: [
      {
        id: 'upgrade_2_cats',
        description: 'Коты улучшены',
        type: 'upgrade_cats',
        targetValue: 2,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 1000, amount: 1000, description: '1000 монет' },
      { type: 'experience', value: 200, amount: 200, description: '200 опыта' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 2,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    rarity: 'rare',
    icon: '⭐'
  }
]

// Генерация еженедельных квестов
export const generateWeeklyQuests = (): Quest[] => [
  {
    id: 'weekly_tournament',
    title: '🏆 Турнирный Мастер',
    description: 'Стань чемпионом арены! Пройди 5 турниров за неделю, чтобы доказать своё мастерство. Заходи во вкладку "Бои" → "Турниры" и выбирай испытания.',
    type: 'weekly',
    category: 'battle',
    objectives: [
      {
        id: 'join_5_tournaments',
        description: 'Турниры пройдены',
        type: 'join_tournament',
        targetValue: 5,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 5000, amount: 5000, description: '5000 монет' },
      { type: 'cat', value: 'rare_tournament_cat', amount: 1, description: 'Редкий турнирный кот' },
      { type: 'experience', value: 1000, amount: 1000, description: '1000 опыта' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 5,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rarity: 'epic',
    icon: '🏆'
  },
  {
    id: 'weekly_collection',
    title: '🐱 Великий Коллекционер',
    description: 'Расширяй свою армию космических котов! Купи 3 новых кота в магазине за неделю. Каждый кот уникален и имеет свои особенности. Заходи в "Магазин" и выбирай бойцов!',
    type: 'weekly',
    category: 'collection',
    objectives: [
      {
        id: 'collect_3_cats',
        description: 'Новые коты получены',
        type: 'collect_cats',
        targetValue: 3,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 3000, amount: 3000, description: '3000 монет' },
      { type: 'item', value: 'cat_summoner', amount: 1, description: 'Призыватель котов' },
      { type: 'title', value: 'Повелитель Котов', amount: 1, description: 'Эксклюзивный титул' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 3,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rarity: 'epic',
    icon: '🐱'
  },
  {
    id: 'weekly_social',
    title: '👥 Социальная Звезда',
    description: 'Будь активным членом гильдии! Участвуй в гильдейских активностях, рейдах и донатах 10 раз за неделю. Переходи во вкладку "Гильдия" и помогай своим товарищам!',
    type: 'weekly',
    category: 'social',
    objectives: [
      {
        id: 'guild_activity_10',
        description: 'Активность в гильдии',
        type: 'guild_activity',
        targetValue: 10,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 4000, amount: 4000, description: '4000 монет' },
      { type: 'experience', value: 800, amount: 800, description: '800 опыта' },
      { type: 'cosmetic', value: 'guild_banner', amount: 1, description: 'Баннер гильдии' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 10,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rarity: 'rare',
    icon: '👥'
  }
]

// Система достижений
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_victory',
    title: '🏅 Первая Победа',
    description: 'Начни свой путь воина! Одержи свою первую победу в битве, нажав на кота на главном экране. Это первый шаг к величию!',
    category: 'battle_master',
    requirements: [
      { type: 'total_wins', value: 1, description: 'Победы в битвах: 1' }
    ],
    rewards: [
      { type: 'coins', value: 100, amount: 100, description: '100 монет' },
      { type: 'title', value: 'Новичок', amount: 1, description: 'Титул "Новичок"' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'bronze',
    icon: '🏅',
    badge: '🥉'
  },
  {
    id: 'battle_veteran',
    title: '⚔️ Ветеран Битв',
    description: 'Покажи своё мастерство! Одержи 100 побед в боях и докажи, что ты настоящий воин. За это получишь редкого Кота-Ветерана и престижный титул!',
    category: 'battle_master',
    requirements: [
      { type: 'total_wins', value: 100, description: 'Победы в битвах: 100' }
    ],
    rewards: [
      { type: 'coins', value: 5000, amount: 5000, description: '5000 монет' },
      { type: 'cat', value: 'veteran_cat', amount: 1, description: 'Кот-Ветеран' },
      { type: 'title', value: 'Ветеран Арены', amount: 1, description: 'Титул "Ветеран Арены"' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 100,
    rarity: 'gold',
    icon: '⚔️',
    badge: '🥇'
  },
  {
    id: 'cat_master',
    title: '🐱 Мастер Котов',
    description: 'Создай легендарную коллекцию! Собери 50 разных космических котов в свою армию. Получишь Легендарного Мастер-Кота и Корону Повелителя Котов!',
    category: 'collector',
    requirements: [
      { type: 'cats_collected', value: 50, description: 'Коллекция котов: 50' }
    ],
    rewards: [
      { type: 'coins', value: 10000, amount: 10000, description: '10,000 монет' },
      { type: 'cat', value: 'legendary_master_cat', amount: 1, description: 'Легендарный Мастер-Кот' },
      { type: 'cosmetic', value: 'cat_crown', amount: 1, description: 'Корона Повелителя Котов' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 50,
    rarity: 'platinum',
    icon: '🐱',
    badge: '👑'
  },
  {
    id: 'millionaire',
    title: '💎 Космический Миллионер',
    description: 'Стань богачом галактики! Заработай 1,000,000 монет за всё время игры. Это высшее достижение в накоплении богатства. Получишь 100,000 бонусных монет и Золотой корабль!',
    category: 'progression',
    requirements: [
      { type: 'coins_earned', value: 1000000, description: 'Монеты заработаны: 1,000,000' }
    ],
    rewards: [
      { type: 'coins', value: 100000, amount: 100000, description: '100,000 бонусных монет' },
      { type: 'title', value: 'Космический Миллионер', amount: 1, description: 'Престижный титул' },
      { type: 'cosmetic', value: 'golden_spaceship', amount: 1, description: 'Золотой корабль' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 1000000,
    rarity: 'diamond',
    icon: '💎',
    badge: '💎'
  },
  {
    id: 'tournament_champion',
    title: '🏆 Чемпион Турниров',
    description: 'Стань легендой арены! Выиграй 25 турниров и докажи, что ты непобедим. Получишь Кота-Чемпиона, титул "Великий Чемпион" и Трофей Чемпиона!',
    category: 'battle_master',
    requirements: [
      { type: 'tournaments_won', value: 25, description: 'Турниры выиграны: 25' }
    ],
    rewards: [
      { type: 'coins', value: 15000, amount: 15000, description: '15,000 монет' },
      { type: 'cat', value: 'champion_cat', amount: 1, description: 'Кот-Чемпион' },
      { type: 'title', value: 'Великий Чемпион', amount: 1, description: 'Титул "Великий Чемпион"' },
      { type: 'cosmetic', value: 'champion_trophy', amount: 1, description: 'Трофей Чемпиона' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 25,
    rarity: 'platinum',
    icon: '🏆',
    badge: '🏆'
  },
  {
    id: 'social_butterfly',
    title: '🦋 Социальная Бабочка',
    description: 'Развивай свою гильдию! Достигни 10 уровня гильдии, участвуя в рейдах и помогая товарищам. Получишь титул "Лидер Сообщества" и Плащ Мастера Гильдии!',
    category: 'social_butterfly',
    requirements: [
      { type: 'guild_level', value: 10, description: 'Уровень гильдии: 10' }
    ],
    rewards: [
      { type: 'coins', value: 8000, amount: 8000, description: '8,000 монет' },
      { type: 'title', value: 'Лидер Сообщества', amount: 1, description: 'Титул "Лидер Сообщества"' },
      { type: 'cosmetic', value: 'guild_master_cape', amount: 1, description: 'Плащ Мастера Гильдии' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: 'gold',
    icon: '🦋',
    badge: '🦋'
  }
]