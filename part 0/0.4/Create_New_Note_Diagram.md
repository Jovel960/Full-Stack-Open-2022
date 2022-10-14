title Create_New_Note_Diagram

browser-->server: HTTP POST https://studies.cs.helsinki.fi//exampleapp/new_note (broswer sending the user input)
server-->browser: Server responds with HTTP status code 302 and the server ask for new HTTP Get request
browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "This is new NOTE from me (:, Good luck!", date: "2022-09-14" }, more objects]

note over browser:
browser executes the event handler
that renders notes to display
end note