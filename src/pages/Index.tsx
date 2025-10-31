import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  price: number;
  discount?: number;
  image: string;
  tags: string[];
  rating: number;
  description: string;
  screenshots: string[];
  requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
  };
}

const GAMES: Game[] = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    price: 1999,
    discount: 30,
    image: "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/3d9c24a8-39f2-4a45-9eb3-6106e034a275.jpg",
    tags: ["Экшен", "RPG", "Открытый мир"],
    rating: 95,
    description: "Погрузитесь в футуристический мегаполис будущего. Выбирайте свой путь в мире корпораций и киберпанка.",
    screenshots: [
      "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/3d9c24a8-39f2-4a45-9eb3-6106e034a275.jpg",
      "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/3d9c24a8-39f2-4a45-9eb3-6106e034a275.jpg"
    ],
    requirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-6700",
      memory: "16 GB RAM",
      graphics: "NVIDIA GeForce GTX 1060"
    }
  },
  {
    id: 2,
    title: "Kingdom of Dragons",
    price: 1499,
    discount: 50,
    image: "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/13a2d8e5-1bc0-4613-9e9c-50f64db1db3a.jpg",
    tags: ["Стратегия", "Фэнтези", "Мультиплеер"],
    rating: 88,
    description: "Создайте своё королевство и защитите его от драконов. Эпическая стратегия в фэнтезийном мире.",
    screenshots: [
      "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/13a2d8e5-1bc0-4613-9e9c-50f64db1db3a.jpg",
      "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/13a2d8e5-1bc0-4613-9e9c-50f64db1db3a.jpg"
    ],
    requirements: {
      os: "Windows 10",
      processor: "Intel Core i5-4460",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 960"
    }
  },
  {
    id: 3,
    title: "Wasteland Survivor",
    price: 899,
    image: "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/4007a2d8-8367-45fd-9a2d-a33e30ff224a.jpg",
    tags: ["Выживание", "Хоррор", "Инди"],
    rating: 92,
    description: "Выживайте в постапокалиптическом мире. Собирайте ресурсы, стройте укрытие, сражайтесь с мутантами.",
    screenshots: [
      "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/4007a2d8-8367-45fd-9a2d-a33e30ff224a.jpg",
      "https://cdn.poehali.dev/projects/4f8673fe-f3ee-4d47-8ef6-1bbc65a81ed1/files/4007a2d8-8367-45fd-9a2d-a33e30ff224a.jpg"
    ],
    requirements: {
      os: "Windows 10/11",
      processor: "Intel Core i3-6100",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 750 Ti"
    }
  }
];

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const toggleWishlist = (gameId: number) => {
    setWishlist(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const toggleCart = (gameId: number) => {
    setCart(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const calculatePrice = (game: Game) => {
    if (game.discount) {
      return Math.round(game.price * (1 - game.discount / 100));
    }
    return game.price;
  };

  const filteredGames = GAMES.filter(game => {
    if (activeFilter === "all") return true;
    if (activeFilter === "discount") return game.discount;
    return game.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  if (selectedGame) {
    return (
      <div className="min-h-screen">
        <header className="steam-gradient border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button 
                  variant="ghost" 
                  className="text-xl font-bold text-primary hover:text-primary/90"
                  onClick={() => setSelectedGame(null)}
                >
                  <Icon name="Gamepad2" className="mr-2" size={24} />
                  STEAM
                </Button>
                <nav className="hidden md:flex gap-4">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Магазин
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Библиотека
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Сообщество
                  </Button>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Heart" size={20} />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-video rounded overflow-hidden">
                <img 
                  src={selectedGame.image} 
                  alt={selectedGame.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {selectedGame.screenshots.map((screenshot, idx) => (
                  <div key={idx} className="aspect-video rounded overflow-hidden cursor-pointer hover:opacity-80 transition">
                    <img src={screenshot} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Об игре</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedGame.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Системные требования</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">ОС</p>
                      <p>{selectedGame.requirements.os}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Процессор</p>
                      <p>{selectedGame.requirements.processor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Память</p>
                      <p>{selectedGame.requirements.memory}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Видеокарта</p>
                      <p>{selectedGame.requirements.graphics}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{selectedGame.title}</h1>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="ThumbsUp" size={16} className="text-accent" />
                        <span className="text-accent font-medium">{selectedGame.rating}%</span>
                      </div>
                      <span className="text-muted-foreground">Положительные</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedGame.discount ? (
                      <>
                        <Badge className="bg-accent text-accent-foreground px-2 py-1 text-lg">
                          -{selectedGame.discount}%
                        </Badge>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground line-through text-sm">
                            {selectedGame.price} ₽
                          </span>
                          <span className="text-2xl font-bold text-accent">
                            {calculatePrice(selectedGame)} ₽
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">
                        {selectedGame.price} ₽
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="lg"
                      onClick={() => toggleCart(selectedGame.id)}
                    >
                      <Icon name={cart.includes(selectedGame.id) ? "Check" : "ShoppingCart"} className="mr-2" />
                      {cart.includes(selectedGame.id) ? "В корзине" : "Добавить в корзину"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => toggleWishlist(selectedGame.id)}
                    >
                      <Icon 
                        name="Heart" 
                        className={`mr-2 ${wishlist.includes(selectedGame.id) ? 'fill-current text-accent' : ''}`}
                      />
                      {wishlist.includes(selectedGame.id) ? "В избранном" : "Добавить в избранное"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="steam-gradient border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-xl font-bold text-primary flex items-center gap-2">
                <Icon name="Gamepad2" size={24} />
                STEAM
              </div>
              <nav className="hidden md:flex gap-4">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Магазин
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Библиотека
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Сообщество
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Профиль
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Input 
                  placeholder="Поиск игр..." 
                  className="w-64 bg-background/50"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Heart" size={20} />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div 
          className="relative h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${GAMES[0].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="container mx-auto px-4 h-full relative z-10 flex items-end pb-16">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-5xl font-bold">{GAMES[0].title}</h1>
              <p className="text-lg text-muted-foreground">{GAMES[0].description}</p>
              <div className="flex items-center gap-4">
                {GAMES[0].discount && (
                  <Badge className="bg-accent text-accent-foreground px-3 py-1 text-xl">
                    -{GAMES[0].discount}%
                  </Badge>
                )}
                <div className="flex items-center gap-3">
                  {GAMES[0].discount && (
                    <span className="text-muted-foreground line-through text-lg">
                      {GAMES[0].price} ₽
                    </span>
                  )}
                  <span className="text-3xl font-bold text-accent">
                    {calculatePrice(GAMES[0])} ₽
                  </span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => setSelectedGame(GAMES[0])}
              >
                Подробнее
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Специальные предложения</h2>
              <Tabs value={activeFilter} onValueChange={setActiveFilter}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Все игры</TabsTrigger>
                  <TabsTrigger value="discount">Скидки</TabsTrigger>
                  <TabsTrigger value="экшен">Экшен</TabsTrigger>
                  <TabsTrigger value="стратегия">Стратегия</TabsTrigger>
                  <TabsTrigger value="выживание">Выживание</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                  <Card 
                    key={game.id} 
                    className="steam-gradient-hover cursor-pointer overflow-hidden group"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(game.id);
                        }}
                      >
                        <Icon 
                          name="Heart" 
                          size={18}
                          className={wishlist.includes(game.id) ? 'fill-current text-accent' : ''}
                        />
                      </Button>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-bold text-lg">{game.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {game.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon name="ThumbsUp" size={14} className="text-accent" />
                          <span className="text-sm text-accent font-medium">{game.rating}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {game.discount ? (
                            <>
                              <Badge className="bg-accent text-accent-foreground px-2 py-0.5 text-sm">
                                -{game.discount}%
                              </Badge>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground line-through">
                                  {game.price} ₽
                                </span>
                                <span className="font-bold text-accent">
                                  {calculatePrice(game)} ₽
                                </span>
                              </div>
                            </>
                          ) : (
                            <span className="font-bold">{game.price} ₽</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="steam-gradient border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-primary">О платформе</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">О нас</a></li>
                <li><a href="#" className="hover:text-foreground">Вакансии</a></li>
                <li><a href="#" className="hover:text-foreground">Новости</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-primary">Поддержка</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Помощь</a></li>
                <li><a href="#" className="hover:text-foreground">Контакты</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-primary">Разработчикам</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">API</a></li>
                <li><a href="#" className="hover:text-foreground">Документация</a></li>
                <li><a href="#" className="hover:text-foreground">Партнеры</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-primary">Сообщество</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Форум</a></li>
                <li><a href="#" className="hover:text-foreground">Discord</a></li>
                <li><a href="#" className="hover:text-foreground">Блог</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Steam Platform. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;