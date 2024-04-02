# GraphQL 1

## Queries

```GraphQL
query getUsers{
  users{
    id,
    username,
    events {
      id,
      name
    }
  }
}

query getUser{
  user(id:10){
    email,
    id,
    username,
    events{
      id,
      name
    }
  }
}

query getEvents{
  events {
  id
  title
  user{
    id
    username
  }
  participants {
    id
    user{
      username
    }
  }
  location{
    id
    name
  }
  }
}
query getEvent{
  event(id:7){
    title,
    id
  }
}


query getLocations{
  locations {
    id,
    name
  }
}
query getLocation{
  location(id:11){
    id,
    name
  }
}

query getParticipants{
  participants {
    event {
      id,
      title
    },
    user {
      id,
      username
    }
  }
}
query getParticipant{
  participant(id: 31) {
    event {
      id,
      title
    },
    user {
      id,
      username
    }
  }
}
```

## Mutations

```GraphQL

mutation UserMutations{
  addUser(username:Simsim, email:hebelehubelke@gmail.com)
  updateUser(id:31,username:hebele)
  deleteUser(id:31)
  deleteAllUser
}

mutation EventMutations{
  addEvent(title:hebele,desc:hebe,location_id:31,date:2021-10-04, from:20:31, to:21:31)
  updateEvent(id:31, title:hebele, desc:hebele, location_id:31, date:2021-10-04,from:20:31, to:21:31)
  deleteEvent(id:31)
  deleteAllEvents
}

mutation LocationMutations{
  addLocation(name:hebe,desc:hebele,lat:31.123, lng:21:321)
  updateLocation(id:31, name:sesgq)
  deleteLocation(id:31)
  deleteAllLocation
}

mutation ParticipantEvents{
  addParticipant(user_id:31,event_id:21)
  updateParticipant(id:31,user_id:31,event_id:31)
  deleteParticipant(id:31)
  deleteAllParticipant
}

```