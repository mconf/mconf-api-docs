This is [Elos](https://elos.vc/) official API documentation, built using the OpenAPI specification with Redoc.

# Intro

The Elos API is compatible with the [BigBlueButton (BBB) API](https://docs.bigbluebutton.org/development/api/), so if your product already integrates with BBB, you can use the same API to integrate with Elos. Most of the API calls described here are either identical or very similar to what is offered by BigBlueButton. Some API calls, however, are unique to Elos.

# Authentication

To verify if an API call is valid, the API uses a checksum system.

In this system, every API call should include a `checksum` parameter. The value passed in this parameter is calculated from a combination of the API call method name plus the query string plus your shared secret to access the API. For each incoming request the servers will verify the checksum and see if they match with the shared secret stored on the server. If they match, the controller accepts the incoming request.

To calculate the checksum, follow these steps:

1. Create the entire query string for your API call without the checksum parameter. Example for the `create` API call:
   ```plaintext
   name=Test+Meeting&meetingID=abc123&attendeePW=111222&moderatorPW=333444
   ```
2. Prepend the API call name (`create` in this example) to your string:
   ```plaintext
   createname=Test+Meeting&meetingID=abc123&attendeePW=111222&moderatorPW=333444
   ```
3. Now, append the shared secret to your string. Using `639259d4-9dd8-4b25-bf01-95f9567eaf4b` as the shared secret in this example (the example shows multiple lines for clarity, but it's all a single string):
   ```plaintext
   createname=Test+Meeting&meetingID=abc123&attendeePW=111222&
   moderatorPW=333444639259d4-9dd8-4b25-bf01-95f9567eaf4b
   ```
4. Now, find the [SHA-256](https://en.wikipedia.org/wiki/SHA-2) hash for that string. The implementation varies based on programming language, for example:
   - Ruby
     ```ruby
     require 'digest'
     string = "createname=Test+Meeting&meetingID=abc123&attendeePW=111222&" \
              "moderatorPW=333444639259d4-9dd8-4b25-bf01-95f9567eaf4b"
     Digest::SHA256.hexdigest(string)
     # da9185f7f333cfdfcd6eeac32dca3777510c4c436020d8b887ba5515bd1d189e
     ```
   - PHP
     ```php
     <?php
     $string = "createname=Test+Meeting&meetingID=abc123&attendeePW=111222&" .
               "moderatorPW=333444639259d4-9dd8-4b25-bf01-95f9567eaf4b";
     $sha256_hash = hash('sha256', $string);
     echo $sha256_hash;
     ?>
     ```
   - The resulting checksum is: `da9185f7f333cfdfcd6eeac32dca3777510c4c436020d8b887ba5515bd1d189e`
5. Add a checksum parameter to your query string:
   ```plaintext
   name=Test+Meeting&meetingID=abc123&attendeePW=111222&
   moderatorPW=333444&checksum=da9185f7f333cfdfcd6eeac32dca3777510c4c436020d8b887ba5515bd1d189e
   ```

You **must** send this checksum with **every** API call. Since end users do not know your shared secret, they can not fake calls to the service, and they cannot modify any API calls since changing a single parameter name or value by only one character will completely change the checksum required to validate the call.
