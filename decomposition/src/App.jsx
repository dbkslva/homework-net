function App() {
  return (
    <div>
      <TopNewsBar
        news={["Путин упростил получение номеров", "Новости спорта"]}
        date="31 июля, среда 02:32"
        finance="USD MOEX 63,52 +0,09"
      />
      <Header />
      <Banner img="banner.jpg" text="Форсаж трейлер" />
      <div className="info-blocks">
        <Weather temp="+17" morning="+17" day="+20" />
        <TVSchedule shows={[{ time: "02:00", channel: "THT", name: "Best" }]} />
        <LiveBroadcast
          programs={["Управление как искусство", "Ночь. Мир в это время"]}
        />
        <PopularLinks links={[{ name: "Недвижимость", desc: "о сталинках" }]} />
      </div>
    </div>
  );
}
