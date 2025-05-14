Creates a meeting. This is the API call that receives all configurations for a meeting, some that can't be changed later on. Only after creating a meeting the users are allowed to join it.

It is recommended to call `create` always before joining a user into a session. The create call is idempotent: you can call it multiple times with the same parameters without side effects. This simplifies the logic for joining a user into a session as your application can always call `create` before returning the join URL to the user. This way, regardless of the order in which users join, the meeting will always exist when the user tries to join (the first `create` call actually creates the meeting; subsequent calls to `create` simply return `SUCCESS` and and indication that the meeting is already running).

If you create a meeting but no user joins it, it will be automatically finished after a few minutes.
