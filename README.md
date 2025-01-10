# Calendar Of Events ✏️🗓️

Calendar of Events, allows us to manage events or reminders within a calendar, it has the function of showing, creating, updating and deleting events in a simple way that in turn, through SignalR, notifies us when an event has started.

## Table of Contents
- [Project architecture](#architecture)
- [Installation](#installation)
- [Use](#use)
- [Characteristics](#characteristics)
- [Author](#author)

## architecture

    CalendarOfEvents-Frontend/
    ├── .angular
    ├── node_modules
    ├── public
    ├── src
    │   ├── app
    │   │   ├── components
    │   │   │   ├── calendar
    │   │   │   ├── crud
    │   │   │   └── notifications
    │   │   ├── environment
    │   │   │   └── environment
    │   │   ├── models
    │   │   │   ├── event
    │   │   │   └── notification
    │   │   ├── pipes
    │   │   │   └── format-date
    │   │   ├── services
    │   │   │   ├── event
    │   │   │   ├── shared-events
    │   │   │   └── signalr
    │   │   ├── app.component.css
    │   │   ├── app.component.html
    │   │   ├── app.component.ts
    │   │   ├── config
    │   │   └── routes
    │   ├── index.html
    │   ├── main.ts
    │   ├── styles.css
    ├── angular.json
    ├── package-lock.json
    └── package.json

## installation

1.Clone this repository and move to the main folder:

```bash
git clone https://github.com/santvallejos/CalendarOfEvents-Frontend.git
cd CalendarOfEvents-Frontend
```

2.Install packages

```bash
npm install
npm install @fullcalendar/timegrid @fullcalendar/list @fullcalendar/bootstrap5 @formkittempo @microsoft/signalr
```

3.Running the project

```bash
npm start
```

## use

The project has the ability to display events within a calendar, manage the views and obtain information about each one, you can also manage the events with a CRUD that allows you to view, add, update or delete.
Finally, it has the functionality to send and store notifications of when an event has started.

## characteristics

- Events view
- Events CRUD
- Event notification

## author

[![LinkedIn Follow](https://img.icons8.com/?size=50&id=447&format=png&color=000000)](https://www.linkedin.com/in/santiago-vallejos-97a933236/)
[![Github](https://img.icons8.com/?size=50&id=62856&format=png&color=000000)](https://github.com/santvallejos)