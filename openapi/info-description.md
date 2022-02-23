This is [Mconf's](https://mconf.com/) official API documentation, built using the OpenAPI specification with Redoc!

# Authentication

To verify if an API call is valid, the BBB API uses a checksum system. 

For each incoming API request, the controller computes a checksum out of the combination of the entire HTTPS query string and the server’s shared secret. It then matches the incoming checksum against the computed checksum. If they match, the controller accepts the incoming request.

To use the security model, you must be able to create an SHA-1 checksum out of the call name plus the query string plus the shared secret that you configured on your server. To do so, follow these steps:

1. Create the entire query string for your API call without the checksum parameter.
    * Example for create meeting API call: **name=Test+Meeting&meetingID=abc123&attendeePW=111222&moderatorPW=333444**
2. Prepend the API call name to your string
    * Example for above query string:
        * API call name is create
        * String becomes: **create**name=Test+Meeting&meetingID=abc123&attendeePW=111222&moderatorPW=333444
3. Now, append the shared secret to your string
    * Example for above query string:
        * shared secret is **639259d4-9dd8-4b25-bf01-95f9567eaf4b**
        * String becomes: createname=Test+Meeting&meetingID=abc123&attendeePW=111222&moderatorPW=333444**639259d4-9dd8-4b25-bf01-95f9567eaf4b**
4. Now, find the SHA-1 sum for that string (implementation varies based on programming language).
    * the SHA-1 sum for the above string is: **1fcbb0c4fc1f039f73aa6d697d2db9ba7f803f17**
5. Add a checksum parameter to your query string that contains this checksum.
    * Above example becomes: name=Test+Meeting&meetingID=abc123&attendeePW=111222&moderatorPW=333444&**checksum=1fcbb0c4fc1f039f73aa6d697d2db9ba7f803f17**

You MUST send this checksum with EVERY API call. Since end users do not know your shared secret, they can not fake calls to the server, and they can not modify any API calls since changing a single parameter name or value by only one character will completely change the checksum required to validate the call.


# Secret Scope

It is interesting to note that the scope of a shared secret is **vitally** important to the operation
of the request in which it was used. If the *scope* of the secret isnt high enough, the operation will **NOT** go through.

The possible *scopes* are as follows:

* **global**:
    * Has what can be essentially described as admin access, being able to perform any operation
    it is used in.
* **shared**:
    * Is essentially a *user level* secret, being able to perform operations but not as freely,
    having its fair share of restrictions.
* **restricted**:
    * As the title implies, the most restricted scope available for a secret, can only be used for certain specific operations.
