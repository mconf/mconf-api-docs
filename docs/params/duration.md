The maximum length (in minutes) for the meeting.

BigBlueButton begins tracking the length of a meeting when it is created. If `duration` contains a non-zero value, then when the length of the meeting exceeds the duration value the server will immediately end the meeting (equivalent to receiving an end API request at that moment).