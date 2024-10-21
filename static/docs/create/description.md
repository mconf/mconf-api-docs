Creates a BigBlueButton meeting.

The create call is idempotent: you can call it multiple times with the same parameters without side effects. This simplifies the logic for joining a user into a session as your application can always call create before returning the join URL to the user. This way, regardless of the order in which users join, the meeting will always exist when the user tries to join (the first `create` call actually creates the meeting; subsequent calls to `create` simply return `SUCCESS`).

The BigBlueButton server will automatically remove empty meetings that were created but have never had any users after an arbitrary number of minutes.