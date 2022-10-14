title User_POST_New_Note_With _SPA

browser-->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

server-->browser: Server responds with 201 created

note over browser:
This time the browser does not ask
for redirect and stays on the same
page
end note 

note over server:
The SPA version of the app does not send the form data in the
traditional way, but instead uses the JavaScript code it fetched from
the server.
The new note added with DOM manipulations,
this new note added to the NOTES array
and the server rerenders the data again
end note