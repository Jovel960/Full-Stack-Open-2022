title User_Navigate_To_SPA_Of_NoteApp


browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa

server-->browser: Server responds - HTML Code

browser-->server: HTTPS GET https://studies.cs.helsinki.fi/exampleapp/main.css

server-->browser: Server responds - main.css

browser-->server: HTTPS GET https://studies.cs.helsinki.fi/exampleapp/spa.js

server-->browser: Server responds - spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note over 


browser-->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

server-->browser: Server responds - JSON content (Array of objects)

note over browser:
browser executes the event handler
that renders notes to display
end note