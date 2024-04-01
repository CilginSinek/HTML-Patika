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