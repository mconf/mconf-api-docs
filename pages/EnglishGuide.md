---
id: guide
title: Guide
---

[🇧🇷 Versão em Português](guide-pt) | [🇺🇸 English version](guide)

_Last update: October 17, 2024_

:::note

<aside>
🗨️ Welcome and thank you for using the Elos API. On this page you will find all the information related to using the Elos API, and if you can't find what you're looking for or can't answer your question, please contact our team at **suporte@mconf.com** - we'll be happy to help.
</aside>
:::

Before you read any further, bear in mind that there are several ready-made integrations for using Elos in your system. For use integrated with Virtual Learning Environments (Moodle, Brightspace, Canvas, among others), we offer plug-and-play integration via LTI (Learning Tools Interoperability), contact us to find out more!

### Summary of what you'll find here:

1. [Tips for using API integration and essential documentation](#tips-for-using-api-integration-and-essential-documentation)
2. [Difference between Elos Portal rooms and those created using API](#difference-between-elos-portal-rooms-and-those-created-using-api)
3. [Data storage](#data-storage)
4. [Customizations defined from business rules](#customizations-defined-from-business-rules)
5. [Permissions and opening the room](#permissions-and-opening-the-room)
6. [Useful customizations via API](#useful-customizations-via-api)
7. [Closing the session](#closing-the-session)
8. [Recordings](#recordings)
9. [Use embedded in iframe](#use-embedded-in-iframe)
10. [Webhooks](#webhooks)
11. [Analytical data](#analytical-data)
12. [News and improvements](#news-and-improvements)
13. [Frequently asked questions](#frequently-asked-questions)

## Tips for using API integration and essential documentation

This article focuses on API integration, which we recommend in two cases:

- when you want to implement something very different for a system that already has a ready-made integration;
- when you need to integrate a new system for which no integration has yet been developed.

Most commonly, API integration is used when you want to integrate Elos with your own system, for which there is no ready-made integration.

The Elos API is compatible with the BigBlueButton (BBB) API, so if your product already integrates with BBB, you can use the same API to integrate with Elos. The API documentation is available at [here](/docs/api/conference).

We also support the extended webhooks API, which allows the integration to receive relevant events from ongoing sessions or recordings: [webhook API](/api/conference/#tag/hooks).

Access to the API is usually via libraries that already exist and are maintained by the community. Using libraries, you don't have to worry about the complexity of generating and signing valid API calls, you can simply use the methods provided by the library to create your integration. If the library doesn't offer access to a method or parameter you want for your integration, you can modify the library for this purpose.

Among the best-known libraries used to access the API are:

- Library for PHP: https://github.com/bigbluebutton/bigbluebutton-api-php
- Library for Javascript: https://github.com/mconf/bigbluebutton-api-js
- Library for Ruby: https://github.com/mconf/bigbluebutton-api-ruby
- Library for Rails: https://github.com/mconf/bigbluebutton_rails
- Library for C#: https://github.com/nitinjs/bigbluebutton-api-dotnet
- Library for Java: https://github.com/bigbluebutton/bigbluebutton-api-java

If you're looking for a quick start guide, check this FAQ entry: [In a nutshell, what do I need to know for a simple integration?](#in-a-nutshell-what-do-i-need-to-know-for-a-simple-integration)

## Difference between Elos Portal rooms and those created using API

When setting up an Elos integration with your system, bear in mind that this integration connects your system directly to a videoconference room, and that this communication flow does not go through the Elos Portal. In practice, this means that API integration does not need to follow any of the portal's business rules, i.e. the way in which each room is configured and opened can be fully adapted to your system's business rules. For the same reasons, information about users, rooms and recordings generated via integration will not be available on the Elos Portal.

If you need to use a room instantiated directly by the portal, be aware that the business rules (access permissions and room configuration) followed will be those of the Elos Portal, and not those of your system, even if you are logged in with an account from the same institution for which you configured the integration.

## Data storage

In order to implement integration, you will need to create your own database (or any other data storage mechanism you wish to use), as this is where the information identifying users, rooms and recordings will be stored.

This database must be modeled according to your system's business rules and product. An example of how this logic could be set up is: each user with the role of teacher will have a room, so each room will have a unique identifier (ID) linked to the user who is the “owner” of the room. It should be emphasized that this room does not need to be registered on our portal, as it is created in our infrastructure via API when the user clicks “open”. This same room closes when, for example, the room owner clicks “log out” (a command passed on to the API). In our product (rooms opened via the Elos Portal), the close session (or close room) button is found both inside the room and outside it (visible to the owner), although where the close session button appears is also something you define.

In short, it is in your database that information about who can open a room, what settings will be applied to it, how participants will be managed and so on will be stored.

## Customizations defined from business rules

With regard to customization possibilities when integrating Elos via API: the possibilities are many. Although this is a positive point, it requires good product and business modeling before implementing the technical part. This means that before getting down to work, you need to define what you want your product's videoconferencing system to look like and how you want it to be accessed. Some examples of definitions are

- How rooms will be managed (Does each user have their own room? Do users create multiple rooms? etc);
- Who can start a session in the room;
- Who is a moderator and who is just a participant;
- Who can access the room and whether they need moderator approval to do so;
- Whether the meeting can be recorded;
- Customize the initial presentation;
- Configuring participant restrictions (limiting access to certain features);
- Enabling and disabling features automatically (start video automatically, hide user list, etc).

These are just a few points. We will soon be providing full detailed documentation on these settings.

In addition to the logic behind the rooms, the API also offers options for monitoring and listing resources. For example, it is possible to search for information such as the number of rooms currently open (as well as perform operations on them, such as closing them), as well as display a list of all the recordings made. All this can be done using directives that already exist in the API.

## Permissions and opening the room

From a technical point of view, the room exists in our infrastructure from the moment it is instantiated by the API's `create` command until the moment it is closed, and it can be closed in various ways, detailed later in this article. Once the room is closed, it no longer exists in Elos. The room reference will exist in your database, just as “who the users are” will also exist in your database. It is very important to create a room identifier (`meetingID`) that is unique, because it is through this identifier that you will make references to this room and all the resources related to it, such as its recording. We recommend using a GUID (https://en.wikipedia.org/wiki/Universally_unique_identifier) to uniquely identify the room.

Please note: the `create` can be repeated whenever necessary, so a good practice for using the API is to use the rule: if the user has permission to open the room, first give the `create` and then the `join` (the call that authorizes and directs the user to the session) of the user to the room, thus ensuring that the session is open when the system receives the `join` and minimizing the chances of errors in the process. If the user does not have permission to open the room, the room should be checked for openness and the `join` should only be given if the room is already open (in the role of participant). If `create` is given again when the room is already running, it won't return an error, it will just indicate that the room was already open.

In addition to the room ID, there are two other pieces of information that are passed along with the `create` command and which are very important when using the API:

- moderator password;
- participant password.

These values are used to identify the users who will connect to the room and assign the appropriate permissions. This password is used to check whether the user is a participant or a moderator. So passwords should always be different (otherwise everyone would be a moderator!). A good practice is not to let the end user choose this password, i.e. even if your room is password-protected, it's best to separate this password from the password used in the API. Here's an example: on our portal, the room can be private, and if it is private the user sets a password for it. This password is only used by the portal to decide whether the participant can enter the room or not. After deciding this, the portal decides what role the person will play in the room and then uses internal passwords (which only it knows and which are random), to indicate to the API what role the person should take on.

It is important that:

- Room ID is a large, random word, ideally a GUID;
- Participant password is a hash;
- Moderator password is a different hash from the participant password;
- The end user has no visibility of these passwords.

Another important piece of information regarding the API is that when the session is created, metadata can be passed to this session, which is data from the meeting or class that you want to be available later, also in the recording. For example: in an integration that is used by users with the “employees” role, every time a certain room is opened, the metadata is passed that the session is administrative and then, later, this metadata will be linked to the recording. With this, you can generate analytics to find out, for example, which sectors are recording the most and also manage recordings by sector. There is no metadata limit, and we suggest that you always provide at least the website address and the version of the integration, but you can extend this to any information that may be useful so that the session and/or recording can be indexed at a later date.

## Useful customizations via API

### Name standardization

- Always use lowercase letters.
- Use only letters, numbers and the characters `-` or `_`.
- Do not use accents.
- As a separator between words, give preference to `-`, but there are exceptions:
  - On `join`, use `userdata-variable_name` for user parameters. The `userdata-` is a prefix that is always the same and for the rest `_` must be used. Using `userdata-variable-name` **may not work** (and may have unexpected effects)! For more information you can see [this link](https://github.com/bigbluebutton/bigbluebutton/blob/74d446dd08a22257c51f35ac40deec46a838a94c/bigbluebutton-html5/imports/api/users-settings/server/methods/addUserSettings.js#L31-L71).
  - On `create`, use `meta_variable-name` for `meta` parameters. The prefix is always `meta_`, but for the rest of the variable name, use `-` as the separators. Using `meta_variable_name` **may not work** (may have unexpected effects)!

---

Interesting parameters to use in `create`:

- `autoStartRecording`: starts recording automatically when the session is opened. Default value: false
- `allowStartStopRecording`: determines whether the moderator can change the recording status. Default value: true
- `disabledFeatures`: determines whether certain functionality is disabled/hidden for users. Values are possible, separated by commas:
  - privateChat
  - captions
  - polls
  - externalVideos
  - questions
  - streaming
  - breakoutRooms
  - sharedNotes

Interesting parameters to use in `join`:

- `userdata-bbb_auto_share_webcam`: automatically opens the camera preview after the user configures the audio. Default value: false
- `userdata-bbb_hide_presentation`: hides the presentation when entering. Default value: false
- `userdata-bbb_auto_join_audio`: activates the audio when entering the room. Default value: true
- `userdata-bbb_listen_only_mode`: enables listener mode as an option to activate audio. Default value: true
- `userdata-bbb_skip_check_audio`: removes the audio test. Default value: false
- `userdata-bbb_override_default_locale`: sets the language of the virtual room. By default, the virtual room uses the language of the browser. Possible values are `en-br` and `en-us`.

## Closing the session

There are four ways in which a session can be closed:

- When a moderator selects the “End session” option within the room. Any moderator has this option, and after confirmation, all users are logged out, and the room is closed. Because of this, it's important to consider who should join the session as a moderator and who should join as a participant. It is not good practice for all participants to log in as moderator, as this increases the chance of someone accidentally closing the session.
- When all participants log out. After everyone leaves, the room remains active for 5 minutes and is then closed automatically.
- By API via the `end` method. There is no confirmation for this method, i.e. when it is called for a room that is running, the session is closed immediately. This option usually appears in integrations in some room management location, where the user who owns the room can see the status of the running room and has the option of ending it by clicking on the integration interface.
- For inactivity. If a session remains idle for an hour, it is automatically terminated. All user entry and exit actions, microphone and camera activation, the beginning and end of a participant's speech, notes on the whiteboard, etc. are considered activity. This condition exists to avoid the scenario of a session running indefinitely by mistake. See more at: https://ajuda.elos.vc/kb/article/152226/fechamento-de-sala-por-inatividade.

## Recordings

With regard to session recordings, the API can manage, for example, that the recording is unpublished (it can no longer be watched), that it is deleted and that metadata is added later. In our portal, for example, we use the metadata update when the user sets a title for the session and when they put a description in the schedule - this triggers `updateRecordings`, which then updates the metadata within the recording.

Recordings are available in two formats:

- `presentation`: used for viewing in the browser, allows quick navigation by clicking on slide thumbnails and chat messages, access to shared notes and search;
- `video`: is an MP4 file with a dynamic interface according to the features used in the conference, used both for viewing in the browser and for the user to download and store the video on their computer.

In `presentation` format, it is possible to customize the display through parameters in the URL:

- `l=media`: configures the layout of the recording so that only the video is visible on the screen.

## Use embedded in iframe

One motivation for choosing API integration can also be the possibility of giving your brand more visibility. This happens by embedding the room in an iframe within the integrated system itself. This allows you to keep your URL and possibly some components of your visual identity even when people are inside an Elos conference. It should be noted that there are currently some limitations to this mode, although they do not compromise the integrity of the service.

To do this, it is necessary to pass some directives to the iframe so that it can capture the camera and microphone. One important point is that in the source of the iframe you don't actually put the API URL to enter the room. The ideal is to use an internal system URL, which has the role of validating the user, identifying whether or not they can be there, which room they are trying to access, whether or not they have access permission, whether they are accessing as a guest or moderator, etc. This internal URL is always defined in the source.

To use the iframe we use the following command:

```
<iframe
  allow="microphone *; camera *; display-capture *; clipboard-read *; clipboard-write *; screen-wake-lock *;"
  allowfullscreen=""
  data-hj-allow-iframe=""
  mozallowfullscreen=""
  msallowfullscreen=""
  oallowfullscreen=""
  webkitallowfullscreen=""
  src="/conference/rooms/sheila-uberti/join?user%5Bemail%5D=&amp;user%5Bkey%5D=&amp;user%5Bname%5D=Felipe+Cecagno"/>
```

It is essential that the iframe is served using HTTPS, otherwise the browser may deny access to the camera and microphone devices.

## Webhooks

It is possible, via the webhooks API, to register an endpoint to receive relevant events about sessions and recordings. This registration can be done with session granularity (passing the `meetingID` in the `hooks/create` request) or globally, for all sessions, as documented [here](/docs/api/conference#tag/hooks).

Unlike the original BigBlueButton implementation, we have modified the model for validating the integrity of the events emitted, as follows:

- When registering a webhook via the `hooks/create` method, an `authToken` field is returned in the XML response;
- The `authToken` must be saved in the database to be used later to validate the events received;
- When the event is received, the HTTP headers will contain a bearer with the value of the `authToken` - if the value is not the same, the event should be rejected.

In order for your implementation to be compatible with Elos and BigBlueButton, simply consider in the implementation that if the authToken is not returned when registering a hook, you can consider that the `authToken` is equal to the _shared secret_ of the service.

The events issued by Elos are:

- meeting-created
- meeting-ended
- user-joined
- user-left
- rap-archive-ended
- rap-sanity-started
- rap-sanity-ended
- rap-process-started
- rap-process-ended
- rap-publish-started
- rap-publish-ended
- rap-published
- rap-unpublished
- rap-deleted

To find out more about the stages in the processing of recordings, go to https://docs.bigbluebutton.org/development/recording.

## Analytical data

Elos has a callback feature for session information when the room is closed. This callback brings up each user's participation, including time logged in, messages sent and time spent talking, which can be used to generate analytics for the video service.

The Elos analytics callback is activated via metadata:

Elos has a callback feature for session information when the room is closed. This callback brings up each user's participation, including time logged in, messages sent and time spent talking, which can be used to generate analytics for the video service.

The Elos analytics callback is activated via metadata:

```bash
meta_analytics-callback-url=URL
```

Where `URL` is the URL of the integration that will receive the HTTP POST with the data.

<details>
  <summary>Example request body</summary>

```bash
{
  "version": "1.0",
  "meeting_id": "f59c62e3c4f1cb74d4ce488269b080126241317666a4404f8943b72ed381b7d3",
  "internal_meeting_id": "352a60fedcbc58a8675de586234db2674cdaf329-1691427974352",
  "data": {
    "metadata": {
      "analytics_callback_url": "hidden",
      "is_breakout": "false",
      "meeting_id": "f59c62e3c4f1cb74d4ce488269b080126241317666a4404f8943b72ed381b7d3",
      "meeting_name": "Laboral",
      "record": "true"
    },
    "duration": 1665,
    "start": "2023-08-07 14:06:14 -0300",
    "finish": "2023-08-07 14:33:59 -0300",
    "attendees": [
      {
        "ext_user_id": 45,
        "name": "Daronco",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:17 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:59 -0300"
        ],
        "duration": 1602,
        "recent_talking_time": "",
        "engagement": {
          "chats": 9,
          "talks": 8,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 26
        },
        "sessions": {
          "w_mdfahewpe3p1": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:17 -0300",
                "userid": "w_mdfahewpe3p1",
                "ext_userid": 45,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:59 -0300",
                "userid": "w_mdfahewpe3p1",
                "ext_userid": 45,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 49,
        "name": "Camila",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:19 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1580,
        "recent_talking_time": "",
        "engagement": {
          "chats": 5,
          "talks": 26,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 83
        },
        "sessions": {
          "w_drso5grosuf7": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:19 -0300",
                "userid": "w_drso5grosuf7",
                "ext_userid": 49,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_drso5grosuf7",
                "ext_userid": 49,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 48,
        "name": "Julia R",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:20 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:19 -0300"
        ],
        "duration": 1559,
        "recent_talking_time": "",
        "engagement": {
          "chats": 6,
          "talks": 0,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_ddfyo1b0eaee": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:20 -0300",
                "userid": "w_ddfyo1b0eaee",
                "ext_userid": 48,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:19 -0300",
                "userid": "w_ddfyo1b0eaee",
                "ext_userid": 48,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 32,
        "name": "Jéssica",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:23 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1576,
        "recent_talking_time": "",
        "engagement": {
          "chats": 7,
          "talks": 0,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_skxwisni2vkl": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:23 -0300",
                "userid": "w_skxwisni2vkl",
                "ext_userid": 32,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_skxwisni2vkl",
                "ext_userid": 32,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 46,
        "name": "Pedro",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:23 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1576,
        "recent_talking_time": "",
        "engagement": {
          "chats": 1,
          "talks": 0,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_vmkps2dbdo3u": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:23 -0300",
                "userid": "w_vmkps2dbdo3u",
                "ext_userid": 46,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_vmkps2dbdo3u",
                "ext_userid": 46,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": "w_pc3g5bjibj7r",
        "name": "Bárbara",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:32 -0300"
        ],
        "leaves": [
          "2023-08-07 14:07:39 -0300"
        ],
        "duration": 67,
        "recent_talking_time": "",
        "engagement": {
          "chats": 0,
          "talks": 8,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 20
        },
        "sessions": {
          "w_pc3g5bjibj7r": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:32 -0300",
                "userid": "w_pc3g5bjibj7r",
                "ext_userid": "w_pc3g5bjibj7r",
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:07:39 -0300",
                "userid": "w_pc3g5bjibj7r",
                "ext_userid": "w_pc3g5bjibj7r",
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 12,
        "name": "Chris",
        "moderator": true,
        "joins": [
          "2023-08-07 14:06:38 -0300"
        ],
        "leaves": [
          "2023-08-07 14:31:49 -0300"
        ],
        "duration": 1511,
        "recent_talking_time": "",
        "engagement": {
          "chats": 4,
          "talks": 1,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_z80qjjgpcaxn": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:06:38 -0300",
                "userid": "w_z80qjjgpcaxn",
                "ext_userid": 12,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:31:49 -0300",
                "userid": "w_z80qjjgpcaxn",
                "ext_userid": 12,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": 47,
        "name": "Penha",
        "moderator": true,
        "joins": [
          "2023-08-07 14:07:50 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:39 -0300"
        ],
        "duration": 1489,
        "recent_talking_time": "",
        "engagement": {
          "chats": 4,
          "talks": 0,
          "raisehand": 0,
          "emojis": 1,
          "poll_votes": 0,
          "talk_time": 0
        },
        "sessions": {
          "w_ubpikr2ejp2g": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:07:50 -0300",
                "userid": "w_ubpikr2ejp2g",
                "ext_userid": 47,
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:39 -0300",
                "userid": "w_ubpikr2ejp2g",
                "ext_userid": 47,
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      },
      {
        "ext_user_id": "w_sqhqruvnvzer",
        "name": "Bárbara",
        "moderator": true,
        "joins": [
          "2023-08-07 14:07:55 -0300"
        ],
        "leaves": [
          "2023-08-07 14:32:59 -0300"
        ],
        "duration": 1504,
        "recent_talking_time": "",
        "engagement": {
          "chats": 0,
          "talks": 232,
          "raisehand": 0,
          "emojis": 0,
          "poll_votes": 0,
          "talk_time": 970
        },
        "sessions": {
          "w_sqhqruvnvzer": {
            "joins": [
              {
                "timestamp": "2023-08-07 14:07:55 -0300",
                "userid": "w_sqhqruvnvzer",
                "ext_userid": "w_sqhqruvnvzer",
                "event": "join",
                "remove": false
              }
            ],
            "lefts": [
              {
                "timestamp": "2023-08-07 14:32:59 -0300",
                "userid": "w_sqhqruvnvzer",
                "ext_userid": "w_sqhqruvnvzer",
                "event": "left",
                "remove": false
              }
            ]
          }
        }
      }
    ],
    "files": [
      "default.pdf"
    ],
    "polls": [],
    "recorded_segments": [],
    "transfer_attendees": []
  }
}
```

</details>

The _content-type_ of the request is `application/json`.

The authenticity validation of the callback is performed using the `authorization` header of the POST:

```bash
Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1MTYwNjN9.CDvYEr-BjFGKKcRZ8UuCMGsJTsMPzlyBfAosbeB5ueb2lhF8QCb0QhymKTiwknBOf3GIi5w5JOZBNs1HqP3EJA
```

The token is a JWT signed with the API's _shared secret_ and the HS512 algorithm. The validation process is carried out according to the pseudo-code below:

```bash
jwt.verify(token, shared_secret, { algorithms: [ algorithm ] });
```

## News and improvements

We are constantly working to improve our solution, offering customers and users the best possible videoconferencing experience. News and improvements are continually being released, and you can follow the updates [here](https://ajuda.elos.vc/kb/article/150995/tudo-sobre-o-elos).

Suggestions are very welcome at any time. Feel free to contact us whenever you want to share feedback or suggestions, or even to ask for help.

## Frequently asked questions

### In a nutshell, what do I need to know for a simple integration?

- Elos will allow you to implement a business logic designed by you;
- You won't need to register users or rooms in Elos, this will be done via API at the time of access;
- Each room is identified by a `meetingID` generated by you, preferably a UUID;
- Determine which entity in your system each room will be linked to - be it a class, an appointment or an agent;
- Generate a `meetingID` for each entity and save it in the database;
- You are not expected to have to deal with the complexity of generating API URLs - use a ready-made library for this (see [here](https://www.notion.so/Documenta-o-API-Elos-327d7f8f72894c5480cf2fa7804ef7bb?pvs=21));
- The room exists in Elos the moment the `CREATE` method is called, and ceases to exist after the room closes - each time the room is used, the `CREATE` method must be used;
- All calls to the API are executed in the backend of your application. The only exception is the `JOIN` method, which must be generated in the backend and the user is redirected to it, taking them to the corresponding room;
- The _shared secret_ used to sign API calls should only be known by your backend and under no circumstances should it be passed to the frontend or exposed to the user in any way;
- On `CREATE` you will defined the parameters `moderatorPW` and `attendeePW`. They can be set to any string, as long as they are different, as in `mp` and `ap` respectively. When the `JOIN` URL is generated, you will pass `mp` if you want the user to join as a moderator, or `ap` if you want the user to join as attendee;
- On `CREATE`, pass `record=true` so that the session can be recorded.
- On `CREATE` you will define the parameters `moderatorPW` and `attendeePW`. They can be anything, as long as they are different, for example, `mp` and `ap` respectively. When the `JOIN` is generated, `mp` is passed so that the user connects as a moderator, and `ap` is passed so that the user connects as an attendee;
- On `CREATE`, pass `record=true` so that the session can be saved.

### Can I replace the Elos logo in the top left corner?

Yes, you can replace it by passing the parameter `logo=URL` in the `CREATE` method, where `URL` is the public link where the image with your organization's logo resides. We recommend that the image be in SVG format, with a transparent background, and a height of 28px. Do a test to make sure that the layout of the logo is appropriate.

In addition, Elos has a dark mode, and it is possible to pass a version of the logo to be applied in dark mode. In this case, the parameter to be passed in `CREATE` is `darklogo=URL`. `logo` and `darklogo` can be passed simultaneously in `CREATE`, and if `darklogo` is not passed, `logo` will also be used in dark mode.

Despite allowing customization of the logo, Elos does not white label - read more in [White label in Elos](https://www.notion.so/White-label-no-Elos-fd9b0d69d2d945eca16f09838b35e407?pvs=21).
