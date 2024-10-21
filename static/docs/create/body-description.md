## Pre-upload Slides

You can upload slides within the create call. If you do this, the BigBlueButton server will immediately download and process the slides.

You can pass the slides as a URL or embed the slides in base64 as part of the POST request. For embedding the slides, you have to send a HTTPS POST request (by default, the total size of the POST request can’t exceed 2MB, so embedding very large slides won’t work). The URL Resource has to be the same as the previously described.

In the body part, you would append a simple XML like the example below:

```xml
<modules>
   <module name="presentation">
      <document url="http://www.sample-pdf.com/sample.pdf" filename="report.pdf"/>
      <document name="sample-presentation.pdf">JVBERi0xLjQKJ....
        [clipped here]
        ....0CiUlRU9GCg==
      </document>
   </module>
</modules>
```

When you need to provide a document using a URL, and the document URL does not contain an extension, you can use the filename parameter, such as filename=test-results.pdf to help the BigBlueButton server determine the file type (in this example it would be a PDF file).

In the case more than a single document is provided, the first one will be loaded in the client, the processing of the other documents will continue in the background and they will be available for display when the user select one of them from the client.