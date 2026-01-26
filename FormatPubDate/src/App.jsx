import "./App.css";
import moment from "moment";
import { useState } from "react";

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

// HOC для форматирования даты
function DateTimePretty(Component) {
  return function (props) {
    const formattedDate = formatRelativeTime(props.date);
    return <Component {...props} date={formattedDate} />;
  };
}

// функция для расчёта «X минут/часов/дней назад»
function formatRelativeTime(dateString) {
  const now = moment();
  const date = moment(dateString);

  const diffMinutes = now.diff(date, "minutes");
  const diffHours = now.diff(date, "hours");
  const diffDays = now.diff(date, "days");

  if (diffMinutes < 60) {
    return `${diffMinutes} минут назад`;
  } else if (diffHours < 24) {
    return `${diffHours} часов назад`;
  } else {
    return `${diffDays} дней назад`;
  }
}

// создаём обёрнутый компонент
const DateTimePrettyComponent = DateTimePretty(DateTime);

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      ></iframe>
      <DateTimePrettyComponent date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item, index) => (
    <Video key={index} url={item.url} date={item.date} />
  ));
}

export default function App() {
  const [list] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-07-31 13:24:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-03-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-01 16:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);

  return <VideoList list={list} />;
}
